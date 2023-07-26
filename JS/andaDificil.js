/*var comenzar = document.querySelector(".comenzar");
var botones = document.querySelectorAll(".juego button");
var tiempoEncendido = 1000;
var tiempoApagado = 500;
var patron = [];
var indiceActual = 0; // Índice del botón actual en la secuencia

comenzar.addEventListener("click", function () {
  encenderBotonElegido();
});

function encenderBotonElegido() {
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("active");
  }

  var botonAleatorio = Math.floor(Math.random() * botones.length);
  var botonElegido = botones[botonAleatorio];
  console.log(botonElegido);
  patron.push(botonElegido);
  console.log(patron);
  var ronda = document.getElementById("round");
  var tamanoRonda = patron.length;
  ronda.innerHTML = tamanoRonda;
  var puntaje = document.getElementById("puntaje");
  puntuacion = tamanoRonda * 100;
  puntaje.innerHTML = puntuacion;
  // Encender el botón aleatorio
  botonElegido.classList.add("active");

  setTimeout(function () {
    botonElegido.classList.remove("active");

    // Verificar si es el último botón en la secuencia
    if (indiceActual === patron.length - 1) {
      // Si es el último, mostrar toda la secuencia
      indiceActual = 0; // Reiniciar el índice para mostrar la secuencia desde el principio
      mostrarSecuencia();
    } else {
      // Si no es el último, pasar al siguiente botón
      indiceActual++;
      encenderBotonElegido();
    }
  }, tiempoEncendido);
}

function mostrarSecuencia() {
  // Desactivar todos los botones
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("active");
  }

  // Iterar sobre la secuencia y encender cada botón en orden
  var secuenciaInterval = setInterval(function () {
    if (indiceActual >= patron.length) {
      clearInterval(secuenciaInterval); // Detener la secuencia después de mostrar todos los botones
      // Llamar nuevamente a la función para seguir agregando botones aleatorios
      setTimeout(encenderBotonElegido, tiempoApagado);
    } else {
      var botonActual = patron[indiceActual];
      botonActual.classList.add("active");
      setTimeout(function () {
        botonActual.classList.remove("active");
        indiceActual++;
      }, tiempoEncendido);
    }
  }, tiempoApagado + tiempoEncendido);
}*/

// JavaScript con la interacción del usuario
var comenzar = document.querySelector(".comenzar");
var botones = document.querySelectorAll(".juego button");
var tiempoEncendido = 1000;
var tiempoApagado = 500;
var patron = [];
var indiceActual = 0; // Índice del botón actual en la secuencia
var enCurso = false; // Bandera para evitar múltiples secuencias superpuestas
var bloquearInteraccion = true; // Variable para bloquear interacción del usuario durante la secuencia
var colaDeClics = []; // Cola para almacenar los clics del usuario durante la secuencia

comenzar.addEventListener("click", function () {
  if (!enCurso) {
    iniciarJuego();
  }
});

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    if (enCurso && !bloquearInteraccion) {
      colaDeClics.push(boton);
      if (colaDeClics.length === patron.length) {
        procesarClicsUsuario();
      }
    }
  });
});

function iniciarJuego() {
  enCurso = true;
  patron = [];
  indiceActual = 0;
  bloquearInteraccion = true;
  colaDeClics = [];
  encenderBotonElegido();
}

function procesarClicsUsuario() {
  for (var i = 0; i < colaDeClics.length; i++) {
    if (colaDeClics[i] !== patron[i]) {
      mostrarMensajeError();
      return;
    }
  }

  bloquearInteraccion = true;
  colaDeClics = [];
  siguienteRonda();
}

function mostrarMensajeError() {
  alert("¡Incorrecto! Juego terminado.");
  enCurso = false;
  bloquearInteraccion = false;
}

function encenderBotonElegido() {
  botones.forEach(function (boton) {
    boton.classList.remove("active");
  });

  var botonAleatorio = Math.floor(Math.random() * botones.length);
  var botonElegido = botones[botonAleatorio];
  patron.push(botonElegido);

  mostrarSecuencia();
}

function mostrarSecuencia() {
  var i = 0;

  function mostrarSiguienteBoton() {
    if (i < patron.length) {
      var botonActual = patron[i];
      botonActual.classList.add("active");

      setTimeout(function () {
        botonActual.classList.remove("active");
        i++;
        setTimeout(mostrarSiguienteBoton, tiempoApagado); // Esperar antes de mostrar el siguiente botón
      }, tiempoEncendido);
    } else {
      // Después de mostrar toda la secuencia
      bloquearInteraccion = false;
      enCurso = true;
      indiceActual = 0;
    }
  }

  botones.forEach(function (boton) {
    boton.classList.remove("active");
  });
  bloquearInteraccion = true;
  mostrarSiguienteBoton();
}

function siguienteRonda() {
  indiceActual = 0;
  setTimeout(encenderBotonElegido, tiempoApagado);
}
