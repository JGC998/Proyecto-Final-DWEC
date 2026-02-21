import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TarjetaFavorito({ album, alQuitar }) {
    return (
        <motion.div
            className="album-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Link to={`/album/${album.id}`} className="cover-wrapper">
                <img src={album.cover} alt={album.title} />
            </Link>

            <div className="album-info">
                <h3>{album.title}</h3>
                <p style={{ opacity: 0.7 }}>{album.artist}</p>

                <button
                    onClick={() => alQuitar(album.id)}
                    style={{
                        marginTop: '10px',
                        padding: '8px 10px',
                        background: '#e11d48',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#be123c'}
                    onMouseOut={(e) => e.target.style.background = '#e11d48'}
                >
                    Quitar de la lista
                </button>
            </div>
        </motion.div>
    );
}