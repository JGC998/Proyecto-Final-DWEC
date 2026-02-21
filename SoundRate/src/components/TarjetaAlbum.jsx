import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TarjetaAlbum({ album }) {
    const [puntuacionMedia, setPuntuacionMedia] = useState(0);
    const [numResenas, setNumResenas] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/reviews?albumId=${album.id}`)
            .then(res => res.json())
            .then(datos => {
                if (datos.length > 0) {
                    const total = datos.reduce((acc, res) => acc + res.rating, 0);
                    setPuntuacionMedia((total / datos.length).toFixed(1));
                    setNumResenas(datos.length);
                }
            })
            .catch(err => console.error("Error cargando notas:", err));
    }, [album.id]);

    return (
        <motion.div
            className="album-card"
            style={{ border: '1px solid #333', padding: '10px', borderRadius: '8px', textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
        >
            <Link to={`/album/${album.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={album.cover} alt={album.title} style={{ width: '100%', borderRadius: '4px' }} />
                <h3 style={{ margin: '10px 0 5px 0' }}>{album.title}</h3>
                <p style={{ margin: '0 0 10px 0', color: 'gray' }}>{album.artist}</p>
            </Link>

            <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                {numResenas > 0 ? `⭐ ${puntuacionMedia} (${numResenas})` : '⭐ --'}
            </div>
        </motion.div>
    );
}