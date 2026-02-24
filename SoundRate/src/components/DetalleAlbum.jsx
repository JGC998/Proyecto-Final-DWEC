import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useFavoritos } from '../context/ContextoFavoritos';
import { useUsuario } from '../context/ContextoUsuario';

import '../styles/DetalleAlbum.css';

export default function DetalleAlbum() {
    // 1. Obtenemos el id del álbum desde la URL
    const { id } = useParams();
    const navegar = useNavigate();

    // 2. Estados del componente
    const [album, setAlbum] = useState(null);
    const { agregarFavorito, quitarFavorito, esFavorito } = useFavoritos();
    const { usuarioActual } = useUsuario();

    const [resenas, setResenas] = useState([]);
    const [puntuacion, setPuntuacion] = useState(5);
    const [comentario, setComentario] = useState('');
    const [estaEditando, setEstaEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);


    // 3. Efecto: cargar los datos del álbum y sus reseñas cuando se carga la página
    useEffect(function () {
        // Cargamos el álbum
        fetch('http://localhost:3000/albums/' + id)
            .then(respuesta => respuesta.json())
            .then(datos => setAlbum(datos))
            .catch(error => console.error("Error cargando álbum:", error));

        // Cargamos las reseñas de este álbum
        fetch('http://localhost:3000/reviews?albumId=' + id)
            .then(respuesta => respuesta.json())
            .then(datos => setResenas(datos))
            .catch(error => console.error("Error cargando reseñas:", error));
    }, [id]);

    // 4. Función para borrar el álbum
    async function manejarBorrado() {
        const confirmado = window.confirm("⚠️ ¿Estás seguro de que quieres borrar este álbum para siempre?");
        if (!confirmado) {
            return;
        }
        try {
            await fetch('http://localhost:3000/albums/' + id, { method: 'DELETE' });
            quitarFavorito(id);
            toast.success('Álbum eliminado del catálogo.');
            navegar('/charts');
        } catch (error) {
            console.error("Error al borrar:", error);
            toast.error('Error al intentar borrar el álbum.');
        }
    }

    // 5. Función para comenzar a editar una reseña existente
    function iniciarEdicion(miResena) {
        setPuntuacion(miResena.rating);
        setComentario(miResena.text);
        setIdEditando(miResena.id);
        setEstaEditando(true);
    }

    // 6. Función para cancelar la edición
    function cancelarEdicion() {
        setEstaEditando(false);
        setComentario('');
        setPuntuacion(5);
    }

    async function manejarActualizacionResena(evento) {
        evento.preventDefault();

        // 1. Buscamos la original y creamos la nueva en un solo paso
        const resenaOriginal = resenas.find(r => r.id === idEditando);
        const resenaActualizada = {
            ...resenaOriginal,
            rating: Number(puntuacion),
            text: comentario
        };

        try {
            const respuesta = await fetch(`http://localhost:3000/reviews/${idEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resenaActualizada)
            });
            const resenaGuardada = await respuesta.json();

            // 2. Actualizamos el estado con .map() (Crea la copia automáticamente)
            setResenas(resenas.map(r => r.id === idEditando ? resenaGuardada : r));

            // 3. Reseteamos
            setEstaEditando(false);
            setComentario('');
            setPuntuacion(5);
            toast.success('¡Reseña actualizada! ✏️');
        } catch (error) {
            console.error("Error:", error);
            toast.error('No se pudo actualizar.');
        }
    }

    // 8. Función para enviar una nueva reseña
    async function manejarEnvioResena(evento) {
        evento.preventDefault();
        const nuevaResena = {
            userId: usuarioActual.id,
            userName: usuarioActual.name,
            albumId: id,
            rating: Number(puntuacion),
            text: comentario
        };
        try {
            const respuesta = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaResena)
            });
            const resenaGuardada = await respuesta.json();

            // Añadimos la nueva reseña a la lista
            const nuevasResenas = [...resenas, resenaGuardada];
            setResenas(nuevasResenas);
            setComentario('');
            toast.success('¡Reseña enviada! Gracias por tu valoración ⭐');
        } catch (error) {
            console.error("Error al guardar la reseña:", error);
            toast.error('No se pudo guardar la reseña.');
        }
    }

    // 9. Función para borrar una reseña
    async function manejarBorradoResena(idResena) {
        const confirmado = window.confirm("¿Seguro que quieres borrar tu reseña?");
        if (!confirmado) {
            return;
        }
        try {
            await fetch('http://localhost:3000/reviews/' + idResena, { method: 'DELETE' });

            setResenas(resenas.filter(r => r.id !== idResena));
            toast.info('Reseña eliminada.');

        } catch (error) {
            console.error("Error al borrar la reseña:", error);
            toast.error('No se pudo borrar la reseña.');
        }
    }

    // 10. Calculamos la media de las puntuaciones
    let mediaCalculada = '--';
    if (resenas.length > 0) {
        let sumaTotal = 0;
        for (let i = 0; i < resenas.length; i++) {
            sumaTotal = sumaTotal + resenas[i].rating;
        }
        const media = sumaTotal / resenas.length;
        mediaCalculada = media.toFixed(1);
    }

    // 11. Mientras no tengamos los datos del álbum, mostramos "Cargando"
    if (!album) {
        return <div className="loading">Cargando detalles...</div>;
    }

    // 12. Preparamos el botón de favoritos
    const albumEsFavorito = esFavorito(album.id);
    let textoBotonFavorito;
    let claseBotonFavorito;

    if (albumEsFavorito) {
        textoBotonFavorito = '❤️ Quitar de Favoritos';
        claseBotonFavorito = 'fav-btn active';
    } else {
        textoBotonFavorito = '🤍 Añadir a Favoritos';
        claseBotonFavorito = 'fav-btn';
    }

    function manejarClickFavorito() {
        if (albumEsFavorito) {
            quitarFavorito(album.id);
        } else {
            agregarFavorito(album);
        }
    }

    // 13. Preparamos la lista de descriptores/etiquetas
    let listaEtiquetas = null;
    if (album.descriptors && album.descriptors.length > 0) {
        listaEtiquetas = album.descriptors.map(function (etiqueta) {
            return <span key={etiqueta} className="tag">{etiqueta}</span>;
        });
    }

    // 14. Preparamos la sección de reseñas
    let contenidoResenas;
    if (resenas.length === 0) {
        contenidoResenas = <p style={{ color: 'gray' }}>Nadie ha valorado este disco aún. ¡Sé el primero!</p>;
    } else {
        const listaResenas = resenas.map(function (resena) {
            return (
                <motion.li
                    key={resena.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ marginBottom: '1rem', background: 'var(--bg-secondary, rgba(255,255,255,0.05))', padding: '10px', borderRadius: '5px' }}
                >
                    <strong>{resena.userName}</strong> le dio un <strong style={{ color: 'var(--accent, #ffd700)' }}>{resena.rating}/5</strong>
                    <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', color: 'var(--text-main, #ddd)' }}>"{resena.text}"</p>
                </motion.li>
            );
        });
        contenidoResenas = <ul style={{ listStyle: 'none', padding: 0 }}>{listaResenas}</ul>;
    }

    // 15. Preparamos la sección del formulario de reseñas
    let seccionFormulario;

    if (!usuarioActual) {
        // Si no hay usuario logueado, mostramos un enlace para iniciar sesión
        seccionFormulario = (
            <p style={{ marginTop: '2rem', color: '#ff4757', fontWeight: 'bold' }}>
                ⚠️ <Link to="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>Inicia sesión</Link> para dejar tu nota.
            </p>
        );
    } else {
        // Comprobamos si el usuario ya ha valorado este disco
        let yaHaValorado = false;
        let miResena = null;
        for (let i = 0; i < resenas.length; i++) {
            if (resenas[i].userId === usuarioActual.id) {
                yaHaValorado = true;
                miResena = resenas[i];
                break;
            }
        }

        if (yaHaValorado && !estaEditando) {
            // El usuario ya valoró: mostramos su reseña con botones de editar/borrar
            seccionFormulario = (
                <div style={{ marginTop: '2rem', padding: '15px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: 'var(--accent)' }}>✅ Ya has valorado este disco</h4>
                    <div>
                        <p style={{ fontStyle: 'italic', margin: '0 0 10px 0' }}>
                            Le diste un <strong>{miResena.rating}/5</strong>: "{miResena.text}"
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={function () { iniciarEdicion(miResena); }}
                                style={{ background: 'var(--accent)', color: 'var(--bg-body)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                ✏️ Editar
                            </button>
                            <button
                                onClick={function () { manejarBorradoResena(miResena.id); }}
                                style={{ background: '#ff4757', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                🗑️ Borrar
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            // Mostramos el formulario para escribir o editar una reseña
            let tituloFormulario;
            if (estaEditando) {
                tituloFormulario = 'Edita tu valoración';
            } else {
                tituloFormulario = 'Deja tu valoración, ' + usuarioActual.name;
            }

            let textoBotonEnviar;
            if (estaEditando) {
                textoBotonEnviar = 'Guardar Cambios';
            } else {
                textoBotonEnviar = 'Enviar Reseña';
            }

            let funcionEnvio;
            if (estaEditando) {
                funcionEnvio = manejarActualizacionResena;
            } else {
                funcionEnvio = manejarEnvioResena;
            }

            // Botón de cancelar (solo visible al editar)
            let botonCancelar = null;
            if (estaEditando) {
                botonCancelar = (
                    <button
                        type="button"
                        onClick={cancelarEdicion}
                        style={{ padding: '10px 20px', cursor: 'pointer', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    >
                        Cancelar
                    </button>
                );
            }

            seccionFormulario = (
                <form onSubmit={funcionEnvio} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4>{tituloFormulario}</h4>
                    <select
                        value={puntuacion}
                        onChange={function (evento) { setPuntuacion(evento.target.value); }}
                        style={{ padding: '8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'inherit', border: '1px solid var(--border-color)' }}
                    >
                        <option value="5">5 - Obra maestra ⭐⭐⭐⭐⭐</option>
                        <option value="4">4 - Muy bueno ⭐⭐⭐⭐</option>
                        <option value="3">3 - Decente ⭐⭐⭐</option>
                        <option value="2">2 - Flojo ⭐⭐</option>
                        <option value="1">1 - Basura ⭐</option>
                    </select>
                    <textarea
                        placeholder="Escribe tu opinión aquí..."
                        value={comentario}
                        onChange={function (evento) { setComentario(evento.target.value); }}
                        required
                        rows="3"
                        style={{ padding: '10px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'inherit', border: '1px solid var(--border-color)' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="submit-btn" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                            {textoBotonEnviar}
                        </button>
                        {botonCancelar}
                    </div>
                </form>
            );
        }
    }

    // 16. Renderizado principal
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
                        <button onClick={manejarClickFavorito} className={claseBotonFavorito}>
                            {textoBotonFavorito}
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
                            {listaEtiquetas}
                        </div>
                    </div>

                    <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />

                    <div className="reviews-section">
                        <h3>Reseñas de la comunidad</h3>
                        {contenidoResenas}
                    </div>

                    <div className="review-form-section">
                        {seccionFormulario}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}