/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Valoracion Películas", () => {
  const filasEsperadas = 10;

  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });

  it("debería inicializar la BBDD con datos de OMDb, y cargarlas en la página", () => {
    cy.get("tbody").find("tr").should("have.length", filasEsperadas);
  });

  it("debería mostrar alerta de actualización exitosa al pulsar sobre las estrellas", function () {
    const valoracion = Math.floor(Math.random(4)) + 1;
    cy.get(`[data-cy="valorar-tt0373889-con-${valoracion}"]`).click();
    cy.get("#alert-tt0373889").should("be.visible");
  });

  it("deberia filtrar por valoración al escribir un dígito en barra de búsqueda", function () {
    const valoracion = Math.floor(Math.random(4)) + 1;
    cy.get("#busqueda").type(valoracion);
    cy.get("tbody")
      .find("tr")
      .filter(":visible")
      .its("length")
      .then((len) =>
        cy
          .get(`[data-cy^=valorar][data-cy$=${valoracion}]`)
          .filter(":visible")
          .its("length")
          .should("equal", len)
      );
  });

  it("deberia filtrar por año al escribir más de un dígito en barra de búsqueda", function () {
    const año = "201";
    cy.get("#busqueda").type(año);
    cy.get("tbody")
      .find("tr")
      .filter(":visible")
      .its("length")
      .then((len) =>
        cy
          .get("[data-cy^=año]")
          .filter(":visible")
          .should("contain", año)
          .its("length")
          .should("equal", len)
      );
  });
  it("deberia filtrar por id de peli al escribir una cadena comenzando por 'tt' en barra de búsqueda", function () {
    const idPeli = "tt1";
    cy.get("#busqueda").type(idPeli);
    cy.get("tbody")
      .find("tr")
      .filter(":visible")
      .its("length")
      .then((len) =>
        cy
          .get("[data-cy^=id]")
          .filter(":visible")
          .should("contain", idPeli)
          .its("length")
          .should("equal", len)
      );
  });

  it("deberia filtrar por titulo al escribir una cadena que lo contenga en barra de búsqueda", function () {
    const titulo = "Deathly";
    cy.get("#busqueda").type("tt1");
    cy.get("tbody")
      .find("tr")
      .filter(":visible")
      .its("length")
      .then((len) =>
        cy
          .get("[data-cy^=titulo]")
          .filter(":visible")
          .should("contain", titulo)
          .its("length")
          .should("equal", len)
      );
  });

  it("debería no mostrar ninguna película al escribir un valor a filtrar inexistente en barra de búsqueda", function () {
    const cadena = "cadenanovalida";
    cy.get("#busqueda").type(cadena);
    cy.get("tbody")
      .find("tr[hidden='']")
      .its("length")
      .should("equal", filasEsperadas);
  });
});
