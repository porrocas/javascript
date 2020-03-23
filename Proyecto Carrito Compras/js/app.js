const card = document.getElementById('contCards');
const numeroProductos = document.getElementById('numeroProductos');
const contP = document.getElementById('container-product');

// inicializador de funciones primarias
renderProducts();

// eventos 
addEvents();

function addEvents() {
    card.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.classList[0] === 'btn-add-cart') {
            const producto = event.target.parentElement.parentElement.parentElement;
            addProductCart(producto);
        }
    });
}


//funciones

//add producto
function addProductCart(producto) {
    const infoLocal = localStorage.getItem('cart');
    // verificar si hay informacion en local y guardarla
    if (infoLocal != null || infoLocal != undefined) {
        let datosProductos = JSON.parse(localStorage.getItem('cart'));
        datosProductos.push(leerDatosProducto(producto));
        localStorage.setItem('cart', JSON.stringify(datosProductos));
        renderProducts();
    } else {
        let datosProductos = [];
        datosProductos.push(leerDatosProducto(producto));
        localStorage.setItem('cart', JSON.stringify(datosProductos));
        renderProducts();
    }
}

// desglozar informacion del producto y devolverlo como un json
function leerDatosProducto(dataProduct) {
    const price = dataProduct.querySelector('div').querySelector('div').querySelector('p').innerHTML;
    const precio = price.split('$');
    const datos = {
        img: dataProduct.querySelector('img').src,
        title: dataProduct.querySelector('div').querySelector('h5').innerHTML,
        price: Number(precio[1])
    };
    return datos;
}

// renderizar productos
function renderProducts() {
    const products = JSON.parse(localStorage.getItem('cart'));
    const infoLocal = localStorage.getItem('cart');

    // verificar si hay informacion en local y guardarla
    if (infoLocal != null || infoLocal != undefined) {
        numeroProductos.innerHTML = products.length;
    } else {
        numeroProductos.innerHTML = '0'
    }
}