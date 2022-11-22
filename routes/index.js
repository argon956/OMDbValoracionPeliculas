import express from "express";
import { paginaInicio } from "../controllers/controladorPagina.js";
import { actualizarPelicula } from "../controllers/controladorPelicula.js";

const router = express.Router();

router.get("/", paginaInicio);

router.post("/", actualizarPelicula);

export default router;
