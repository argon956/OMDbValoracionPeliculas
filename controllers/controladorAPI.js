import fetch from "node-fetch";
import clienteAxios from "../config/axios.js";

export const importarPeliculas = async () => {
  const apiKey = process.env.APIKEY;
  const pelicula = process.env.PELICULA;

  let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${pelicula}`;

  try {
    const res = await fetch(url);
    const peliculas = await res.json();
    return peliculas;
  } catch (error) {
    console.log(error);
  }
};

export const inicializarDB = async () => {
  let peliculasJson;

  try {
    peliculasJson = await importarPeliculas();
  } catch (error) {
    console.log(error);
  }

  let peliculasImportadas = peliculasJson.Search;
  const { data: peliculasAlmacenadas } = await clienteAxios.get("/peliculas");

  if (peliculasImportadas.length != peliculasAlmacenadas.length) {
    let idsPelisAlmacenadas = [];
    if (peliculasAlmacenadas.length > 0) {
      for (const peli of peliculasAlmacenadas) {
        idsPelisAlmacenadas.push(peli.imdbID);
      }
      peliculasImportadas = peliculasImportadas.filter(
        (peli) => !idsPelisAlmacenadas.includes(peli.imdbID)
      );
    }
    // TODO: mostrar una alerta, en caso de que no se hayan podido cargar correctamente las películas a importar
    for (const pelicula of peliculasImportadas) {
      await clienteAxios.post("/peliculas", pelicula);
    }
  }
};
