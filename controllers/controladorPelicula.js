import Pelicula from "../models/Pelicula.js";

const agregarPelicula = async (req, res) => {
  let { imdbID: imdbID, Title: titulo, Year: año } = req.body;

  const pelicula = new Pelicula({ imdbID, titulo, año });
  try {
    const peliculaAlmacenada = await pelicula.save();
    res.json(peliculaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const actualizarPelicula = async (req, res) => {
  const { id, valoracion } = req.body;
  const pelicula = await Pelicula.findById(id);

  if (!pelicula) {
    res.status(404).json({ msg: "Película no encontrada" });
  }

  pelicula.valoracion = valoracion;

  try {
    await pelicula.save();
    res.json({
      msg: `Valoración para película con ID: ${pelicula.imdbID} almacenada correctamente`,
      imdbID: pelicula.imdbID,
    });
  } catch (error) {
    res.json({
      msg: error,
      imdbID: pelicula.imdbID,
      tipo: "error",
    });
    console.log(error);
  }
};

const obtenerPeliculas = async (req, res) => {
  const peliculas = await Pelicula.find();

  if (!peliculas) {
    return res.status(404).json({ msg: "No hay peliculas almacenadas" });
  }

  res.json(peliculas);
};

export { agregarPelicula, actualizarPelicula, obtenerPeliculas };
