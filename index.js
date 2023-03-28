const URL_API = 'https://swapi.dev/api/'

const getAllPeople = window._getAllPeople;
const getPersonById = window._getPersonById;

const modal = document.getElementById('modal');
const modalContent = document.getElementById('content');

// Loader
const loader = document.getElementById('loader');
loader.style.display = 'flex';

/**
 * Realiza una petición a una API y devuelve los datos obtenidos. Si el parámetro error se establece en true,
 * la función devuelve una promesa rechazada con un objeto Error. También es posible establecer un tiempo de espera
 * antes de que la petición falle, así como un porcentaje de probabilidad de que la petición falle.
 *
 * @param {string} endpoint - El punto final de la API al que se realizará la petición.
 * @param {boolean} [error=false] - Indica si la petición debe fallar. Por defecto, es false.
 * @param {boolean} [lateRequest=false] - Indica si la petición debe demorarse. Por defecto, es false.
 * @param {boolean} [probabilityFail=false] - Indica si la petición debe tener una probabilidad de fallo. Por defecto, es false.
 * @returns {Promise} Una promesa que devuelve los datos obtenidos de la API, o una promesa rechazada si la petición falla.
 */
async function obtenerDatosDeAPI(endpoint, error = false, lateRequest = false, probabilityFail = false) {
    if (error) {
        return Promise.reject(new Error('Petición fallida'))
    } else {
        const respuesta = await fetch(`${URL_API}/${endpoint}`)
        const data = await respuesta.json()
        if (probabilityFail && randomNumber(1, 10) === 1) {
            return Promise.reject(new Error('Petición fallida'))
        }
        if (lateRequest && randomNumber(1, 20) === 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        return data
    }
}

function showResults(contenido) {
    const resultados = document.getElementById('results')
    loader.style.display = 'none';
    resultados.innerHTML = contenido;
}

function showResultsModal(contenido) {
    modal.style.display = 'flex'
    modalContent.innerHTML = contenido;
}

function closeModal() {
    modal.style.display = 'none'
}

function randomNumber(start, end) {
    return Math.floor(Math.random() * end) + start
}

getAllPeople()
