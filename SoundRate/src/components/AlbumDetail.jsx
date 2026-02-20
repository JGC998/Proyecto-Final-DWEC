import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useUser } from '../context/UserContext'; // NUEVO: Importamos el contexto del usuario

import '../styles/AlbumDetail.css';

export default function AlbumDetail() {
    const { id } = useParams(); // Capturamos el ID de la URL
    const navigate = useNavigate();

    // Estados del disco y del usuario
    const [album, setAlbum] = useState(null);
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { currentUser } = useUser();

    // NUEVO: Estados para manejar las reseñas
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // 1. Pedimos los detalles del álbum
        fetch(`http://localhost:3000/albums/${id}`)
            .then(res => res.json())
            .then(data => setAlbum(data))
            .catch(err => console.error("Error cargando álbum:", err));

        // 2. NUEVO: Pedimos las reseñas asociadas a este álbum
        fetch(`http://localhost:3000/reviews?albumId=${id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Error cargando reseñas:", err));
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("⚠️ ¿Estás seguro de que quieres borrar este álbum para siempre?")) {
            try {
                await fetch(`http://localhost:3000/albums/${id}`, {
                    method: 'DELETE',
                });
                removeFavorite(id);
                navigate('/');
            } catch (error) {
                console.error("Error al borrar:", error);
                alert("Hubo un error al intentar borrar el álbum.");
            }
        }
    };

    const startEditing = (myRev) => {
        setRating(myRev.rating);
        setComment(myRev.text);
        setEditingId(myRev.id);
        setIsEditing(true);
    };

    const handleUpdateReview = async (e) => {
        e.preventDefault();
        const updatedReview = {
            ...reviews.find(r => r.id === editingId),
            rating: Number(rating),
            text: comment
        };

        try {
            const res = await fetch(`http://localhost:3000/reviews/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedReview)
            });
            const saved = await res.json();
            // Actualizamos la reseña editada en la pantalla
            setReviews(reviews.map(r => r.id === editingId ? saved : r));
            setIsEditing(false);
            setComment('');
            setRating(5);
        } catch (error) {
            console.error("Error al editar la reseña:", error);
        }
    };

    // NUEVO: Función para enviar una nueva reseña
    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const newReview = {
            userId: currentUser.id,
            userName: currentUser.name,
            albumId: id,
            rating: Number(rating),
            text: comment
        };

        try {
            const res = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });

            const savedReview = await res.json();
            setReviews([...reviews, savedReview]); // Actualizamos la lista al instante
            setComment(''); // Limpiamos el formulario
        } catch (error) {
            console.error("Error al guardar la reseña:", error);
        }
    };

    // Función para borrar la reseña del usuario
    const handleDeleteReview = async (reviewId) => {
        if (window.confirm("¿Seguro que quieres borrar tu reseña?")) {
            try {
                await fetch(`http://localhost:3000/reviews/${reviewId}`, {
                    method: 'DELETE',
                });
                // Quitamos la reseña de la pantalla instantáneamente
                setReviews(reviews.filter(rev => rev.id !== reviewId));
            } catch (error) {
                console.error("Error al borrar la reseña:", error);
            }
        }
    };

    // NUEVO: Calculamos la nota media real sumando todas las reseñas
    const calculatedAvg = reviews.length > 0
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : '--';

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
                        <button
                            onClick={() => isFavorite(album.id) ? removeFavorite(album.id) : addFavorite(album)}
                            className={`fav-btn ${isFavorite(album.id) ? 'active' : ''}`}
                        >
                            {isFavorite(album.id) ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
                        </button>

                        <button onClick={handleDelete} className="delete-btn">
                            🗑️ Delete Album
                        </button>
                    </div>

                    <div className="meta-data">
                        <span className="badge-genre">{album.genre}</span>
                        <span className="badge-year">{album.year}</span>
                    </div>

                    {/* MODIFICADO: Ahora muestra la media matemática y los votos reales */}
                    <div className="rating-box">
                        <span className="score">⭐ {calculatedAvg}</span>
                        <span className="votes">Basado en {reviews.length} votos</span>
                    </div>

                    <div className="descriptors">
                        <h3>Atmósfera:</h3>
                        <div className="tags">
                            {album.descriptors?.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />

                    {/* NUEVO: SECCIÓN DE RESEÑAS DE LA COMUNIDAD */}
                    <div className="reviews-section">
                        <h3>Reseñas de la comunidad</h3>
                        {reviews.length === 0 ? (
                            <p style={{ color: 'gray' }}>Nadie ha valorado este disco aún. ¡Sé el primero!</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {reviews.map(rev => (
                                    <li key={rev.id} style={{ marginBottom: '1rem', background: 'var(--bg-secondary, rgba(255,255,255,0.05))', padding: '10px', borderRadius: '5px' }}>
                                        <strong>{rev.userName}</strong> le dio un <strong style={{ color: 'var(--accent, #ffd700)' }}>{rev.rating}/5</strong>
                                        <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', color: 'var(--text-main, #ddd)' }}>"{rev.text}"</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* FORMULARIO DE VALORACIÓN (Control de sesión, voto único y edición) */}
                    <div className="review-form-section">
                        {currentUser ? (
                            reviews.some(rev => rev.userId === currentUser.id) && !isEditing ? (
                                <div style={{ marginTop: '2rem', padding: '15px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: 'var(--accent)' }}>✅ Ya has valorado este disco</h4>
                                    {reviews.filter(r => r.userId === currentUser.id).map(myRev => (
                                        <div key={myRev.id}>
                                            <p style={{ fontStyle: 'italic', margin: '0 0 10px 0' }}>
                                                Le diste un <strong>{myRev.rating}/5</strong>: "{myRev.text}"
                                            </p>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => startEditing(myRev)}
                                                    style={{ background: 'var(--accent)', color: 'var(--bg-body)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(myRev.id)}
                                                    style={{ background: '#ff4757', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    🗑️ Borrar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <form onSubmit={isEditing ? handleUpdateReview : handleSubmitReview} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <h4>{isEditing ? 'Edita tu valoración' : `Deja tu valoración, ${currentUser.name}`}</h4>
                                    <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: '8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'inherit', border: '1px solid var(--border-color)' }}>
                                        <option value="5">5 - Obra maestra ⭐⭐⭐⭐⭐</option>
                                        <option value="4">4 - Muy bueno ⭐⭐⭐⭐</option>
                                        <option value="3">3 - Decente ⭐⭐⭐</option>
                                        <option value="2">2 - Flojo ⭐⭐</option>
                                        <option value="1">1 - Basura ⭐</option>
                                    </select>
                                    <textarea
                                        placeholder="Escribe tu opinión aquí..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        rows="3"
                                        style={{ padding: '10px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'inherit', border: '1px solid var(--border-color)' }}
                                    />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" className="submit-btn" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                            {isEditing ? 'Guardar Cambios' : 'Enviar Reseña'}
                                        </button>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => { setIsEditing(false); setComment(''); setRating(5); }}
                                                style={{ padding: '10px 20px', cursor: 'pointer', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )
                        ) : (
                            <p style={{ marginTop: '2rem', color: '#ff4757', fontWeight: 'bold' }}>
                                ⚠️ <Link to="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>Inicia sesión</Link> para dejar tu nota.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}