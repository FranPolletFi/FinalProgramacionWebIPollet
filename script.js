//Array de Empanadas

const empanadas = [
    {
    id: 1,
    name: 'Carne a Cuchillo',
    descripcion: 'Carne cuadrada premium con corte a cuchillo artesanal, en mix de morrón y huevo con toque secreto salteño.',
    precio: 4800,
    img: `https://http2.mlstatic.com/D_846733-MLA81772829870_012025-O.jpg`
    },
    {
    id: 2,
    name: 'Carne Suave',
    descripcion: 'Corte de paleta premium, salteado con cebolla y morrón, mezclado con huevo duro y delicadas especias de nuestra tradición.',
    precio: 4200,
    img: 'https://http2.mlstatic.com/D_869289-MLA81772680822_012025-O.jpg'
    },
    {
    id: 3,
    name: 'Carne Picante',
    descripcion: 'Corte de paleta premium, salteado de cebolla, morrón y un toque verdeo huevo duro, especias y ají picante.',
    precio: 4350,
    img: 'https://http2.mlstatic.com/D_968876-MLA82051804859_012025-O.jpg'
    },
    {
    id: 4,
    name: 'Cheese Burger',
    descripcion: 'Blend de ojo de bife y vacio, doble bacon, con toque de bbq y mar de cheddar.',
    precio: 5100,
    img: 'https://http2.mlstatic.com/D_708722-MLA81772680988_012025-O.jpg '
    },
    {
    id: 5,
    name: 'Jamón y Queso',
    descripcion: 'Jamón cocido feteado con abundante muzzarella seleccionada.',
    precio: 4200,
    img: 'https://http2.mlstatic.com/D_657313-MLA81773035442_012025-O.jpg'
    },
    {
    id: 6,
    name: 'Pollo',
    descripcion: 'Suprema de pollo cortada en trozos a base de cebolla, morrón y salsa de especias, cocinado a fuego lento finalizado con huevo duro.',
    precio: 4500,
    img: 'https://http2.mlstatic.com/D_672831-MLA81772690602_012025-O.jpg'
    },
    {
    id: 7,
    name: 'Choclo',
    descripcion: 'Deliciosa mezcla de choclo entero, choclo cremoso y especias abundante queso muzzarella.',
    precio: 4300,
    img: 'https://http2.mlstatic.com/D_925394-MLA82051764975_012025-O.jpg'
    },
    {
    id: 8,
    name: 'Cuatro Quesos',
    descripcion: 'Blend de abundante queso muzzarella, quesardo seleccionado, roquefort intenso y provolone estacionado',
    precio: 4900,
    img: 'https://http2.mlstatic.com/D_674941-MLA81772829782_012025-O.jpg'
    },
    {
    id: 9,
    name: 'Queso y Cebolla',
    descripcion: 'Perfecta unin muzzarella seleccionada y salteado de cebolla, con ligero toque de quesardo estacionado.',
    precio: 4250,
    img: 'https://http2.mlstatic.com/D_676600-MLA82051597547_012025-O.jpg'
    },
    {
    id: 10,
    name: 'Verdura',
    descripcion: 'Salteado de espinaca, cebolla, morrón, puerro y verdeo con cremosa bechamel, rebosada de abundante muzzarella y sardo estacionado.',
    precio: 4250,
    img: 'https://http2.mlstatic.com/D_639159-MLA81773035660_012025-O.jpg'
    },
];


//Array de Favoritos
let favorites = [];

const menuGridHTML = document.getElementById("menu-grid");

//Render del menú de empanadas
function renderEmpanadas(arrayEmpanadas){

    menuGridHTML.innerHTML= '';

    arrayEmpanadas.forEach((emp) => {

        menuGridHTML.innerHTML += `<div class="item" id=itemProd>
                                        <div class="itemHeader">
                                            <div class="actionsItem">
                                                <button class="btnFav ${favorites.includes(emp.name) ? 'favActivo' : ''}" onclick="addFavorite('${emp.name}')">❤</button>
                                            </div>
                                            <h3>${emp.name}</h3>
                                            <div class="helperHeaderItem">
                                            </div>
                                        </div>
                                        <div class="itemContent">
                                            <div class="imgContainer">
                                                <img src="${emp.img}" alt="${emp.name}">
                                            </div>
                                            <div class="info">
                                                <p class="descripcion">${emp.descripcion}</p>
                                                <p class="precioInfo">$${emp.precio}</p>
                                            </div>                                            
                                        </div>
                                        <div class="botonAgregar">
                                            <button onclick="agregar('${emp.name}')">Agregar</button>
                                        </div>
                                    </div>`

    })
}
renderEmpanadas(empanadas);

