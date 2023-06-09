import { URL_API } from '../utils/constants.js';
import { randomNumber } from '../utils/functions.js'

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
export async function getDataFromAPI(endpoint, error = false, lateRequest = false, probabilityFail = false) {
    const cacheKey = 'cachedData';
    const cachedData = localStorage.getItem(cacheKey);

    let allData = {};

    if (cachedData) {
        allData = JSON.parse(cachedData);
    }

    if (endpoint in allData) {
        return allData[endpoint];
    }

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

        allData[endpoint] = data;
        localStorage.setItem(cacheKey, JSON.stringify(allData));
        return data
    }
}
