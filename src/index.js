import { getDataPage } from './modules/writePage.js';
import { createNav } from './modules/createNav.js';
import { loader } from './modules/loader.js';

(function () {
    window.onload = createNav;

    loader(true);

    getDataPage('people')
})()