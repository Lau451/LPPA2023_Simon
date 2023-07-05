var botones = document.querySelectorAll(".juego button");
var tiempoEncendido = 2000; // Duración del encendido en milisegundos
var tiempoApagado = 500; // Tiempo entre encendidos en milisegundos

function encenderBotonElegido() {
  // Apagar todos los botones
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("active");
  }

  // Obtener un botón aleatorio
  var botonAleatorio = Math.floor(Math.random() * botones.length);
  var botonElegido = botones[botonAleatorio];

  // Encender el botón aleatorio
  botonElegido.classList.add("active");

  // Esperar tiempoEncendido milisegundos y apagar el botón
  setTimeout(function () {
    botonElegido.classList.remove("active");
  }, tiempoEncendido);
}

// Llamar a la función inicialmente
encenderBotonElegido();

// Encender un botón aleatorio cada 3 segundos
setInterval(encenderBotonElegido, tiempoApagado + tiempoEncendido);
