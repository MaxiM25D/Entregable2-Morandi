let productos = [];

// Recuperar productos guardados al inicio
function cargarDesdeLocalStorage() {
  const guardado = localStorage.getItem("productos");
  if (guardado) {
    productos = JSON.parse(guardado);
  }
  else {
    productos = [];
  }
  mostrarStock();
}
// Guardar productos cada vez que se actualiza el array
function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

const formAgregar = document.getElementById("form-agregar");
const formVenta = document.getElementById("form-venta");
const listaStock = document.getElementById("lista-stock");

// Mostrar stock//
function mostrarStock() {
  const btnLimpiar = document.getElementById("btn-limpiar");
  listaStock.innerHTML = ""; // Limpiar antes de volver a renderizar

  if (productos.length === 0) {
    listaStock.innerHTML = "<li class='no-stock'>😮 No hay productos cargados.</li>";
    btnLimpiar.style.display = "none"; // Ocultar botón si no hay productos
    return;
  }

  productos.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. Produc: ${p.nombre} - $${p.precio} | Stock: ${p.stock}`;
    listaStock.appendChild(li);
  });
btnLimpiar.style.display = "inline-block"; // Mostrar botón si hay productos
}

//Borrar lista de stock//
document.getElementById("btn-limpiar").addEventListener("click", () => {
  const confirmacion = confirm("⚠️ ¿Estás seguro de que querés borrar todos los productos? ⚠️");

  if (confirmacion) {
    localStorage.removeItem("productos");
    productos = [];
    mostrarStock();
  } else {
    alert("❌ Operación cancelada. ❌");
  }
});

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