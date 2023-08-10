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
var puntaje = 1;
var atras = document.getElementById("img");
var atrasModal = document.getElementById("imgModal");
var entrar = document.getElementById("entrar");
var nombreIngresado = document.getElementById("nombreIngresado");
var contenedorIngreso = document.querySelector(".contenedorIngreso");
var contenedorFinal = document.querySelector(".contenedorFinalPartida");
var mensajeError = document.getElementById("mensajeError");
var puntajeTexto = document.getElementById("puntajeTexto");
var penalizacionTexto = document.getElementById("penalizacionTexto");
var puntajeTotalTexto = document.getElementById("puntajeTotalTexto");
var empezarDeNuevo = document.getElementById("reiniciar");
var penalizacion;
var puntajeTotal;
var partidasJugadas = [];

document.addEventListener("DOMContentLoaded", function () {
  cargarPartidasGuardadas();
  contenedorFinal.classList.add("ocultar");
});

function reproducir(color) {
  var audio = new Audio("../sonidos/" + color + ".mp3");
  audio.play();
}

function reproducirError() {
  var audio = new Audio("../sonidos/error.mp3");
  audio.play();
}

botonComenzar.addEventListener("click", empezarJuego);

function empezarJuego() {
  if (!enCurso) {
    enCurso = true;
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
  secuenciaJuego = [];
  secuenciaJugador = [];
  ronda = 1;
  puntaje = 1;
  clearInterval(temporizador);
  actualizarRonda();
  actualizarMostrarTemp(0);
  deshabilitarJugador();
  contenedorIngreso.classList.remove("ocultar");
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
      reproducir(color);
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
    reproducirError();
    contenedorFinal.classList.remove("ocultar");
    actualizarPuntaje();
    guardarLocalStorage();
  } else {
    puntaje++;
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
  penalizacion = tiempoTranscurrido * 45;
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

function actualizarPuntaje() {
  puntajeDescontar = (puntaje - 1) * 1000;
  puntajeTexto.innerHTML = "PUNTAJE: " + puntajeDescontar;
  penalizacionTexto.innerHTML = "PENALIZACION: " + penalizacion;
  puntajeTotal = puntajeDescontar - penalizacion;
  puntajeTotalTexto.innerHTML = " PUNTAJE TOTAL: " + puntajeTotal;
}

function actualizarRonda() {
  mostrarRonda.textContent = "RONDA: " + ronda;
}

//LocalStorage
function guardarLocalStorage() {
  var fechaActual = new Date();
  var partidaActual = {
    nombre: nombreIngresado.value,
    puntajeTotal: puntajeTotal,
    ronda: ronda - 1,
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
  };
  partidasJugadas.push(partidaActual);
  localStorage.setItem("partidasJugadas", JSON.stringify(partidasJugadas));
}
function cargarPartidasGuardadas() {
  var partidasGuardadas = localStorage.getItem("partidasJugadas");
  if (partidasGuardadas) {
    partidasJugadas = JSON.parse(partidasGuardadas); //crea arrreglo
  }
}

// Para ir a home
atras.addEventListener("click", retroceder);
function retroceder() {
  window.location.href = "index.html";
}
atrasModal.addEventListener("click", retrocederModal);
function retrocederModal() {
  window.location.href = "index.html";
}

//Modal
entrar.addEventListener("click", entrarJuego);
function entrarJuego() {
  if (nombreIngresado.value.length >= 3) {
    contenedorIngreso.classList.add("ocultar");
  } else {
    mensajeError.innerHTML = `El nombre debe tener como mínimo 3 caracteres`;
  }
}

//Reiniciar el juego
empezarDeNuevo.addEventListener("click", reiniciarJuego);
function reiniciarJuego() {
  reiniciar();
  contenedorFinal.classList.add("ocultar");
}
