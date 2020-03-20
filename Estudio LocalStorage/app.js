// agregar a localstorage || sessionStorage

localStorage.setItem('Persona', {
    nombre: 'Daniel Mateus',
    edad: '22',
    correo: 'u1802833@unimilitar.edu.co',
    telefono: '3166989045'
});

sessionStorage.setItem('Nombre', 'Daniel Mateus');

// eliminar a localstorage || sessionStorage

localStorage.removeItem('Nombre');
sessionStorage.removeItem('Nombre');

// obtener a localstorage || sessionStorage

const objeto = localStorage.getItem('Persona');

// vaciar localstorage 
localStorage.clear();