const card = document.getElementById('contCards');
const numeroProductos = document.getElementById('numeroProductos');
const contP = document.getElementById('container-product');
const contCart = document.getElementById('contCart');
const viewPrice = document.getElementById('viewPrice');

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
    contCart.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.classList[0] === 'deleteCartProduct') {
            console.log('eliminar producto');
            const img = event.target.parentElement.parentElement.querySelector('img').src;
            const title = event.target.parentElement.parentElement.querySelectorAll('p')[0].innerHTML;
            const precio = event.target.parentElement.parentElement.querySelectorAll('p')[1].innerHTML;
            const precioModified = precio.split('$');
            const objetoProducto = {
                img: img,
                title: title,
                price: Number(precioModified[1])
            }
            deleteProduct(objetoProducto);
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
        img: dataProduct.querySelector('img').src.trim(),
        title: dataProduct.querySelector('div').querySelector('h5').innerHTML.trim(),
        price: Number(precio[1])
    };
    return datos;
}

// renderizar productos
function renderProducts() {
    contCart.innerHTML = '';
    const products = JSON.parse(localStorage.getItem('cart'));
    const infoLocal = localStorage.getItem('cart');

    // verificar si hay informacion en local y guardarla
    if (infoLocal != null || infoLocal != undefined) {
        numeroProductos.innerHTML = products.length;
        products.forEach((item, index) => {
            // crear elemento y renderizarlo en html
            const row = document.createElement('div');
            row.className = 'ml-1 dropdown-item w-100 d-flex justify-content-between align-items-center';
            row.innerHTML = `
            <div class="col-md-3">
                <img src="${item.img.trim()}" alt="producto 1" width="100%">
            </div>
            <div class="col-md-3">
                <p class="text-muted text-center">${item.title.trim()}</p>
            </div>
            <div class="col-md-1">
                <p class="text-success text-center precio">$${item.price}</p>
            </div>
            <div>
                <button class="deleteCartProduct btn rounded-circle btn-danger">x</button>
            </div>
            `;
            contCart.appendChild(row);
        });

    } else {
        numeroProductos.innerHTML = '0'
        contCart.innerHTML = '';
    }

    // renderizar precio

    renderPrice();
}

function deleteProduct(objeto) {
    let productosCart = JSON.parse(localStorage.getItem('cart'));
    let arrayNew = [];
    productosCart.forEach(item => {
        arrayNew.push(JSON.stringify(item));
    })
    const idDelete = arrayNew.indexOf(JSON.stringify(objeto));
    arrayNew.splice(idDelete, 1);
    let arraySave = []
    arrayNew.forEach(item => {
        arraySave.push(JSON.parse(item));
    })
    localStorage.setItem('cart', JSON.stringify(arraySave));

    if (JSON.parse(localStorage.getItem('cart')).length == 0) {
        localStorage.removeItem('cart');
    }

    renderProducts();
}


function renderPrice() {
    const infoLocal = localStorage.getItem('cart');

    // verificar si hay informacion en local y guardarla
    if (infoLocal != null || infoLocal != undefined) {
        viewPrice.innerHTML = '';
        const p = JSON.parse(localStorage.getItem('cart'));
        let precio = 0;
        p.forEach(item => {
            precio += item.price;
        })

        const row = document.createElement('div');
        row.className = 'ml-1 dropdown-item w-100 d-flex justify-content-between align-items-center';
        row.innerHTML = `
            <div>
                <small class="text-success">
                 Total a Pagar: $${precio}
                </small>
            </div>
            
            <div class="col-md-6">
                <button class="btn btn-primary btn-lg btn-block">Pagar</button>
            </div>
        `
        viewPrice.appendChild(row);
    } else {
        viewPrice.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'ml-1 dropdown-item w-100 d-flex justify-content-between align-items-center';
        row.innerHTML = `
            <div>
                <small class="text-success">
                 Total a Pagar: $0
                </small>
            </div>
        `
        viewPrice.appendChild(row);
    }
}