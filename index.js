import express from "express";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

import conectarDB from "./config/gestionBBDD.js";

import router from "./routes/index.js";
import peliculaRoutes from "./routes/peliculaRoutes.js";

import dotenv from "dotenv";
import { inicializarDB } from "./controllers/controladorAPI.js";

const app = express();
app.use(express.json());

dotenv.config({ path: ".env" });

conectarDB();

const host = process.env.HOST || "0.0.0.0";

const port = process.env.PORT || 4000;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

app.set("view engine", "pug");

app.use((req, res, next) => {
  res.locals.nombreSitio = "OMDb Valoración Películas";
  res.locals.nombreSitioShort = "OMDbValoracionPeliculas";
  return next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", router);
app.use("/api/peliculas", peliculaRoutes);

app.listen(port, host, () => {
  console.log(`El servidor se está ejecutando en ${host}:${port}`);
});

inicializarDB();
