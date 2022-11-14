import express from "express";
import router from "./routes/index.js";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
// import db from './config/db.js';

import dotenv from "dotenv";

const app = express();

// db.authenticate()
//   .then(() => console.log('Base de Datos conectada'))
//   .catch(error => console.error(error));

dotenv.config({ path: ".env" });

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

app.listen(port, host, () => {
  console.log(`El servidor se está ejecutando en ${host}:${port}`);
});
