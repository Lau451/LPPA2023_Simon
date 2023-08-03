var nombre = document.getElementById("nombreInput");
var correo = document.getElementById("correoInput");
var mensaje = document.getElementById("mensajeInput");
var formulario = document.querySelector(".formulario");
var parrafo = document.getElementById("advertencias");
var atras = document.getElementById("img");

formulario.addEventListener("submit", validaciones);

function validaciones(e) {
  e.preventDefault();
  var advertencias = "";
  var formatoCorreo = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
  var formatoNombre = /^[a-zA-Z0-9]+$/;
  var entrar = false;
  parrafo.innerHTML = "";
  if (mensaje.value.length < 6) {
    advertencias += `El mensaje no es válido <br>`;
    entrar = true;
  }
  if (!formatoCorreo.test(correo.value)) {
    advertencias += `El correo no es válido <br>`;
    entrar = true;
  }
  if (!formatoNombre.test(nombre.value)) {
    advertencias += `El nombre no es válido`;
    entrar = true;
  }
  if (entrar) {
    parrafo.innerHTML = advertencias;
  }
  if (!entrar) {
    enviarCorreo();
  }
}

function enviarCorreo() {
  window.location.href =
    "mailto:mail@example.com?subject=" +
    nombre.value +
    "&body=" +
    mensaje.value;
}

// Para ir a home
atras.addEventListener("click", retroceder);

function retroceder() {
  window.location.href = "index.html";
}
