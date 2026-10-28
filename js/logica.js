// js/logica.js · Funciones PURAS: reciben datos y devuelven datos. Aquí NO aparece document.

// R4 · Devuelve los episodios cuyo name contiene `texto` (sin importar mayúsculas ni espacios
// al inicio o al final) y cuyo código episode (S01E01…) empieza por `temporada`.
// temporada === '' significa «todas las temporadas».
export const filtrarEpisodios = (lista, { texto, temporada }) => {
  const textoBusqueda = texto.toLowerCase().trim();
    
    return lista.filter(episodio => {
        const coincideTexto = episodio.name.toLowerCase().includes(textoBusqueda);
        const coincideTemporada = temporada === '' || episodio.episode.startsWith(temporada);
        return coincideTexto && coincideTemporada;
    });
};

// R5 · Suma la cantidad de personajes (characters.length) de todos los episodios de la lista.
// Usa reduce.
export const contarPersonajes = (lista) => {
  return lista.reduce((acumulado, episodio) => acumulado + episodio.characters.length, 0);
};

// R6 · Si id está en ids, devuelve un array NUEVO sin él; si no está, un array NUEVO con él.
// No modifiques el array que recibes.
export const alternarId = (ids, id) => {
  // TODO
};
