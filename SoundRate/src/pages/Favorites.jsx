import { useFavorites } from '../context/FavoritesContext'; // Importamos el cerebro
import { Link } from 'react-router-dom';
import '../styles/Charts.css'; // Reutilizamos los estilos del Grid para no trabajar doble

export default function Favorites() {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <div className="charts-container">
            <h1>Mis Discos Favoritos ❤️</h1>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>No tienes favoritos aún.</h2>
                    <p>Ve al catálogo y añade algunos discos.</p>
                    <Link to="/charts" className="submit-btn" style={{ display: 'inline-block', width: 'auto', marginTop: '20px' }}>
                        Ir al Catálogo
                    </Link>
                </div>
            ) : (
                <div className="charts-grid">
                    {favorites.map(album => (
                        <div key={album.id} className="album-card">
                            {/* Envolvemos la imagen en Link para ir al detalle */}
                            <Link to={`/album/${album.id}`} className="cover-wrapper">
                                <img src={album.cover} alt={album.title} />
                            </Link>

                            <div className="album-info">
                                <h3>{album.title}</h3>
                                <p>{album.artist}</p>

                                {/* Botón exclusivo de esta página para borrar rápido */}
                                <button
                                    onClick={() => removeFavorite(album.id)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '5px 10px',
                                        background: '#e11d48',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Quitar de la lista
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}