import express from "express";
import {
  agregarPelicula,
  actualizarPelicula,
  obtenerPeliculas,
} from "../controllers/controladorPelicula.js";

const router = express.Router();

router.route("/").post(agregarPelicula).get(obtenerPeliculas);

router.route("/:id").put(actualizarPelicula);

export default router;
