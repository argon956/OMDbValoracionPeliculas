import clienteAxios from "../config/axios.js";

const paginaInicio = async (req, res) => {
  try {
    const consulta = await clienteAxios.get("/peliculas");

    res.render("inicio", {
      pagina: "Inicio",
      clase: "inicio",
      peliculas: consulta.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export { paginaInicio };
