import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

// 1. Creamos el contexto para el usuario
const ContextoUsuario = createContext();

// 2. Componente proveedor que envuelve la app
export function ProveedorUsuario({ children }) {

    // 3. Estado que guarda el usuario que ha iniciado sesión (null = nadie)
    const [usuarioActual, setUsuarioActual] = useState(null);

    // 4. Función para iniciar sesión
    async function iniciarSesion(nombreUsuario, contrasena) {
        // Hacemos una petición GET a la API para buscar al usuario
        const url = 'http://localhost:3000/users?name=' + nombreUsuario + '&password=' + contrasena;
        const respuesta = await fetch(url);
        const usuarios = await respuesta.json();

        // Si encontramos al menos un usuario con esos datos, iniciamos sesión
        if (usuarios.length > 0) {
            const usuarioEncontrado = usuarios[0];
            setUsuarioActual(usuarioEncontrado);
            toast.success('¡Bienvenido de nuevo, ' + usuarioEncontrado.name + '! 👋');
        } else {
            toast.error('Credenciales incorrectas. Revisa tu usuario y contraseña.');
        }
    }

    // 5. Función para registrar un nuevo usuario
    async function registrar(nombreUsuario, contrasena) {
        // Primero verificamos si ya existe un usuario con ese nombre
        const urlVerificacion = 'http://localhost:3000/users?name=' + nombreUsuario;
        const respuestaVerificacion = await fetch(urlVerificacion);
        const usuariosExistentes = await respuestaVerificacion.json();

        if (usuariosExistentes.length > 0) {
            toast.warning('Ese nombre de usuario ya está en uso.');
            return;
        }

        // Creamos el objeto del nuevo usuario
        const nuevoUsuario = {
            name: nombreUsuario,
            password: contrasena,
            avatar: '👤'
        };

        // Enviamos el nuevo usuario a la API con método POST
        const respuesta = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoUsuario)
        });

        const usuarioCreado = await respuesta.json();
        setUsuarioActual(usuarioCreado);
        toast.success('¡Cuenta creada! Bienvenido, ' + usuarioCreado.name + ' 🎉');
    }

    // 6. Función para cerrar sesión
    function cerrarSesion() {
        setUsuarioActual(null);
        toast.info('Sesión cerrada. ¡Hasta pronto!');
    }

    // 7. Retornamos el Provider con todas las funciones y datos
    return (
        <ContextoUsuario.Provider value={{ usuarioActual, iniciarSesion, registrar, cerrarSesion }}>
            {children}
        </ContextoUsuario.Provider>
    );
}

// 8. Hook personalizado para acceder al contexto del usuario
export function useUsuario() {
    return useContext(ContextoUsuario);
}
