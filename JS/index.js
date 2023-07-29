var palabraJugar = document.querySelector(".jugar a");
var palabras = document.querySelectorAll(".efectos");

// Para entrar al Simon
palabraJugar.addEventListener("click", jugarSimon);

function jugarSimon() {
  window.location.href = "simon.html";
  jugarSimon.classList.remove("efecto-clic");
  jugarSimon.classList.add("efecto-clic");
}

// Para hacer zoom en las palabras
function acercarse(evento) {
  evento.target.style.transform = "scale(1.2)";
}

function alejarse(evento) {
  evento.target.style.transform = "scale(1)";
}

palabras.forEach((palabra) => {
  palabra.addEventListener("mouseenter", acercarse);
  palabra.addEventListener("mouseleave", alejarse);
});
