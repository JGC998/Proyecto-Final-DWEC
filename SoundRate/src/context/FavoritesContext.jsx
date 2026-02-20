import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext'; // Importamos el usuario actual

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const { currentUser } = useUser();
    const [favorites, setFavorites] = useState([]);

    // Cuando inicias sesión o cambias de cuenta, cargamos SUS favoritos específicos
    useEffect(() => {
        if (currentUser) {
            const savedFavs = localStorage.getItem(`favs_${currentUser.id}`);
            setFavorites(savedFavs ? JSON.parse(savedFavs) : []);
        } else {
            setFavorites([]); // Si cierras sesión, limpiamos la lista visual
        }
    }, [currentUser]);

    // Función auxiliar para guardar en el estado y en el localStorage a la vez
    const saveFavorites = (newFavorites) => {
        setFavorites(newFavorites);
        if (currentUser) {
            localStorage.setItem(`favs_${currentUser.id}`, JSON.stringify(newFavorites));
        }
    };

    const addFavorite = (album) => {
        if (!currentUser) return alert("Debes iniciar sesión para guardar favoritos");
        saveFavorites([...favorites, album]);
    };

    const removeFavorite = (id) => {
        saveFavorites(favorites.filter(a => a.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some(a => a.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);