//Filtrado de empanadas por nombre - input de búsqueda
function inputSearch(evt){
    console.log(evt.target.value)
    const search = evt.target.value.toLowerCase();

    const filterEmpanadas = empanadas.filter((emp) => {

        if(emp.name.toLowerCase().includes(search)){
            return true;
        }
        return false;
    })
    renderEmpanadas(filterEmpanadas)
}

//Funciones de ordneamiento ascedente y descendente por precio
function sortAsc(){
    const collator = new Intl.Collator(undefined, {sensitivity: 'base'})

    empanadas.sort((a, b) => {
        return collator.compare(a.precio, b.precio)
    })

    renderEmpanadas(empanadas);
}
function sortDesc(){
    const collator = new Intl.Collator(undefined, {sensitivity: 'base'})

    empanadas.sort((a, b) => {
        return collator.compare(b.precio, a.precio)
    })

    renderEmpanadas(empanadas)
}

//Agregar y-o Quitar una empanada a la lista de "Tu Pedido" 
let pedido = {}

function agregar(nombre){
    if(!pedido[nombre]){
        pedido[nombre] = 1;
    }else{
        pedido[nombre] ++;
    }

    renderListaPedido();
}
function quitar(nombre){
    if(!pedido[nombre]) return;

    pedido[nombre] --;

    if(pedido[nombre] === 0){
        delete pedido[nombre];
    }

    renderListaPedido();
}


//render de la lista del pedido
function renderListaPedido() {
    const pedidoListaHTML = document.getElementById("pedido-lista");
    pedidoListaHTML.innerHTML = '';

    let subtotal = 0;

    // Recorremos el objeto pedido correctamente
    for (const nombre in pedido) {

        const cantidad = pedido[nombre];

        // Buscamos la empanada completa en el array principal
        const empanada = empanadas.find(e => e.name === nombre);

        const totalTipo = cantidad * empanada.precio;

        subtotal += totalTipo;

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="item-pedido">
                <div>
                    <strong>${nombre} x${cantidad}</strong>
                    <div class="precio-total">$${totalTipo.toLocaleString()}</div>
                </div>

                <div class="controles">
                    <button onclick="quitar('${nombre}')" class="quitar">-</button>
                    <button onclick="agregar('${nombre}')" class="agregar">+</button>
                </div>
            </div>`;

        pedidoListaHTML.appendChild(li);
    }

    // Actualizar subtotal
    const subtotalHTML = document.getElementById("subtotal");
    subtotalHTML.innerText = `$${subtotal.toLocaleString()}`;

    // Calcular total
    const envio = 1800;
    const totalHTML = document.getElementById("total");
    totalHTML.innerText = `$${(subtotal + envio).toLocaleString()}`;
}

//Botón de vaciar pedido
function vaciarPedido(){
    pedido = {};
    renderListaPedido();
    document.getElementById("total").innerText = "$0";
}

//Ahora al tocar el boton de confirmar pedido, mostramos un alert con el resumen del pedido
const continuarBtnHTML = document.getElementById("continuar-btn");
function confirmarPedido(){
    //verificar si el pedido está vacío
    if(Object.keys(pedido).length === 0){
        alert("Tu pedido está vacío. Por favor, agrega empanadas antes de continuar.");
        return;
    }
    alert("Gracias por tu pedido. Nos pondremos en contacto contigo para coordinar la entrega."); 
    // Vaciar el pedido después de confirmar
    vaciarPedido();
}


//Función de añadir a favoritos
function addFavorite(nombre) {
    // Si ya está → quitar
    if (favorites.includes(nombre)) {
        favorites = favorites.filter(fav => fav !== nombre);
        //alert(`Has quitado "${nombre}" de tus empanadas favoritas.`);
    } else {
        favorites.push(nombre);
        //alert(`Has añadido "${nombre}" a tus empanadas favoritas.`);
    }

    renderEmpanadas(empanadas); // re-render para refrescar corazones
}

// Mostrar solo los favoritos
function showFavorites() {
    const favList = empanadas.filter(emp => favorites.includes(emp.name));
    renderEmpanadas(favList);
}

//Eliminar filtros aplicados y mostrar el menú completo
function deleteFilters(){
    renderEmpanadas(empanadas);
}

