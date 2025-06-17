let productos = [];

// Recuperar productos guardados al inicio
function cargarDesdeLocalStorage() {
  const guardado = localStorage.getItem("productos");
  if (guardado) {
    productos = JSON.parse(guardado);
    mostrarStock();
  }
}

// Guardar productos cada vez que se actualiza el array
function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

const formAgregar = document.getElementById("form-agregar");
const formVenta = document.getElementById("form-venta");
const listaStock = document.getElementById("lista-stock");

// Función para actualizar el listado de productos
function mostrarStock() {
  listaStock.innerHTML = ""; // Limpiar antes de volver a renderizar
  productos.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. Produc: ${p.nombre} - $${p.precio} | Stock: ${p.stock}`;
    listaStock.appendChild(li);
  });
}

// Agregar producto
formAgregar.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!nombre || isNaN(precio) || isNaN(stock) || precio <= 0 || stock <= 0) {
    alert("⚠️ Por favor, ingresá datos válidos.\n 🟢Intente nuevamente con Datos correctos,\n Sin Num negativos, ni Espacios.");
    return;
  }

  productos.push({ nombre, precio, stock });
  
  formAgregar.reset(); // Limpia el formulario
  mostrarStock(); // Actualiza la lista
  guardarEnLocalStorage();
});

// Registrar venta
formVenta.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombreVenta = document.getElementById("venta-nombre").value.trim().toLowerCase();
  const producto = productos.find(p => p.nombre.toLowerCase() === nombreVenta);

  if (!producto) {
    alert("❌ Producto no encontrado.\n 🟢Corrobore que agregó este producto!\n 🟢Intente nuevamente con Datos correctos,\n Sin Num negativos, ni Espacios.");
    return;
  }

  if (producto.stock > 0) {
    producto.stock--;
    guardarEnLocalStorage();
    alert(`✅ Venta registrada. Stock restante: ${producto.stock}`);
  } else {
    alert("⚠️ El producto no tiene stock disponible.");
  }

  formVenta.reset();
  mostrarStock();
});
//carga al iniciar la pagina//
cargarDesdeLocalStorage();