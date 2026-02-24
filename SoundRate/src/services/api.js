const URL_BASE = 'http://localhost:3000';

// Función para obtener todos los géneros musicales de la API
export async function obtenerGeneros() {
    const respuesta = await fetch(URL_BASE + '/genres');
    const generos = await respuesta.json();
    return generos;
}

// Función para crear un nuevo álbum en la API
export async function crearAlbum(album) {
    const respuesta = await fetch(URL_BASE + '/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    });
    const albumCreado = await respuesta.json();
    return albumCreado;
}

// Función para obtener álbumes, opcionalmente filtrados por género
export async function obtenerAlbumes(genero) {
    // Construimos la URL dependiendo de si hay un género seleccionado o no
    let url;
    if (genero && genero !== '') {
        url = URL_BASE + '/albums?genre=' + genero;
    } else {
        url = URL_BASE + '/albums';
    }

    const respuesta = await fetch(url);
    const albumes = await respuesta.json();
    return albumes;
}

// Función para obtener los álbumes destacados (limitados a un número)
export async function obtenerAlbumesDestacados(limite) {
    if (!limite) {
        limite = 4;
    }
    const url = URL_BASE + '/albums?_limit=' + limite;
    const respuesta = await fetch(url);
    const albumes = await respuesta.json();
    return albumes;
}

// Función para obtener las reseñas de un usuario específico
export async function obtenerResenasUsuario(idUsuario) {
    const url = URL_BASE + '/reviews?userId=' + idUsuario;
    const respuesta = await fetch(url);
    const resenas = await respuesta.json();
    return resenas;
}