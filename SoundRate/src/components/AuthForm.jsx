import { useState } from 'react';

export default function AuthForm({ onLogin, onRegister }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', color: 'var(--text-main)' }}>
            <h2>Acceso</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input
                    type="text"
                    placeholder="Usuario"
                    onChange={e => setName(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
                />

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        onClick={(e) => { e.preventDefault(); onLogin(name, password); }}
                        style={{ padding: '10px', cursor: 'pointer', background: 'var(--accent)', color: 'var(--bg-body)', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); onRegister(name, password); }}
                        style={{ padding: '10px', cursor: 'pointer', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    >
                        Crear Cuenta
                    </button>
                </div>
            </form>
        </div>
    );
}