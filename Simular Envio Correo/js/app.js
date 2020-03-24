// variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');
const load = document.getElementById('load');
//eventos
addEvents();

function addEvents() {
    // iniciar app correctamente
    document.addEventListener('DOMContentLoaded', startApp);
    // validar campos
    email.addEventListener('input', validarCampo);
    asunto.addEventListener('input', validarCampo);
    mensaje.addEventListener('input', validarCampo);
    // enviar email
    enviar.addEventListener('click', enviarEmail);
}

// funciones
function startApp() {
    // desabilita el boton al iniciar app
    enviar.disabled = true;
}

function validarCampo() {
    // se validan inputs
    if (email.classList.contains('valid') && asunto.value.length > 0 && mensaje.value.length > 0) {
        enviar.disabled = false;
    } else {
        enviar.disabled = true;
    }

    if (email.classList.contains('invalid') || asunto.value.length == 0 || mensaje.value.length == 0) {
        enviar.disabled = true;
    }
}

function resetInputs() {
    email.value = '';
    asunto.value = '';
    mensaje.value = '';
    enviar.disabled = true;
    email.classList.remove('valid');
    asunto.classList.remove('valid');
    mensaje.classList.remove('valid');
}

function enviarEmail(evento) {
    console.log('email enviado');
    evento.preventDefault();
    const row = document.createElement('div');
    row.innerHTML = `
      <div>
            <img src="./img/spinner.gif" width="100px" alt="load">
      </div>
    `;
    load.appendChild(row);
    setTimeout(() => {
        load.innerHTML = '';
        const row = document.createElement('div');
        row.innerHTML = `
            <div>
                  <img src="./img/mail.gif" width="100px" alt="load">
                  <p>Correo Enviado</p>
            </div>
            `;
        load.appendChild(row);
        setTimeout(() => {
            load.innerHTML = '';
            email.value = '';
            asunto.value = '';
            mensaje.value = '';
            email.classList.remove('valid');
            asunto.classList.remove('valid');
        }, 4000);
    }, 3000);
}