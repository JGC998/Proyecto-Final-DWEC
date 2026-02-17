import { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el Contexto
const FavoritesContext = createContext();

// 2. Crear el Proveedor (El componente que envolverá tu App)
export const FavoritesProvider = ({ children }) => {
    // Intentamos leer de localStorage para no perderlos al recargar
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('myFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Cada vez que cambien los favoritos, los guardamos en el navegador
    useEffect(() => {
        localStorage.setItem('myFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Funciones para añadir y quitar
    const addFavorite = (album) => {
        // Evitamos duplicados
        if (!favorites.some(fav => fav.id === album.id)) {
            setFavorites([...favorites, album]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// 3. Hook personalizado para usarlo fácil en cualquier componente
export const useFavorites = () => useContext(FavoritesContext);