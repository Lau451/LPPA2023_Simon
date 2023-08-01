var palabraJugar = document.querySelector(".jugar a");
var palabraContacto = document.querySelector(".contacto a");
var palabraGithub= document.querySelector('.github a')
var palabras = document.querySelectorAll(".efectos");

// Para entrar al Simon
palabraJugar.addEventListener("click", jugarSimon);

function jugarSimon() {
  window.location.href = "simon.html";
}

//Para entrar a contactos
palabraContacto.addEventListener("click", entrarContacto);

function entrarContacto() {
  window.location.href = "contacto.html";
}

//Para entrar a GitHub
palabraGithub.addEventListener("click", entrarGithub);

function entrarGithub() {
  var url ="https://github.com/Lau451/LPPA2023_Simon" 
  window.open(url,'_blank')
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
