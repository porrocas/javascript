//Variables
const formWorks = document.getElementById('formWorks');
const contentWorks = document.getElementById('contentWorks');

//Tareas Primarias
readWorks();

//Eventos
eventListener();

function eventListener() {
    formWorks.addEventListener('submit', (event) => {
        // funcion al enviar formulario
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
}

//Funciones
function readWorks() {
    const data = localStorage.getItem('works');
    if (data == null || data == undefined) {
        console.log('no hay tareas que renderizar');
    } else {
        // traer información de tareas
        const worksInfo = JSON.parse(localStorage.getItem('works'));
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
                  <button onclick="deleteWork()" class="btn-delete-work btn btn-success">Finalizar</button>
            `;
            containerWork.appendChild(contentWork);
            contentWorks.appendChild(containerWork);
        });
    }
}

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
    const worksInfo = JSON.parse(localStorage.getItem('works'));
    const infoForRender = worksInfo[worksInfo.length - 1];
    console.log('prioridad: ' + infoForRender.priority);

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
                  <button onclick="deleteWork()" class="btn-delete-work btn btn-success">Finalizar</button>
            `;
    containerWork.appendChild(contentWork);
    contentWorks.appendChild(containerWork);
}