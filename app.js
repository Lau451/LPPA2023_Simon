var botones = document.querySelectorAll(
  ".verde",
  ".rojo",
  ".azul",
  ".amarillo"
);

function encenderBoton() {
  var botonAleatorio = botones[Math.floor(Math.random() * botones.length)];
  botonAleatorio.classList.add("active");

  setTimeout(function () {
    botonAleatorio.classList.remove("active");
  }, 500);
}
function iniciarSecuencia() {
  setInterval(encenderBoton, 2000);
}

encenderBoton();
iniciarSecuencia();
