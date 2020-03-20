//Variables
const formWorks = document.getElementById('formWorks');
const contentWorks = document.getElementById('contentWorks');

//Tareas Primarias
renderWorkAdded()

//Eventos
eventListener();

function eventListener() {
    // funcion al enviar formulario
    formWorks.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Formulario de tarea enviado');
        // leer valores del formulario
        const nameWork = document.getElementById('nameWork').value;
        const priorityWork = document.getElementById('priorityWork').value;
        const dateWork = document.getElementById('dateWork').value;
        // comprobar datos
        const DataWork = {
            name: nameWork,
            priority: priorityWork,
            date: dateWork
        }
        console.table(DataWork);
        // guardar datos localmente
        addDataLocal(DataWork);
    });
    // borrar tareas
    contentWorks.addEventListener('click', (e) => {
        borrarTarea(e);
    })

}

//Funciones
function addDataLocal(dataForm) {
    const data = localStorage.getItem('works');
    if (data == null || data == undefined) {
        console.log('No Existia DB para tareas, pero ya fue creada y su tarea se guardo correctamente');
        dataForm.id = 1;
        let info = [dataForm];
        localStorage.setItem('works', JSON.stringify(info));
        renderWorkAdded();
    } else {
        console.log('Si existen DB para tareas, su tarea ya se guardo');
        let works = JSON.parse(localStorage.getItem('works'));
        let idWorkNew = works[works.length - 1].id + 1;
        dataForm.id = idWorkNew;
        works.push(dataForm);
        localStorage.setItem('works', JSON.stringify(works));
        renderWorkAdded();
    }
}

function renderWorkAdded() {
    // traer información de tareas
    const data = localStorage.getItem('works');
    if (data == null || data == undefined) {
        contentWorks.innerHTML = ''; // borrar tareas 
        console.log('no hay tareas que renderizar');
    } else {
        const worksInfo = JSON.parse(localStorage.getItem('works')); // traer información
        contentWorks.innerHTML = ''; // borrar tareas 
        // reenderizar de nuevos elementos
        worksInfo.forEach(infoForRender => {
            let containerWork = document.createElement('tr');

            let contentWork = document.createElement('th');
            let contenidoWork = document.createTextNode(`${infoForRender.id}`);
            contentWork.appendChild(contenidoWork);
            containerWork.appendChild(contentWork);

            contentWork = document.createElement('th');
            contenidoWork = document.createTextNode(`${infoForRender.name}`);
            contentWork.appendChild(contenidoWork);
            containerWork.appendChild(contentWork);

            contentWork = document.createElement('th');
            contenidoWork = document.createTextNode(`${infoForRender.priority}`);
            contentWork.appendChild(contenidoWork);
            containerWork.appendChild(contentWork);

            contentWork = document.createElement('th');
            contenidoWork = document.createTextNode(`${infoForRender.date}`);
            contentWork.appendChild(contenidoWork);
            containerWork.appendChild(contentWork);

            contentWork = document.createElement('th');
            contentWork.innerHTML = `
                  <button class="btn-delete-work btn btn-success">Finalizar</button>
            `;
            containerWork.appendChild(contentWork);
            contentWorks.appendChild(containerWork);
        });

    }
}

function borrarTarea(event) {
    event.preventDefault();
    // capturar id a eliminar
    if (event.target.classList[0] === 'btn-delete-work') {
        idDelete = Number(event.target.parentElement.parentElement.firstChild.innerHTML) - 1; // id delete
        console.log('Click en borrar elemento: ' + idDelete);
        let worksInfo = JSON.parse(localStorage.getItem('works')); // traer informacion guardada de tareas
        worksInfo.splice(idDelete, 1); // eliminar elemento seleccionado con id
        /* Reescribir id de cada elemento para reorganizar */
        let contador = 1;
        worksInfo.forEach(element => {
            element.id = contador;
            contador++;
        });
        if (idDelete == 0 && worksInfo.length == 0) {
            localStorage.removeItem('works'); // borrar item de local storage
        } else {
            localStorage.setItem('works', JSON.stringify(worksInfo)); // guardar datos reorganizados
        }
        renderWorkAdded(); // reenderizar elementos
    }
}