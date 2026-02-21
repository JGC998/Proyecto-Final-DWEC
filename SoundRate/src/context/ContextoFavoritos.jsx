import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useUsuario } from './ContextoUsuario';

const ContextoFavoritos = createContext();

export const ProveedorFavoritos = ({ children }) => {
    const { usuarioActual } = useUsuario();
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        if (usuarioActual) {
            const favoritosGuardados = localStorage.getItem(`favs_${usuarioActual.id}`);
            setFavoritos(favoritosGuardados ? JSON.parse(favoritosGuardados) : []);
        } else {
            setFavoritos([]);
        }
    }, [usuarioActual]);

    const guardarFavoritos = (nuevosFavoritos) => {
        setFavoritos(nuevosFavoritos);
        if (usuarioActual) {
            localStorage.setItem(`favs_${usuarioActual.id}`, JSON.stringify(nuevosFavoritos));
        }
    };

    const agregarFavorito = (album) => {
        if (!usuarioActual) {
            toast.warning('Debes iniciar sesión para guardar favoritos.');
            return;
        }
        guardarFavoritos([...favoritos, album]);
        toast.success(`"${album.title}" añadido a favoritos ❤️`);
    };

    const quitarFavorito = (id) => {
        const album = favoritos.find(a => a.id === id);
        guardarFavoritos(favoritos.filter(a => a.id !== id));
        if (album) toast.info(`"${album.title}" quitado de favoritos.`);
    };

    const esFavorito = (id) => {
        return favoritos.some(a => a.id === id);
    };

    return (
        <ContextoFavoritos.Provider value={{ favoritos, agregarFavorito, quitarFavorito, esFavorito }}>
            {children}
        </ContextoFavoritos.Provider>
    );
};

export const useFavoritos = () => useContext(ContextoFavoritos);