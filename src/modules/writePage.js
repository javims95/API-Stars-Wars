import { obtenerDatosDeAPI } from "./api.js"
import { capitalize } from "../utils/functions.js"
import { getDataModal, hideModal } from "./modal.js"

const showDataPage = (contenido) => {
    const resultados = document.getElementById('results')
    loader.style.display = 'none'
    resultados.innerHTML = contenido

    document.querySelectorAll("[data-action='openModal']").forEach((button) => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            getDataModal(url);
        })
    })
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', () => {
        hideModal()
    })
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

export const getDataPage = async (pageName) => {
    try {
        const { results: page } = await obtenerDatosDeAPI(pageName)
        let content = `<h1 class="main-title">${capitalize(pageName)}</h1><div class="card-container">`
        for (let property of page) {
            content += `        
            <div class="card" style="width: 45%;">
                <div class="card-body">
                    <h5 class="card-title">${property.name || property.title}</h5>            
                    <ul class="list-none">`
            for (let key in property) {
                if (key === 'created' || key === 'edited' || key === 'url') {
                    continue
                }
                if (Array.isArray(property[key])) {
                    content += `<li><strong>${capitalize(key)}:</strong> <div class="group-btn">`;
                    const dataPromises = property[key].slice(0, 2).map((item) => {
                        const url = item.split("/");
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
                    content += `<li><strong>${capitalize(key)}:</strong> ${property[key]}</li>`
                }
            }
            const dataUrl = property.url.split('/');
            content += `</ul>
                    <button class="btn btn-primary btn-block openModal" data-action="openModal" data-url="${dataUrl[4]}/${dataUrl[5]}">
                        Más detalles
                    </button>
                </div>
            </div>`
        }
        content += '</div>'
        showDataPage(content)
    } catch (error) {
        console.error(error)
    }
}
