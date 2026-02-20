import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { login, register, currentUser } = useUser();
    const navigate = useNavigate();

    // Si ya está logueado, lo mandamos a la Home
    if (currentUser) {
        navigate('/');
        return null;
    }

    const handleLogin = (e) => { e.preventDefault(); login(name, password); };
    const handleRegister = (e) => { e.preventDefault(); register(name, password); };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', color: 'var(--text-main)' }}>
            <h2>Acceso</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Usuario" onChange={e => setName(e.target.value)} required />
                <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                    <button onClick={handleRegister}>Crear Cuenta</button>
                </div>
            </form>
        </div>
    );
}