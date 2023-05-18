import { URL_API } from './constants.js';

export const randomNumber = (start, end) => {
    return Math.floor(Math.random() * end) + start
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getTitle = (str) => {
    const [, resource, page] = str.match(/\/(\w+)\/?\?page=(\d+)/) || [];
    if (page === '1') {
        return capitalize(resource);
    } else if (resource && page) {
        return `${capitalize(resource)} (page ${page})`;
    } else {
        return capitalize(str);
    }
};

export const getEndPointFromUrl = (url) => {
    const endPoint = url.replace(URL_API, '')
    return endPoint
}