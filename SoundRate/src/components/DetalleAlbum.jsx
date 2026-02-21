import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useFavoritos } from '../context/ContextoFavoritos';
import { useUsuario } from '../context/ContextoUsuario';

import '../styles/DetalleAlbum.css';

export default function DetalleAlbum() {
    const { id } = useParams();
    const navegar = useNavigate();

    const [album, setAlbum] = useState(null);
    const { agregarFavorito, quitarFavorito, esFavorito } = useFavoritos();
    const { usuarioActual } = useUsuario();

    const [resenas, setResenas] = useState([]);
    const [puntuacion, setPuntuacion] = useState(5);
    const [comentario, setComentario] = useState('');
    const [estaEditando, setEstaEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/albums/${id}`)
            .then(res => res.json())
            .then(datos => setAlbum(datos))
            .catch(err => console.error("Error cargando álbum:", err));

        fetch(`http://localhost:3000/reviews?albumId=${id}`)
            .then(res => res.json())
            .then(datos => setResenas(datos))
            .catch(err => console.error("Error cargando reseñas:", err));
    }, [id]);

    const manejarBorrado = async () => {
        const confirmado = window.confirm("⚠️ ¿Estás seguro de que quieres borrar este álbum para siempre?");
        if (!confirmado) return;
        try {
            await fetch(`http://localhost:3000/albums/${id}`, { method: 'DELETE' });
            quitarFavorito(id);
            toast.success('Álbum eliminado del catálogo.');
            navegar('/');
        } catch (error) {
            console.error("Error al borrar:", error);
            toast.error('Error al intentar borrar el álbum.');
        }
    };

    const iniciarEdicion = (miResena) => {
        setPuntuacion(miResena.rating);
        setComentario(miResena.text);
        setIdEditando(miResena.id);
        setEstaEditando(true);
    };

    const manejarActualizacionResena = async (e) => {
        e.preventDefault();
        const resenaActualizada = {
            ...resenas.find(r => r.id === idEditando),
            rating: Number(puntuacion),
            text: comentario
        };
        try {
            const res = await fetch(`http://localhost:3000/reviews/${idEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resenaActualizada)
            });
            const resenaGuardada = await res.json();
            setResenas(resenas.map(r => r.id === idEditando ? resenaGuardada : r));
            setEstaEditando(false);
            setComentario('');
            setPuntuacion(5);
            toast.success('¡Reseña actualizada! ✏️');
        } catch (error) {
            console.error("Error al editar la reseña:", error);
            toast.error('No se pudo actualizar la reseña.');
        }
    };

    const manejarEnvioResena = async (e) => {
        e.preventDefault();
        const nuevaResena = {
            userId: usuarioActual.id,
            userName: usuarioActual.name,
            albumId: id,
            rating: Number(puntuacion),
            text: comentario
        };
        try {
            const res = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaResena)
            });
            const resenaGuardada = await res.json();
            setResenas([...resenas, resenaGuardada]);
            setComentario('');
            toast.success('¡Reseña enviada! Gracias por tu valoración ⭐');
        } catch (error) {
            console.error("Error al guardar la reseña:", error);
            toast.error('No se pudo guardar la reseña.');
        }
    };

    const manejarBorradoResena = async (idResena) => {
        const confirmado = window.confirm("¿Seguro que quieres borrar tu reseña?");
        if (!confirmado) return;
        try {
            await fetch(`http://localhost:3000/reviews/${idResena}`, { method: 'DELETE' });
            setResenas(resenas.filter(res => res.id !== idResena));
            toast.info('Reseña eliminada.');
        } catch (error) {
            console.error("Error al borrar la reseña:", error);
            toast.error('No se pudo borrar la reseña.');
        }
    };

    const mediaCalculada = resenas.length > 0
        ? (resenas.reduce((acc, res) => acc + res.rating, 0) / resenas.length).toFixed(1)
        : '--';

    if (!album) return <div className="loading">Cargando detalles...</div>;

    return (
        <motion.div
            className="detail-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
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
                            onClick={() => esFavorito(album.id) ? quitarFavorito(album.id) : agregarFavorito(album)}
                            className={`fav-btn ${esFavorito(album.id) ? 'active' : ''}`}
                        >
                            {esFavorito(album.id) ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
                        </button>
                        <button onClick={manejarBorrado} className="delete-btn">
                            🗑️ Borrar Álbum
                        </button>
                    </div>

                    <div className="meta-data">
                        <span className="badge-genre">{album.genre}</span>
                        <span className="badge-year">{album.year}</span>
                    </div>

                    <div className="rating-box">
                        <span className="score">⭐ {mediaCalculada}</span>
                        <span className="votes">Basado en {resenas.length} votos</span>
                    </div>

                    <div className="descriptors">
                        <h3>Atmósfera:</h3>
                        <div className="tags">
                            {album.descriptors?.map(etiqueta => (
                                <span key={etiqueta} className="tag">{etiqueta}</span>
                            ))}
                        </div>
                    </div>

                    <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />

                    <div className="reviews-section">
                        <h3>Reseñas de la comunidad</h3>
                        {resenas.length === 0 ? (
                            <p style={{ color: 'gray' }}>Nadie ha valorado este disco aún. ¡Sé el primero!</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {resenas.map(resena => (
                                    <motion.li
                                        key={resena.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ marginBottom: '1rem', background: 'var(--bg-secondary, rgba(255,255,255,0.05))', padding: '10px', borderRadius: '5px' }}
                                    >
                                        <strong>{resena.userName}</strong> le dio un <strong style={{ color: 'var(--accent, #ffd700)' }}>{resena.rating}/5</strong>
                                        <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', color: 'var(--text-main, #ddd)' }}>"{resena.text}"</p>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="review-form-section">
                        {usuarioActual ? (
                            resenas.some(res => res.userId === usuarioActual.id) && !estaEditando ? (
                                <div style={{ marginTop: '2rem', padding: '15px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: 'var(--accent)' }}>✅ Ya has valorado este disco</h4>
                                    {resenas.filter(r => r.userId === usuarioActual.id).map(miResena => (
                                        <div key={miResena.id}>
                                            <p style={{ fontStyle: 'italic', margin: '0 0 10px 0' }}>
                                                Le diste un <strong>{miResena.rating}/5</strong>: "{miResena.text}"
                                            </p>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button onClick={() => iniciarEdicion(miResena)} style={{ background: 'var(--accent)', color: 'var(--bg-body)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>✏️ Editar</button>
                                                <button onClick={() => manejarBorradoResena(miResena.id)} style={{ background: '#ff4757', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Borrar</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <form onSubmit={estaEditando ? manejarActualizacionResena : manejarEnvioResena} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <h4>{estaEditando ? 'Edita tu valoración' : `Deja tu valoración, ${usuarioActual.name}`}</h4>
                                    <select value={puntuacion} onChange={(e) => setPuntuacion(e.target.value)} style={{ padding: '8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'inherit', border: '1px solid var(--border-color)' }}>
                                        <option value="5">5 - Obra maestra ⭐⭐⭐⭐⭐</option>
                                        <option value="4">4 - Muy bueno ⭐⭐⭐⭐</option>
                                        <option value="3">3 - Decente ⭐⭐⭐</option>
                                        <option value="2">2 - Flojo ⭐⭐</option>
                                        <option value="1">1 - Basura ⭐</option>
                                    </select>
                                    <textarea
                                        placeholder="Escribe tu opinión aquí..."
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                        required rows="3"
                                        style={{ padding: '10px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'inherit', border: '1px solid var(--border-color)' }}
                                    />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" className="submit-btn" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                            {estaEditando ? 'Guardar Cambios' : 'Enviar Reseña'}
                                        </button>
                                        {estaEditando && (
                                            <button type="button" onClick={() => { setEstaEditando(false); setComentario(''); setPuntuacion(5); }} style={{ padding: '10px 20px', cursor: 'pointer', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
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
        </motion.div>
    );
}