import { useState } from 'react';

export default function FormularioAcceso({ alIniciarSesion, alRegistrar }) {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');

    // Función que se ejecuta al pulsar "Iniciar Sesión"
    function manejarInicioSesion(evento) {
        evento.preventDefault();
        alIniciarSesion(nombre, contrasena);
    }

    // Función que se ejecuta al pulsar "Crear Cuenta"
    function manejarRegistro(evento) {
        evento.preventDefault();
        alRegistrar(nombre, contrasena);
    }

    // Función que se ejecuta cuando el usuario escribe en el campo de nombre
    function manejarCambioNombre(evento) {
        setNombre(evento.target.value);
    }

    // Función que se ejecuta cuando el usuario escribe en el campo de contraseña
    function manejarCambioContrasena(evento) {
        setContrasena(evento.target.value);
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', color: 'var(--text-main)' }}>
            <h2>Acceso</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input
                    type="text"
                    placeholder="Usuario"
                    onChange={manejarCambioNombre}
                    required
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={manejarCambioContrasena}
                    required
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
                />

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        onClick={manejarInicioSesion}
                        style={{ padding: '10px', cursor: 'pointer', background: 'var(--accent)', color: 'var(--bg-body)', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={manejarRegistro}
                        style={{ padding: '10px', cursor: 'pointer', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    >
                        Crear Cuenta
                    </button>
                </div>
            </form>
        </div>
    );
}