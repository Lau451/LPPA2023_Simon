var atras = document.getElementById("img");
var listaPartidas = document.querySelector(".listaPartidas");
var contenido = document.getElementById("contenido");
var obtenerPartidas = localStorage.getItem("partidasJugadas");
var partidasJugadas = JSON.parse(obtenerPartidas);

if (partidasJugadas) {
  partidasJugadas.sort(function (a, b) {
    return b.puntajeTotal - a.puntajeTotal;
  });

  contenido.innerHTML = "";

  partidasJugadas.forEach(function (dato) {
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
} else {
  console.log("No hay partidas jugadas o el valor no es válido.");
}

// Para ir a home
atras.addEventListener("click", retroceder);

function retroceder() {
  window.location.href = "index.html";
}
