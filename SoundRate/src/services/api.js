const URL_BASE = 'http://localhost:3000';

export const obtenerGeneros = async () => {
    const res = await fetch(`${URL_BASE}/genres`);
    return res.json();
};

export const crearAlbum = async (album) => {
    const res = await fetch(`${URL_BASE}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    });
    return res.json();
};

export const obtenerAlbumes = async (genero = '') => {
    const url = genero
        ? `${URL_BASE}/albums?genre=${genero}`
        : `${URL_BASE}/albums`;
    const res = await fetch(url);
    return res.json();
};

export const obtenerAlbumesDestacados = async (limite = 4) => {
    const res = await fetch(`${URL_BASE}/albums?_limit=${limite}`);
    return res.json();
};

export const obtenerResenasUsuario = async (idUsuario) => {
    const res = await fetch(`${URL_BASE}/reviews?userId=${idUsuario}`);
    return res.json();
};