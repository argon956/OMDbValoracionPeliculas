const valoraciones = document.querySelectorAll(".valoracion-pelicula");

document.addEventListener("DOMContentLoaded", () => {
  for (const valoracion of valoraciones) {
    let estrellas = valoracion.children;
    for (const estrella of estrellas) {
      estrella.addEventListener("mouseover", hoverValoracion);
      estrella.addEventListener("mouseleave", hoverValoracion);
      estrella.addEventListener("click", actualizarValoracion);
    }
  }
});

const hoverValoracion = (e) => {
  const valoracionActualOCandidata =
    e.type == "mouseover"
      ? e.target.getAttribute("valor")
      : e.target.parentNode.getAttribute("valoracion");
  const estrellas = e.target.parentNode.children;
  for (let i = 0; i < valoracionActualOCandidata; i++) {
    if (!estrellas[i].classList.contains("checked")) {
      estrellas[i].classList.add("checked");
    }
  }
  for (let i = valoracionActualOCandidata; i < estrellas.length; i++) {
    estrellas[i].classList.remove("checked");
  }
};

const actualizarValoracion = (e) => {
  const idPeli = e.target.parentNode.parentNode.getAttribute("id");
  const nuevaValoracion = e.target.getAttribute("valor");
};
