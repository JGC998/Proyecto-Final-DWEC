import { Link } from 'react-router-dom';

export default function HeroSection({ currentUser }) {
    return (
        <section className="hero">
            <h1>Bienvenido a SoundRate</h1>
            <p>Descubre, puntúa y comparte tu música favorita.</p>

            {!currentUser && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                    <p style={{ marginBottom: '1rem' }}>Únete para guardar favoritos y valorar discos.</p>
                    <Link to="/login" className="add-btn" style={{ textDecoration: 'none', padding: '10px 20px', display: 'inline-block' }}>
                        Iniciar Sesión / Registro
                    </Link>
                </div>
            )}
        </section>
    );
}