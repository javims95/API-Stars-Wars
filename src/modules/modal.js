import { obtenerDatosDeAPI } from "./api.js"
import { capitalize } from "../utils/functions.js"
import { getDataPage } from "./writePage.js"

const modal = document.getElementById('modal')
const modalContent = document.getElementById('modalContent')

const showDataModal = (contenido) => {
    modal.style.display = 'flex'
    modalContent.innerHTML = contenido;

    // revisar
    document.querySelectorAll("[data-action='changePage']").forEach((button) => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            const name = url.split('/')[0]
            getDataPage(name).then(
                getDataModal(url)
            )
        })
    })
}

export const hideModal = () => {
    modal.style.display = 'none'
}

export const getDataModal = async (endpoint) => {
    try {
        const page = await obtenerDatosDeAPI(endpoint);
        let content = `<h1 class="modal-title">${page.name || page.title}</h1><ul>`;
        for (const [key, value] of Object.entries(page)) {
            if (key === 'name' || key === 'title' || key === 'homeworld' ||
                key === 'created' || key === 'edited' || key === 'url') {
                continue
            }
            if (Array.isArray(value)) {
                content += `<li><strong>${capitalize(key)}:</strong> <div class="group-btn">`;
                const dataPromises = value.map((item) => {
                    const url = item.split('/');
                    return obtenerDatosDeAPI(`${url[4]}/${url[5]}`);
                });
                const allData = await Promise.all(dataPromises);
                for (let data of allData) {
                    const url = data.url.split('/');
                    content += `<button class="btn btn-primary" data-action="changePage" data-url="${url[4]}/${url[5]}">
                                    ${data.name || data.title}
                                </button>`;
                }
                content += `</div></li>`;
            } else {
                content += `<li><strong>${capitalize(key)}:</strong> ${value}</li>`;
            }
        }
        content += '</ul>'
        showDataModal(content);
    } catch (error) {
        console.error(error);
    }
};

