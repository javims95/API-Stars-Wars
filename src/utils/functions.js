import { URL_API } from './constants.js';

export const randomNumber = (start, end) => {
    return Math.floor(Math.random() * end) + start
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getEndPointFromUrl = (url) => {
    const endPoint = url.replace(URL_API, '')
    return endPoint
}