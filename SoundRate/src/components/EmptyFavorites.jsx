import { Link } from 'react-router-dom';

export default function EmptyFavorites() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-main)' }}>
            <h2>No tienes favoritos aún.</h2>
            <p style={{ opacity: 0.8 }}>Ve al catálogo y añade algunos discos.</p>
            <Link to="/charts" className="submit-btn" style={{ display: 'inline-block', width: 'auto', marginTop: '20px', textDecoration: 'none' }}>
                Ir al Catálogo
            </Link>
        </div>
    );
}