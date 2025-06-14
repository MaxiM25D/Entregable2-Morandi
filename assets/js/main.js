let productos = [];

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

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    alert("⚠️ Por favor, ingresá datos válidos.");
    return;
  }

  productos.push({ nombre, precio, stock });
  formAgregar.reset(); // Limpia el formulario
  mostrarStock(); // Actualiza la lista
});

// Registrar venta
formVenta.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombreVenta = document.getElementById("venta-nombre").value.trim().toLowerCase();
  const producto = productos.find(p => p.nombre.toLowerCase() === nombreVenta);

  if (!producto) {
    alert("❌ Producto no encontrado.");
    return;
  }

  if (producto.stock > 0) {
    producto.stock--;
    alert(`✅ Venta registrada. Stock restante: ${producto.stock}`);
  } else {
    alert("⚠️ El producto no tiene stock disponible.");
  }

  formVenta.reset();
  mostrarStock();
});