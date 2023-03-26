const URL_API = 'https://swapi.dev/api/'

async function obtenerDatosDeAPI(endpoint) {
    const respuesta = await fetch(`${URL_API}/${endpoint}`)
    const datos = await respuesta.json()
    return datos
}

function showResults(contenido) {
    const resultados = document.getElementById('results')
    resultados.innerHTML = contenido
}

async function getAllPeople() {
    try {
        const { results: people } = await obtenerDatosDeAPI('people')
        console.log(people)
        let contenido =
            '<h1 class="main-title">Personajes</h1><div class="card-container">'
        for (let person of people) {
            contenido += `        
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${person.name}</h5>            
                    <ul>
                        <li><strong>Altura:</strong> ${person.height}cm</li>
                        <li><strong>Color de los ojos:</strong> ${person.eye_color}</li>
                        <li><strong>Color del pelo:</strong> ${person.hair_color}</li>
                        <li><strong>Color de la piel:</strong> ${person.skin_color}</li>
                    </ul>
                    <button onclick="showDetails('${person.url}')" class="btn btn-primary">Más detalles</button>
                </div>
            </div>`
        }
        contenido += '</div>'
        showResults(contenido)
    } catch (error) {
        console.error(error)
        showResults('Error al obtener los usuarios')
    }
}

// Función que se ejecuta cuando se hace clic en el botón "Obtener productos"
async function getPersonById(endpoint) {
    try {
        const person = await obtenerDatosDeAPI(endpoint)
        console.log(person)
    } catch (error) {
        console.error(error)
    }
}

async function showDetails(url) {
    try {
        const endpoint = url.split(URL_API)[1]
        const person = await getPersonById(endpoint)
    } catch (error) {
        console.error(error)
    }
}

getAllPeople()
