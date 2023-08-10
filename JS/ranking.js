var atras = document.getElementById("img");
var listaPartidas = document.querySelector(".listaPartidas");
var contenido = document.getElementById("contenido");
var obtenerPartidas = localStorage.getItem("partidasJugadas");
var partidasJugadas = JSON.parse(obtenerPartidas);
var ordenarPuntaje = document.getElementById("ordenarPorPuntaje");
var ordenarFecha = document.getElementById("ordenarPorFecha");

// Función para mostrar partidas en la tabla
function mostrarPartidas(partidas) {
  contenido.innerHTML = "";
  partidas.forEach(function (dato) {
    var fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" +
      dato.nombre +
      "</td>" +
      "<td>" +
      dato.puntajeTotal +
      "</td>" +
      "<td>" +
      dato.ronda +
      "</td>" +
      "<td>" +
      dato.fecha +
      "</td>" +
      "<td>" +
      dato.hora +
      "</td>";
    contenido.appendChild(fila);
  });
}

if (partidasJugadas) {
  mostrarPartidas(partidasJugadas);
  ordenarPuntaje.addEventListener("click", function () {
    partidasJugadas.sort(function (a, b) {
      return b.puntajeTotal - a.puntajeTotal;
    });
    mostrarPartidas(partidasJugadas);
  });

  ordenarFecha.addEventListener("click", function () {
    partidasJugadas.sort(function (a, b) {
      var fechaA = new Date(a.fecha + " " + a.hora);
      var fechaB = new Date(b.fecha + " " + b.hora);
      return fechaB - fechaA;
    });
    mostrarPartidas(partidasJugadas);
  });
} else {
  console.log("No hay partidas jugadas o el valor no es válido.");
}

// Para ir a home
atras.addEventListener("click", retroceder);

function retroceder() {
  window.location.href = "index.html";
}
