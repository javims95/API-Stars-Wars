# API de SWAPI en JavaScript

Esta es una aplicación web de una sola página (SPA) que consume la API pública de Star Wars (SWAPI) y muestra información sobre películas, personajes, planetas, especies, naves espaciales y vehículos. La aplicación se ha desarrollado utilizando solo JavaScript y el servidor `serve`.

## Configuración

Antes de comenzar a utilizar la aplicación, se deben seguir estos pasos:

1. Clonar este repositorio.
2. Ejecutar `npm install` para instalar el servidor.
3. En la terminal ejecutar `npm run serve` en la raíz del proyecto.
4. Abrir un navegador web y visitar `http://localhost:3000`.

# Puntos a destacar
- Incluye un sistema de cacheo de URLs, para que se almacenen los datos de las peticiones ya realizadas.
- Toda la APP es totalmente dinámica, de forma que si en algún momento se añaden nuevas categorías, personajes, items al menú... se verá reflejado en esta APP.
- Se pueden configurar fallos de respuesta, peticiones que tardan más de lo normal y probabilidad de fallo. Todo está documentado en la función `getDataFromAPI` ubicada en `src\modules\api.js`.

## Requisitos generales

- Crear una app web SPA con swapi.dev como capa de servicios.
- Utilizar npm y package.json
- Utilizar únicamente https://www.npmjs.com/package/serve como servidor frontal.
- Prescindir de builds, pre-builds, post-builds, o procesados/compilados en general.
- No utilizar starter kits ni frameworks frontales o librerías de renderizado.
- Utilizar https://prettier.io/ y cuidar calidad, estructura, y diseño de código.
- NO utilizar ningún otro paquete, plugin, widget, o código de tercero (incluyendo stack overflow).
- Enfatizar organización y arquitectura de la app: simplicidad, abstracciones, claridad, mantenimiento... (y evitar sobreingenierías ;)

## Requisitos específicos

- Añadir UIs, las que se quieran (páginas, modales, dropdowns, cosas más chulas, o una combinación de todas las anteriores), para listar y ver los detalles de: pelis, gente, planetas, especies, naves espaciales, y vehículos.
- Cada vista de detalle debe permitir ver también entidades relacionadas (las que la API ofrezca), e ir a su vista de detalle. Por ejemplo, Al ver un planeta, se podrá ver quién reside en él, o en qué pelis aparece, y se podrá explorar una de esas pelis o personas.
- Se debe poder ir a ver fácilmente el listado de entidades desde el detalle de entidad (si se está viendo el detalle de una peli, se debe poder ir a ver el listado de todas las pelis fácilmente).
- Implementar un buscador en las vistas de listados para poder filtrar las entradas (por nombre o como se quiera, eso a tu criterio).
- Implementar un resumen en las vistas de detalle que muestre el total de entradas listadas, teniendo en cuenta lo que filtra el buscador.
- Tratar el caso de que la búsqueda no ofrezca ningún resultado, pensando en lo que verá el usuario y en cómo se le informará de ello.
- La aplicación debe ser tolerante a fallos. ¿Qué ocurre si el servidor no responde, o tarda mucho en responder?

## Bonus Round

- Implementar alguna solución para simular peticiones a servicio, que permita
  hacer que tarde la respuesta, o que falle con algún error configurable.
- Aleatoriamente, 1 de cada 10 peticiones a servicio debe tardar 1 segundo más
  de lo normal, usando la pieza descrita en el punto anterior.
- Aleatoriamente, 1 de cada 20 peticiones a servicio debe fallar.