import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useUsuario } from './ContextoUsuario';

// 1. Creamos el contexto para los favoritos
const ContextoFavoritos = createContext();

// 2. Componente proveedor para los favoritos
export function ProveedorFavoritos({ children }) {

    // 3. Obtenemos el usuario actual del contexto de usuario
    const { usuarioActual } = useUsuario();

    // 4. Estado que guarda la lista de álbumes favoritos
    const [favoritos, setFavoritos] = useState([]);

    // 5. Efecto: cada vez que cambie el usuario, cargamos sus favoritos del localStorage
    useEffect(function () {
        if (usuarioActual) {
            // Construimos la clave del localStorage para este usuario
            const clave = 'favs_' + usuarioActual.id;
            const favoritosGuardados = localStorage.getItem(clave);

            // Si hay favoritos guardados, los convertimos de texto JSON a array
            if (favoritosGuardados) {
                const arrayFavoritos = JSON.parse(favoritosGuardados);
                setFavoritos(arrayFavoritos);
            } else {
                // Si no hay nada guardado, empezamos con una lista vacía
                setFavoritos([]);
            }
        } else {
            // Si no hay usuario, vaciamos los favoritos
            setFavoritos([]);
        }
    }, [usuarioActual]);

    // 6. Función auxiliar para guardar favoritos en el estado y en localStorage
    function guardarFavoritos(nuevosFavoritos) {
        setFavoritos(nuevosFavoritos);
        if (usuarioActual) {
            const clave = 'favs_' + usuarioActual.id;
            const textoJSON = JSON.stringify(nuevosFavoritos);
            localStorage.setItem(clave, textoJSON);
        }
    }

    // 7. Función para añadir un álbum a favoritos
    function agregarFavorito(album) {
        if (!usuarioActual) {
            toast.warning('Debes iniciar sesión para guardar favoritos.');
            return;
        }
        // Creamos un nuevo array con los favoritos actuales + el nuevo álbum
        const nuevaLista = [...favoritos, album];
        guardarFavoritos(nuevaLista);
        toast.success('"' + album.title + '" añadido a favoritos ❤️');
    }

    // 8. Función para quitar un álbum de favoritos por su id
    function quitarFavorito(id) {
        // Buscamos el álbum que vamos a quitar para mostrar su título en el toast
        let albumEncontrado = null;
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id === id) {
                albumEncontrado = favoritos[i];
                break;
            }
        }

        // Creamos un nuevo array sin el álbum que queremos quitar
        const nuevaLista = [];
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id !== id) {
                nuevaLista.push(favoritos[i]);
            }
        }
        guardarFavoritos(nuevaLista);

        if (albumEncontrado) {
            toast.info('"' + albumEncontrado.title + '" quitado de favoritos.');
        }
    }

    // 9. Función que comprueba si un álbum está en favoritos
    function esFavorito(id) {
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id === id) {
                return true;
            }
        }
        return false;
    }

    // 10. Retornamos el Provider con los datos y funciones
    return (
        <ContextoFavoritos.Provider value={{ favoritos, agregarFavorito, quitarFavorito, esFavorito }}>
            {children}
        </ContextoFavoritos.Provider>
    );
}

// 11. Hook personalizado para acceder a los favoritos
export function useFavoritos() {
    return useContext(ContextoFavoritos);
}