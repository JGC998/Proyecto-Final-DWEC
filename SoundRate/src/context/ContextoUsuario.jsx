import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const ContextoUsuario = createContext();

export const ProveedorUsuario = ({ children }) => {
    const [usuarioActual, setUsuarioActual] = useState(null);

    const iniciarSesion = async (nombreUsuario, contrasena) => {
        const res = await fetch(`http://localhost:3000/users?name=${nombreUsuario}&password=${contrasena}`);
        const usuarios = await res.json();
        if (usuarios.length > 0) {
            setUsuarioActual(usuarios[0]);
            toast.success(`¡Bienvenido de nuevo, ${usuarios[0].name}! 👋`);
        } else {
            toast.error('Credenciales incorrectas. Revisa tu usuario y contraseña.');
        }
    };

    const registrar = async (nombreUsuario, contrasena) => {
        const verificacion = await fetch(`http://localhost:3000/users?name=${nombreUsuario}`);
        const existe = await verificacion.json();
        if (existe.length > 0) {
            toast.warning('Ese nombre de usuario ya está en uso.');
            return;
        }

        const nuevoUsuario = { name: nombreUsuario, password: contrasena, avatar: '👤' };
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoUsuario)
        });
        const usuarioCreado = await res.json();
        setUsuarioActual(usuarioCreado);
        toast.success(`¡Cuenta creada! Bienvenido, ${usuarioCreado.name} 🎉`);
    };

    const cerrarSesion = () => {
        setUsuarioActual(null);
        toast.info('Sesión cerrada. ¡Hasta pronto!');
    };

    return (
        <ContextoUsuario.Provider value={{ usuarioActual, iniciarSesion, registrar, cerrarSesion }}>
            {children}
        </ContextoUsuario.Provider>
    );
};

export const useUsuario = () => useContext(ContextoUsuario);
