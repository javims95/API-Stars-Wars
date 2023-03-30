import { getDataPage } from './modules/writePage.js';
import { createNav } from './modules/createNav.js';

(function () {
    window.onload = createNav;

    // Loader
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';

    getDataPage('films')
})()