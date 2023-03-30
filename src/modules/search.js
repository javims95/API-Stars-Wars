import { obtenerDatosDeAPI } from "./api.js";

const input = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchResultsList = document.getElementById('search-results-list');

export const updateSearch = (name) => {
    input.placeholder = `Search ${name}`
    input.dataset.name = name;
}

export const doSearch = (query) => {
    if (query.length >= 3) {
        const name = input.getAttribute('data-name');
        obtenerDatosDeAPI(`${name}/?search=${query}`).then((response) => {
            const data = response.results
            if(data.length) {
                searchResults.style.display = 'block'
                changeStyleSearch()
            }
            for (let i = 0; i < data.length; i++) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = data[i].name;
                a.href = data[i].url;
                li.appendChild(a);
                searchResultsList.appendChild(li);
            }
        })
    }
}

const changeStyleSearch = () => {
    const button = document.getElementById('btnSearch');
    button.classList.add('btn-danger')
    button.classList.remove('btn-primary')
    button.textContent = 'X'

    button.addEventListener('click', (e) => {
        e.preventDefault()
        searchResults.style.display = 'none';
        button.textContent = 'Search'
        button.classList.add('btn-primary')
        button.classList.remove('btn-danger')
    })
}