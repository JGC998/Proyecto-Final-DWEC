import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AlbumCard({ album }) {
    const [avgRating, setAvgRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    // Cada tarjeta hace su propia petición para buscar SUS reseñas
    useEffect(() => {
        fetch(`http://localhost:3000/reviews?albumId=${album.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    const total = data.reduce((acc, rev) => acc + rev.rating, 0);
                    setAvgRating((total / data.length).toFixed(1));
                    setReviewCount(data.length);
                }
            })
            .catch(err => console.error("Error cargando notas:", err));
    }, [album.id]);

    return (
        <div className="album-card" style={{ border: '1px solid #333', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <Link to={`/album/${album.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={album.cover} alt={album.title} style={{ width: '100%', borderRadius: '4px' }} />
                <h3 style={{ margin: '10px 0 5px 0' }}>{album.title}</h3>
                <p style={{ margin: '0 0 10px 0', color: 'gray' }}>{album.artist}</p>
            </Link>

            {/* AQUÍ MOSTRAMOS LAS ESTRELLAS EN EL CATÁLOGO */}
            <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                {reviewCount > 0 ? `⭐ ${avgRating} (${reviewCount})` : '⭐ --'}
            </div>
        </div>
    );
}