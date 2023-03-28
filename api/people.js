var miVariable = "Hola mundo";
var obtenerDatosDeAPI = window.obtenerDatosDeAPI

async function _getAllPeople() {
    try {
        const { results: people } = await obtenerDatosDeAPI('people')
        console.log(people)
        let content = '<h1 class="main-title">Personajes</h1><div class="card-container">'
        for (let person of people) {
            content += `        
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${person.name}</h5>            
                    <ul>
                        <li><strong>Altura:</strong> ${person.height}cm</li>
                        <li><strong>Color de los ojos:</strong> ${person.eye_color}</li>
                        <li><strong>Color del pelo:</strong> ${person.hair_color}</li>
                        <li><strong>Color de la piel:</strong> ${person.skin_color}</li>
                    </ul>
                    <button onclick="getPersonById('${person.url}')" class="btn btn-primary btn-auto">Más detalles</button>
                </div>
            </div>`
        }
        content += '</div>'
        showResults(content)
    } catch (error) {
        console.error(error)
    }
}

async function _getPersonById(url) {
    try {
        const endpoint = url.split(URL_API)[1]
        const person = await obtenerDatosDeAPI(endpoint)
        const idWorld = person.homeworld.split('/')[5];
        console.log(person)
        let content = `
        <div class="person-details">            
            <div class="card card-details">
                <h1 class="title-details">${person.name}</h1>
                <ul>
                    <li><strong>Fecha de nacimiento:</strong> ${person.birth_year}</li>
                    <li><strong>Genero:</strong> ${person.gender}</li>
                    <li><strong>Altura:</strong> ${person.height}</li>
                    <li><strong>Masa:</strong> ${person.mass}</li>
                    <li><strong>Masa:</strong> ${person.mass}</li>
                    <li><strong>Color de los ojos:</strong> ${person.eye_color}</li>
                    <li><strong>Color del pelo:</strong> ${person.hair_color}</li>
                    <li><strong>Color de la piel:</strong> ${person.skin_color}</li>
                </ul>                
                ${person.films.length &&
                    `<hr/>
                    <div class="movies">
                        <h3>Películas:</h3>
                        <div class="group-btn">
                            ${(await Promise.all(person.films.map(async (film) => {
                                const filmID = film.split('/')[5];
                                const filmData = await obtenerDatosDeAPI(`films/${filmID}`);
                                return `<button onclick="getFilmById(${filmID})" class="btn btn-primary btn-auto">${filmData.title}</button>`;
                            }))).join('')}                        
                        </div>
                    </div>`
                }
                <hr/>
                <div class="home-word">
                    <h3>Mundo natal:</h3>
                    <button onclick="getPlanetById(${idWorld})" class="btn btn-primary">Planeta ${idWorld}</button>
                </div>
                ${person.starships &&
                    `<hr/>
                    <div class="starships">
                        <h3>Naves:</h3>
                        <div class="group-btn">                            
                            ${(await Promise.all(person.starships.map(async (starship) => {
                                const starshipID = starship.split('/')[5];
                                const starshipData = await obtenerDatosDeAPI(`starships/${starshipID}`);
                                return `<button onclick="getFilmById(${starshipID})" class="btn btn-primary btn-auto">${starshipData.name}</button>`;
                            }))).join('')}
                        </div>
                    </div>`
                }
                ${person.vehicles &&
                    `<hr/>
                    <div class="vehicles">
                        <h3>Vehículos:</h3>
                        <div class="group-btn">                            
                            ${(await Promise.all(person.vehicles.map(async (vehicle) => {
                                const vehicleID = vehicle.split('/')[5];
                                const vehicleData = await obtenerDatosDeAPI(`vehicles/${vehicleID}`);
                                return `<button onclick="getFilmById(${vehicleID})" class="btn btn-primary btn-auto">${vehicleData.name}</button>`;
                            }))).join('')}
                        </div>
                    </div>`
                }
            </div>
        </div>`
        showResultsModal(content)
    } catch (error) {
        console.error(error)
    }
}