// js/vistos.js · Persistencia en LocalStorage. Aquí NO aparece document.
const CLAVE = 'parcial2-vistos';

// R6 · Devuelve el array de ids guardado en LocalStorage.
// Si no hay nada guardado, o lo guardado no es JSON válido, devuelve [] (sin romper la app).
export const leerVistos = () => {
  try {
        const datos = localStorage.getItem(CLAVE_VISTOS);
        return datos ? JSON.parse(datos) : [];
    } catch (error) {
        return [];
    }
};

// R6 · Guarda el array de ids en LocalStorage como texto JSON.
export const guardarVistos = (ids) => {
  localStorage.setItem(CLAVE_VISTOS, JSON.stringify(ids));
};
