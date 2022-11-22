# OMDbValoracionPeliculas

Aplicación de página única (Single-Page Application) desarrollada con Node.js, Express y MongoDB, que permite la obtención y persistencia de un listado de películas del servicio OMDb -establecido por defecto las de la saga de _Harry Potter_- para realizar la valoración de las mismas.

## Índice

- [Guía de instalación](#guía-de-instalacion)
- [Scripts disponibles](#scripts-disponibles)
- [Tecnologías](#tecnologías)
- [Descripción técnica](#descripción-técnica)
- [Descripción funcional: casos de uso](#descripción-funcional-casos-de-uso)
- [Documentación de tests](#documentación-de-tests)

## Guía de instalación

**NOTA:** esta guía asume que ambos **Node.js** como **MongoDB** estén instalados en el sistema usuario de esta aplicación, contando además con una instanacia local de base de datos de MongoDB ejecutando en _localhost:27017_.

Visita el sitio web de este repositorio: https://github.com/argon956/OMDbValoracionPeliculas

Abre una terminal y clona el proyecto al directorio deseado mediante el siguiente comando:

`> git clone https://github.com/argon956/ClickerRev`

Navega al directorio del clon de repositorio, y ejecuta:

`npm install`

## Scripts disponibles

En el directorio del proyecto, se pueden ejecutar los siguientes scripts:

### `npm start`

Ejecuta la aplicación en modo productivo.\
Navega a la dirección [http://localhost:4000](http://localhost:4000) en un navegador web para mostrarlo.

### `npm run dev`

Ejecuta la aplicación en modo de desarrollo.\
Navega a la dirección [http://localhost:4000](http://localhost:4000) en un navegador web para mostrarlo.

La página se recargará con los cambios realizados en cualquier fichero del proyecto.\
Los errores del linter del proyecto se mostrarán en la consola.

### `npx cypress open`

Abre el ejecutor de tests de Cypress en modo interfaz.\
Para más información, visita el sitio web de [Cypress.io](https://www.cypress.io/).

## Tecnologías

Se describen a continuación las tecnologías empleadas para el desarrollo de éste proyecto:

- `Node.js` v18.12.1
- `Express.js` 4.18.1
- `Axios` 1.1.3
- `Axios` 1.1.3
- `MongoDB`

  - `Mongoose` 6.7.2

- `Cypress.io` 11.1.0

- `Pug` 3.0.2

## Descripción técnica

El proyecto consta de la siguiente estructura, con detalle de los ficheros más relevantes:

```
cypress
├── e2e
controllers
config
models
public
├── css
├── helpers
├── js
routes
views
├── layout
├── mixins
index.js
.env

```

El flujo de ejecución consta de los siguientes pasos:

- La aplicación carga al inicio las películas desde OMDb, y las almacena en la BBDD con el campo adicional de valoración fijado a cero. Adicionalmente, permite la inclusión de nuevas películas con cada inicio en el caso de que no exisiteran en la BBDD.
- Se carga la interfaz a partir de la BBDD, con captura de eventos sobre las estrellas de valoración para actualizarlos con el valor correspondiente.
- La barra de búsqueda actúa directamente sobre los resultados cargados en la página, limitando así la carga sobre la BBDD
- Se muestran alertas visuales entre la barra de búsqueda y la tabla de peliculas almacenadas informando del estado de actualización de valoraciones, tanto exitosos como erróneos

## Descripción funcional: casos de uso

El usuario puede realizar las siguientes funciones en la página raíz:

- Usar la barra de búsqueda para filtrar por ID de IMDb, título, año o valoración, de forma excluyente
- Actualizar la valoración de las películas almacenadas, pinchando en las estrellas bajo el campo de valoración

## Descripción de tests

Se dispone del siguiente suite de tests localizados bajo el directorio _cypress/e2e_:

`valorar-peliculas.cy.js`

Que a su vez consta de los siguientes tests, todos ellos autodescriptivos:

- Debería inicializar la BBDD con datos de OMDb, y cargarlas en la página
- Debería mostrar alerta de actualización exitosa al pulsar sobre las estrellas
- Deberia filtrar por valoración al escribir un dígito en barra de búsqueda
- Deberia filtrar por año al escribir más de un dígito en barra de búsqueda
- Deberia filtrar por id de peli al escribir una cadena comenzando por 'tt' en barra de búsqueda
- Deberia filtrar por titulo al escribir una cadena que lo contenga en barra de búsqueda
- Debería no mostrar ninguna película al escribir un valor a filtrar inexistente en barra de búsqueda
