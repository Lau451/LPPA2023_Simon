var secuenciaJuego = [];
var secuenciaJugador = [];
var botones = document.getElementsByClassName("btn");
var botonComenzar = document.getElementById("comenzar");
var ronda = 1;
var maxRonda = 400;
var enCurso = false;
var mostrarRonda = document.getElementById("ronda");
var mostrarTiempo = document.getElementById("tiempo");
var comenzarTiempo, finTiempo, temporizador;
var atras = document.getElementById("img");
var entrar = document.getElementById("entrar");
var nombreIngresado = document.getElementById("nombreIngresado");
var contenedorModal = document.querySelector(".contenedorModal");
var mensajeError = document.getElementById("mensajeError");

// Function to play the sound
function reproducir(color) {
  var audio = new Audio("../sonidos/" + color + ".mp3");
  audio.play();
}

// Function to play the sound of error
function reproducirError() {
  var audio = new Audio("../sonidos/error.mp3");
  audio.play();
}

botonComenzar.addEventListener("click", empezarJuego);

function empezarJuego() {
  if (!enCurso) {
    enCurso = true;
    botonComenzar.textContent = "Reiniciar";
    comenzarTemp();
    comenzarSecuencia();
    actualizarRonda();
  } else {
    reiniciar();
  }
}

function reiniciar() {
  enCurso = false;
  botones.disabled;
  botonComenzar.textContent = "Comenzar";
  secuenciaJuego = [];
  secuenciaJugador = [];
  ronda = 1;
  clearInterval(temporizador);
  actualizarRonda();
  actualizarMostrarTemp(0);
  deshabilitarJugador();
}

function comenzarSecuencia() {
  var colorAleatorio = obtenerColorAleatorio();
  secuenciaJuego.push(colorAleatorio);

  deshabilitarJugador();

  iluminarSecuencia(secuenciaJuego, function () {
    habilitarJugador();
  });
}

function iluminarSecuencia(secuencia, callback) {
  var i = 0;
  var intervalo = setInterval(function () {
    iluminarBoton(secuencia[i]);
    i++;
    if (i >= secuencia.length) {
      clearInterval(intervalo);
      callback();
    }
  }, 1000);
}

function iluminarBoton(color) {
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("active");
    if (botones[i].classList.contains(color)) {
      botones[i].classList.add("active");
      reproducir(color); // Play the sound when the button is highlighted
      setTimeout(function () {
        for (var i = 0; i < botones.length; i++) {
          botones[i].classList.remove("active");
        }
      }, 500);
    }
  }
}

function habilitarJugador() {
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", clickJugador);
  }
}

function deshabilitarJugador() {
  for (var i = 0; i < botones.length; i++) {
    botones[i].removeEventListener("click", clickJugador);
  }
}

function clickJugador(event) {
  var colorSeleccionado = event.target.classList[1];
  secuenciaJugador.push(colorSeleccionado);
  iluminarBoton(colorSeleccionado);
  var rondaActual = secuenciaJugador.length;
  if (secuenciaJugador[rondaActual - 1] !== secuenciaJuego[rondaActual - 1]) {
    reproducirError(); // Play the error sound when the button is incorrect
    //alert("¡Perdiste! Inténtalo de nuevo.");
    reiniciar();
  } else {
    if (rondaActual === ronda) {
      if (ronda === maxRonda) {
        alert("¡Ganaste!");
        reiniciar();
      } else {
        ronda++;
        secuenciaJugador = [];
        setTimeout(comenzarSecuencia, 1000);
        actualizarRonda();
      }
    }
  }
}

function comenzarTemp() {
  comenzarTiempo = new Date().getTime();
  temporizador = setInterval(actualizarTiempo, 1000);
}

function actualizarTiempo() {
  var tiempoActual = new Date().getTime();
  var tiempoTranscurrido = Math.floor((tiempoActual - comenzarTiempo) / 1000);
  actualizarMostrarTemp(tiempoTranscurrido);
}

function actualizarMostrarTemp(tiempo) {
  mostrarTiempo.textContent = "TIEMPO: " + tiempo + "s";
}

function obtenerColorAleatorio() {
  var colores = ["rojo", "azul", "verde", "amarillo"];
  var indiceAleatorio = Math.floor(Math.random() * colores.length);
  return colores[indiceAleatorio];
}

function actualizarRonda() {
  mostrarRonda.textContent = "RONDA: " + ronda;
}

// Para ir a home
atras.addEventListener("click", retroceder);

function retroceder() {
  window.location.href = "index.html";
}

//Modal
entrar.addEventListener("click", entrarJuego);
function entrarJuego() {
  if (nombreIngresado.value.length >= 3) {
    contenedorModal.classList.add("show");
  } else {
    mensajeError.innerHTML = `El nombre debe tener como mínimo 3 caracteres`;
  }
}
