import { getDataFromAPI } from "./api.js";
import { capitalize } from "../utils/functions.js";
import { getDataPage } from "./writePage.js";

export const createNav = async () => {
    const navbar = document.querySelector('.navbar');
    const datosAPI = await getDataFromAPI('');

    const ul = document.createElement('ul');
    navbar.appendChild(ul);

    for (let key in datosAPI) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('menu-item');
        a.textContent = capitalize(key);
        a.id = key;
        a.addEventListener('click', function () {
            getDataPage(key)                
        });
        li.appendChild(a);
        ul.appendChild(li);
    }
}