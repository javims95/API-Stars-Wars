import { getDataFromAPI } from "./api.js"
import { capitalize, getEndPointFromUrl, getTitle } from "../utils/functions.js"
import { getDataModal, hideModal } from "./modal.js"
import { doSearch, updateSearch } from "./search.js"
import { loader } from "./loader.js"

const showDataPage = (contenido) => {
    const resultados = document.getElementById('results');
    const buttonSearch = document.getElementById('btnSearch');
    loader(false);
    resultados.innerHTML = contenido

    document.querySelectorAll("[data-action='openModal']").forEach((button) => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            getDataModal(url);
        })
    })
    document.getElementById('closeModal').addEventListener('click', () => {
        hideModal()
    })
    document.querySelectorAll("[data-action='changePage']").forEach((button) => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            getDataModal(url)
        })
    })
    document.querySelectorAll("[data-action='paginator']").forEach((button) => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            getDataPage(url)
        })
    })
    buttonSearch.addEventListener('click', (e) => {
        e.preventDefault();
    })
    const inputSearch = document.getElementById('searchInput');
    inputSearch.addEventListener('input', () => {
        doSearch(inputSearch.value).then(() => {
            document.querySelectorAll("[data-action='openModalSearch']").forEach((button) => {
                console.log(button);
                button.addEventListener('click', () => {
                    const url = button.getAttribute('data-url');
                    getDataModal(url);
                });
            });
        });
    });    
}

export const getDataPage = async (pageName) => {
    try {
        loader(true);
        const { results: page, previous, next } = await getDataFromAPI(pageName);
        let content = `<h1 class="main-title">${getTitle(pageName)}</h1>
        ${getPagination(previous, next)}
        <div class="card-container">`;
        for (let property of page) {
            content += `        
              <div class="card" style="width: 45%;">
                  <div class="card-body">
                      <h5 class="card-title">${property.name || property.title}</h5>            
                      <ul class="list-none">`;
            for (let key in property) {
                if (key === "homeworld" || key === "created" || key === "edited" || key === "url") {
                    continue;
                }
                if (Array.isArray(property[key])) {
                    if (property[key].length === 0) {
                        delete property[key];
                        continue;
                    }
                    content += `<hr/><li><strong>${capitalize(key)}:</strong> <div class="group-btn">`;
                    const dataPromises = property[key]
                        .slice(0, 2)
                        .map((item) => {
                            const url = item.split("/");
                            return getDataFromAPI(`${url[4]}/${url[5]}`);
                        });
                    const allData = await Promise.all(dataPromises);
                    for (let data of allData) {
                        const url = data.url.split("/");
                        content += `<button class="btn btn-primary" data-action="changePage" data-url="${url[4]}/${url[5]}">
                              ${data.name || data.title}
                          </button>`;
                    }
                    content += `</div></li>`;
                } else {
                    content += `<li><strong>${capitalize(key)}:</strong> ${property[key]}</li>`;
                }
            }
            const dataUrl = property.url.split("/");
            content += `</ul><hr/>
                      <button class="btn btn-primary btn-block openModal" data-action="openModal" data-url="${dataUrl[4]}/${dataUrl[5]}">
                          Más detalles
                      </button>
                  </div>
              </div>`;
        }
        content += "</div>";
        content += getPagination(previous, next);

        updateSearch(pageName);
        showDataPage(content);
    } catch (error) {
        console.error(error);
    }
};


const getPagination = (previous, next) => {
    if(previous !== null || next !== null) {
        let content = '<div class="b-pagination-outer"><ul id="border-pagination">'
        previous
            ? content += `<li><a class="page-link" data-action="paginator" data-url="${getEndPointFromUrl(previous)}">« Previous</a></li>`
            : content += `<li><a class="page-link disabled">« Previous</a></li>`
    
        next
            ? content += `<li><a class="page-link" data-action="paginator" data-url="${getEndPointFromUrl(next)}">Next »</a></li>`
            : content += `<li><a class="page-link disabled">Next »</a></li>`
        content += '</ul></div>'
        return content
    } else {
        return '';
    }
}
