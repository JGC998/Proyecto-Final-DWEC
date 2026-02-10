import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/AlbumDetail.css';

export default function AlbumDetail() {
    const { id } = useParams(); // Capturamos el ID de la URL
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        // Pedimos a la API solo este disco específico
        fetch(`http://localhost:3000/albums/${id}`)
            .then(res => res.json())
            .then(data => setAlbum(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (!album) return <div className="loading">Cargando detalles...</div>;

    return (
        <div className="detail-container">
            <Link to="/charts" className="back-btn">← Volver al catálogo</Link>

            <div className="detail-card">
                <div className="detail-image">
                    <img src={album.cover} alt={album.title} />
                </div>

                <div className="detail-info">
                    <h1>{album.title}</h1>
                    <h2 className="artist-name">{album.artist}</h2>

                    <div className="meta-data">
                        <span className="badge-genre">{album.genre}</span>
                        <span className="badge-year">{album.year}</span>
                    </div>

                    <div className="rating-box">
                        <span className="score">{album.avgRating}</span>
                        <span className="votes">Basado en {album.votes} votos</span>
                    </div>

                    <div className="descriptors">
                        <h3>Atmósfera:</h3>
                        <div className="tags">
                            {album.descriptors?.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}