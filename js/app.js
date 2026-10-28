// js/app.js · La interfaz: estado, DOM y eventos.
import { obtenerEpisodios } from './api.js';
import { filtrarEpisodios, contarPersonajes, alternarId } from './logica.js';
import { leerVistos, guardarVistos } from './vistos.js';

// ============ ESTADO ============
let episodios = [];                          // lo que llegó de la API
let vistos = leerVistos();                   // ids de los episodios marcados como vistos
const filtros = { texto: '', temporada: '' };

// ============ DOM ============
const lista = document.querySelector('#lista');
const contador = document.querySelector('#contador');
const formFiltros = document.querySelector('#form-filtros');
const inputBusqueda = document.querySelector('#busqueda');
const selectTemporada = document.querySelector('#filtro-temporada');

// R3 · Recibe UN episodio y devuelve el HTML de su tarjeta (modelos 1 y 2 de index.html).
const tarjetaHTML = (episodio) => {
  const esVisto = vistos.includes(episodio.id);
    
    const clasesArticle = esVisto 
        ? "bg-white rounded-lg shadow-md p-5 border border-gray-200 ring-2 ring-emerald-500 flex flex-col justify-between"
        : "bg-white rounded-lg shadow-md p-5 border border-gray-200 flex flex-col justify-between";
        
    const clasesBoton = esVisto
        ? "mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        : "mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors";
        
    const textoBoton = esVisto ? "✓ Visto" : "Marcar como visto";

    return `
        <article class="${clasesArticle}">
            <div>
                <span class="text-xs font-semibold text-indigo-600 tracking-wider uppercase">${episodio.episode}</span>
                <h3 class="text-lg font-bold text-gray-900 mt-1">${episodio.name}</h3>
                <p class="text-sm text-gray-500 mt-1">Emitido: ${episodio.air_date}</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
                <span class="text-xs text-gray-600">${episodio.characters.length} personajes</span>
            </div>
            <button class="${clasesBoton}" data-id="${episodio.id}">
                ${textoBoton}
            </button>
        </article>
    `;
};


// R2 · Estado de carga y estado de error (modelos 3 y 4 de index.html).
// const mostrarCargando y la const mostrar error del R2
const mostrarCargando = () => {
  const lista = document.querySelector('#lista');
    lista.innerHTML = `
        <div class="col-span-full text-center py-12 text-gray-500">
            <p class="text-lg">Cargando episodios...</p>
        </div>
    `;
};

const mostrarError = (mensaje) => {
  const lista = document.querySelector('#lista');
    lista.innerHTML = `
        <div class="col-span-full text-center py-12 text-red-500">
            <p class="text-lg">No se pudieron cargar los episodios (${mensaje}).</p>
            <button id="btn-reintentar" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reintentar</button>
        </div>
    `;
};

// R3 + R4 + R5 · ESTADO → pantalla: filtra, pinta las tarjetas (o el estado vacío, modelo 5)
// y actualiza el contador con el formato «7 de 20 episodios · 187 personajes».
// filtro y contador de la pagina este paso es R3 dentro de app donde se hizo R2 tambien y el resto de Rs
const render = () => {
  const filtrados = filtrarEpisodios(episodios, filtros);
    const lista = document.querySelector('#lista');
    
    if (filtrados.length === 0) {
        lista.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <p class="text-lg">Ningún episodio coincide con la búsqueda.</p>
            </div>
        `;
    } else {
        lista.innerHTML = filtrados.map(tarjetaHTML).join('');
    }
    
    actualizarContador(filtrados.length, episodios.length);

};

// R2 · Pide los episodios: muestra cargando; si todo sale bien guarda y pinta;
// si falla, muestra el error con su botón Reintentar.
const cargar = async () => {
  mostrarCargando();
    try {
        episodios = await obtenerEpisodios();
        render();
    } catch (error) {
        mostrarError(error.message);
    }
};

// R4 · Eventos del buscador (input), del select (change) y del formulario (Enter NO recarga).
// TODO

const buscador = document.querySelector('#buscador');
const formBuscador = document.querySelector('form'); // o el formulario contenedor

if (formBuscador) {
    formBuscador.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

buscador.addEventListener('input', (e) => {
    filtros.texto = e.target.value;
    render();
});

selectTemporada.addEventListener('change', (e) => {
    filtros.temporada = e.target.value;
    render();
});

// R6 · UN solo listener en #lista (delegación) que atienda el botón de cada tarjeta
// y también el botón Reintentar.
// TODO

cargar();
