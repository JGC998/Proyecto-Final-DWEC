import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    const [topAlbums, setTopAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pedimos los álbumes ordenados por nota (descendente) y limitamos a 4
        fetch('http://localhost:3000/albums?_sort=avgRating&_order=desc&_limit=4')
            .then(res => res.json())
            .then(data => {
                setTopAlbums(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="loading">Cargando charts...</div>;

    return (
        <div className="page-container">
            <section className="hero">
                <h1>Bienvenido a SoundRate</h1>
                <p>Descubre, puntúa y comparte tu música favorita.</p>
            </section>

            <section className="top-charts">
                <h2>🔥 Top Rated Albums</h2>
                <div className="album-grid">
                    {topAlbums.map(album => (
                        <Link to={`/album/${album.id}`} key={album.id} className="album-card">
                            <div className="cover-wrapper">
                                <img src={album.cover} alt={album.title} />
                                <span className="rating-badge">★ {album.avgRating}</span>
                            </div>
                            <div className="album-info">
                                <h3>{album.title}</h3>
                                <p>{album.artist}</p>
                                <div className="tags">
                                    {album.descriptors.slice(0, 2).map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}