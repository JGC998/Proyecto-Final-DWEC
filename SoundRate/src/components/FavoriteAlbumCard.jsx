import { Link } from 'react-router-dom';

export default function FavoriteAlbumCard({ album, onRemove }) {
    return (
        <div className="album-card">
            <Link to={`/album/${album.id}`} className="cover-wrapper">
                <img src={album.cover} alt={album.title} />
            </Link>

            <div className="album-info">
                <h3>{album.title}</h3>
                <p style={{ opacity: 0.7 }}>{album.artist}</p>

                <button
                    onClick={() => onRemove(album.id)}
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
        </div>
    );
}