const paginaInicio = async (req, res) => {
  try {
    res.render("inicio", {
      pagina: "Inicio",
      clase: "inicio",
    });
  } catch (error) {
    console.log(error);
  }
};

export { paginaInicio };
