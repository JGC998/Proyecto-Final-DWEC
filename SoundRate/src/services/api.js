const BASE_URL = 'http://localhost:3000';

export const getGenres = async () => {
    const res = await fetch(`${BASE_URL}/genres`);
    return res.json();
};

export const createAlbum = async (album) => {
    const res = await fetch(`${BASE_URL}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    });
    return res.json();
};

// Añade esto a tu src/services/api.js
export const getAlbums = async (genre = '') => {
    const url = genre
        ? `${BASE_URL}/albums?genre=${genre}`
        : `${BASE_URL}/albums`;
    const res = await fetch(url);
    return res.json();
};

export const getFeaturedAlbums = async (limit = 4) => {
    const res = await fetch(`${BASE_URL}/albums?_limit=${limit}`);
    return res.json();
};

export const getUserReviews = async (userId) => {
    const res = await fetch(`${BASE_URL}/reviews?userId=${userId}`);
    return res.json();
};