//variables
const btnCotizar = document.getElementById('btnCotizar');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const tipoSeguro = document.getElementsByName('tipoSeguro');

//eventos
addEvents();

function addEvents() {
    //start App
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
        btnCotizar.disabled = true;
    });
    marca.addEventListener('change', () => {
        validarCampos();
    });
    modelo.addEventListener('change', () => {
        validarCampos();
    });
    btnCotizar.addEventListener('click', (e) => {
        e.preventDefault();
        tipoSeguro.forEach(item => {
            if (item.checked) {
                cotizarSeguro(marca.value, modelo.value, item.value);
            }
        })
    });
}

//clases
class Seguro {
    constructor(marca, modelo, tipo) {
        this.marca = marca;
        this.modelo = modelo;
        this.tipo = tipo;
        this.precioBase = function() {
            switch (marca) {
                case 'Honda':
                    return 1000000;
                    break;
                case 'Ford':
                    return 1500000;
                    break;
                case 'Bmw':
                    return 2000000;
                    break;
                default:
                    return Error;
                    break;
            }
        }
        this.precioSeguro = function() {
            const year = new Date().getFullYear(); // obtener año actual
            const precioBase = this.precioBase();
            return logicaSeguro(modelo, year, precioBase, tipo);
        };
        this.descuento = function() {
            const year = new Date().getFullYear(); // obtener año actual
            const descuento = (year - this.modelo) * 0.03 * 100;
            return descuento + '%';
        };
    }
    get getMarca() {
        return this.marca;
    }
    get getModelo() {
        return this.modelo;
    }
    get getTipoSeguro() {
        return this.tipo;
    }
    get getPrecioBase() {
        return this.precioBase();
    }
    get getPrecioSeguro() {
        return this.precioSeguro();
    }
    get getDescuento() {
        return this.descuento();
    }
}

//funciones
function validarCampos() {
    if (modelo.value != "" && marca.value != "") {
        btnCotizar.disabled = false;
    } else {
        btnCotizar.disabled = true;
    }
}

function logicaSeguro(modelo, year, precioBase, tipo) {
    const edadAuto = year - modelo;
    if (edadAuto != 0) {
        for (let i = 0; i < edadAuto; i++) {
            precioBase -= precioBase * 0.03; // cada año de edad del auto reduce un 3% el costo del seguro;
        }
    }
    if (tipo == 'Premium') {
        return precioBase += 150000;
    } else {
        return precioBase;
    }
}

function cotizarSeguro(marca, modelo, tipoSeguro) {
    const seguro = new Seguro(marca, modelo, tipoSeguro);
    const datosSeguro = {
        marca: seguro.getMarca,
        modelo: seguro.getModelo,
        TipoSeguro: seguro.getTipoSeguro,
        precioBase: seguro.getPrecioBase,
        precioSeguro: seguro.getPrecioSeguro,
        descuento: seguro.getDescuento
    };
    console.table(datosSeguro);
    renderCotizacion(datosSeguro);
}

function renderCotizacion(datosSeguro) {
    const container = document.getElementById('render');

    container.innerHTML = `
                        <div class="card">
                            <div class="card-content black-text">
                                <span class="card-title">Cotización: </span>
                                <p>Buscamos el mejor seguro por ti, y solo para ti.</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Tipo de seguro</th>
                                            <th>Precio Base</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>${datosSeguro.marca}</td>
                                            <td>${datosSeguro.modelo}</td>
                                            <td>${datosSeguro.TipoSeguro}</td>
                                            <td>$${datosSeguro.precioBase.toFixed()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h6>Detalles: </h6>
                                <p>Precio base: $${datosSeguro.precioBase.toFixed()}</p>
                                <p>Descuento: ${datosSeguro.descuento}</p>
                                <p>Precio a pagar: $${datosSeguro.precioSeguro.toFixed()}</p>
                            </div>
                            <div class="card-action">
                                <button class="btn">Comprar Seguro</button>
                            </div>
                        </div>
                        `;
}