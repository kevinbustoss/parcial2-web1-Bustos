

// mensaje de error al obtener episodios en el paso del R1
const URL_EPISODIOS = 'https://rickandmortyapi.com/api/episode';

async function pedirJSON(url) {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }
    return await respuesta.json();
}

async function obtenerEpisodios() {
    const data = await pedirJSON(URL_EPISODIOS);
    return data.results;
}

