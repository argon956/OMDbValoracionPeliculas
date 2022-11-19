import express from "express";
import {
  agregarPelicula,
  obtenerPeliculas,
} from "../controllers/controladorPelicula.js";

const router = express.Router();

router.route("/").post(agregarPelicula).get(obtenerPeliculas);

export default router;
