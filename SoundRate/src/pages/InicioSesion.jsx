import { useEffect } from 'react';
import { useUsuario } from '../context/ContextoUsuario';
import { useNavigate } from 'react-router-dom';
import FormularioAcceso from '../components/FormularioAcceso';

export default function InicioSesion() {
    const { iniciarSesion, registrar, usuarioActual } = useUsuario();
    const navegar = useNavigate();

    // Redirigir si ya hay sesión iniciada
    useEffect(() => {
        if (usuarioActual) {
            navegar('/');
        }
    }, [usuarioActual, navegar]);

    return (
        <FormularioAcceso alIniciarSesion={iniciarSesion} alRegistrar={registrar} />
    );
}