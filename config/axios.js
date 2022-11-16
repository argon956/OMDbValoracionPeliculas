import axios from "axios";

// TODO: hallar la manera de importar las variables de entorno
const clienteAxios = axios.create({
  baseURL: `http://localhost:4000/api`,
});

export default clienteAxios;
