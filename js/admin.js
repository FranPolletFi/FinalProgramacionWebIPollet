// ARRAY DE PRODUCTOS (MISMO QUE INDEX)

const productos = [
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

const tbody = document.getElementById("tbody-productos");

// RENDER DE TABLA
function renderTabla(arrayProductos) {
    tbody.innerHTML = "";

    arrayProductos.forEach((p) => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${p.img}" class="img-tabla"></td>
                <td>${p.name}</td>
                <td class="descripcionAdmin">${p.descripcion}</td>
                <td>$${p.precio}</td>
                <td>
                    <button class="btn-editar" onclick="editar(${p.id})">✎</button>
                    <button class="btn-eliminar" onclick="eliminar(${p.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

renderTabla(productos);

// ELIMINAR
function eliminar(id) {
    const index = productos.findIndex(p => p.id === id);
    //Primero alertamos de la eliminación
    if (!confirm("¿Eliminar producto?")) return;
    productos.splice(index, 1);
    renderTabla(productos);
}

//Editar
function editar(id) {
    const producto = productos.find(p => p.id === id);
    const nuevoNombre = prompt("Nuevo nombre:", producto.name);
    const nuevaDescripcion = prompt("Nueva descripción:", producto.descripcion);
    const nuevoPrecio = parseFloat(prompt("Nuevo precio:", producto.precio));
    while (isNaN(nuevoPrecio) || nuevoPrecio < 0 || nuevoPrecio > 8000) {
        alert("Precio inválido. Ingrese un número entre 0 y 8000.");
        nuevoPrecio = parseFloat(prompt("Nuevo precio:", producto.precio));
    }
    const nuevaImg = prompt("Nueva URL de imagen:", producto.img);
    if (nuevoNombre) producto.name = nuevoNombre;
    if (nuevaDescripcion) producto.descripcion = nuevaDescripcion;
    if (!isNaN(nuevoPrecio)) producto.precio = nuevoPrecio;
    if (nuevaImg) producto.img = nuevaImg;
    renderTabla(productos);
}


// FORMULARIO - AGREGAR
const formAdmin = document.getElementById("form-admin");
formAdmin.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const nombre = document.getElementById("admin-nombre").value;
    const descripcion = document.getElementById("admin-descripcion").value;
    const precio = parseFloat(document.getElementById("admin-precio").value);
    const img = document.getElementById("admin-img").value || "https://via.placeholder.com/200";

    const nuevo = {
        id: productos.length + 1,
        name: nombre,
        descripcion: descripcion,
        precio: precio,
        img: img
    };

    productos.push(nuevo);
    renderTabla(productos);
    formAdmin.reset();
});
