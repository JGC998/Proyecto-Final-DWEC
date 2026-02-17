import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

import '../styles/AlbumDetail.css';


export default function AlbumDetail() {
    const { id } = useParams(); // Capturamos el ID de la URL
    const [album, setAlbum] = useState(null);
    const navigate = useNavigate();

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();


    useEffect(() => {
        // Pedimos a la API solo este disco específico
        fetch(`http://localhost:3000/albums/${id}`)
            .then(res => res.json())
            .then(data => setAlbum(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    // ... imports y estados igual ...

    const handleDelete = async () => {
        if (window.confirm("⚠️ ¿Estás seguro de que quieres borrar este álbum para siempre?")) {
            try {
                // 1. Lo borramos de la base de datos (Servidor)
                await fetch(`http://localhost:3000/albums/${id}`, {
                    method: 'DELETE',
                });

                // 2. NUEVO: Lo borramos también de la lista de favoritos (Local)
                // Usamos la función removeFavorite que ya importaste del contexto
                removeFavorite(id);

                // 3. Redirigimos
                navigate('/');
            } catch (error) {
                console.error("Error al borrar:", error);
                alert("Hubo un error al intentar borrar el álbum.");
            }
        }
    };

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

                    <div className="actions">
                        {album && ( // Verificamos que album existe
                            <button
                                onClick={() => isFavorite(album.id) ? removeFavorite(album.id) : addFavorite(album)}
                                className={`fav-btn ${isFavorite(album.id) ? 'active' : ''}`}
                            >
                                {isFavorite(album.id) ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
                            </button>

                        )}
                        <button onClick={handleDelete} className="delete-btn">
                            🗑️ Delete Album
                        </button>
                    </div>

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