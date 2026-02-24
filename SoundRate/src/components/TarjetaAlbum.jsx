import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TarjetaAlbum({ album }) {
    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [numResenas, setNumResenas] = useState(0);

    // Efecto: al montar la tarjeta, cargamos las reseñas de este álbum
    useEffect(function () {
        const url = 'http://localhost:3000/reviews?albumId=' + album.id;

        fetch(url)
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                if (datos.length > 0) {
                    // Calculamos la suma total de puntuaciones con un bucle for
                    let sumaTotal = 0;
                    for (let i = 0; i < datos.length; i++) {
                        sumaTotal = sumaTotal + datos[i].rating;
                    }
                    // Calculamos la media y la redondeamos a 1 decimal
                    const media = sumaTotal / datos.length;
                    const mediaRedondeada = media.toFixed(1);
                    setPuntuacionMedia(mediaRedondeada);
                    setNumResenas(datos.length);
                }
            })
            .catch(function (error) {
                console.error("Error cargando notas:", error);
            });
    }, [album.id]);

    // Preparamos el texto de la puntuación
    let textoPuntuacion;
    if (numResenas > 0) {
        textoPuntuacion = '⭐ ' + puntuacionMedia + ' (' + numResenas + ')';
    } else {
        textoPuntuacion = '⭐ --';
    }

    return (
        <motion.div
            className="album-card"
            style={{ border: '1px solid #333', padding: '10px', borderRadius: '8px', textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
        >
            <Link to={'/album/' + album.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={album.cover} alt={album.title} style={{ width: '100%', borderRadius: '4px' }} />
                <h3 style={{ margin: '10px 0 5px 0' }}>{album.title}</h3>
                <p style={{ margin: '0 0 10px 0', color: 'gray' }}>{album.artist}</p>
            </Link>

            <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                {textoPuntuacion}
            </div>
        </motion.div>
    );
}