const valoraciones = document.querySelectorAll(".valoracion-pelicula");
const filas = document.querySelector("tbody").children;
const campoBusqueda = document.querySelector("#busqueda");
let inputsPelis;

document.addEventListener("DOMContentLoaded", () => {
  for (const valoracion of valoraciones) {
    let estrellas = valoracion.children;
    for (const estrella of estrellas) {
      estrella.addEventListener("mouseover", hoverValoracion);
      estrella.addEventListener("mouseleave", hoverValoracion);
      estrella.addEventListener("click", actualizarValoracion);
    }
  }
  campoBusqueda.addEventListener("keyup", aplicarBusqueda);
  inputsPelis = document.getElementsByTagName("input");
});

const hoverValoracion = (e) => {
  const valoracionActualOCandidata =
    e.type == "mouseleave"
      ? e.target.parentNode.getAttribute("valoracion")
      : e.target.getAttribute("valor");
  const estrellas = document.getElementsByName(
    e.target.parentNode.getAttribute("id")
  );
  for (let i = 0; i < valoracionActualOCandidata; i++) {
    if (!estrellas[i].classList.contains("checked")) {
      estrellas[i].classList.add("checked");
    }
  }
  for (let i = valoracionActualOCandidata; i < estrellas.length; i++) {
    estrellas[i].classList.remove("checked");
  }
};

const actualizarValoracion = async (e) => {
  const formularioPadre = e.target.parentNode;
  const idPeli = formularioPadre.id.value;
  const nuevaValoracion = e.target.getAttribute("valor");

  let datosPeli = [];

  for (const input of inputsPelis) {
    if (input.value == idPeli) {
      datosPeli.push(input);
      break;
    }
  }

  datosPeli = [...datosPeli, datosPeli[0].nextSibling];
  datosPeli[1].value = nuevaValoracion;

  let accionFormulario = formularioPadre.getAttribute("action");

  const formData = new FormData(formularioPadre);
  const url = accionFormulario;

  try {
    const respuesta = await postDatosFormularioJSON({ url, formData });

    console.log({ respuesta });
  } catch (error) {
    console.error(error);
  }

  formularioPadre.setAttribute("valoracion", nuevaValoracion);
};

const postDatosFormularioJSON = async ({ url, formData }) => {
  const datosPlanosFormulario = Object.fromEntries(formData.entries());
  const cadenaFormularioJson = JSON.stringify(datosPlanosFormulario);

  const opcionesFetch = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: cadenaFormularioJson,
  };

  const respuesta = await fetch(url, opcionesFetch);

  if (!respuesta.ok) {
    const errorMessage = await respuesta.text();
    throw new Error(errorMessage);
  }

  return respuesta.json();
};

const aplicarBusqueda = (e) => {
  const valor = e.target.value;

  for (const fila of filas) {
    fila.removeAttribute("hidden");

    let imdbId = fila.children.item(0).textContent;
    let titulo = fila.children.item(1).textContent.toLowerCase();
    let año = fila.children.item(2).textContent;
    let valoracion = fila.lastChild.firstChild.valoracion.value;

    if (!isNaN(valor)) {
      let numero = Number(valor);
      if (valor.length == 1) {
        if (valoracion != numero) {
          fila.setAttribute("hidden", "");
        }
      } else {
        if (!año.includes(valor)) {
          fila.setAttribute("hidden", "");
        }
      }
    } else {
      if (valor.toLowerCase().startsWith("tt") && !isNaN(valor.charAt(2))) {
        if (!imdbId.includes(valor.toLowerCase())) {
          fila.setAttribute("hidden", "");
        }
      } else if (!titulo.includes(valor.toLowerCase())) {
        fila.setAttribute("hidden", "");
      }
    }
  }
};
