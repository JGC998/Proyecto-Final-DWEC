import { Link } from 'react-router-dom';
// Nota: Puedes mover los estilos de la tarjeta a un archivo AlbumCard.css si quieres ser muy estricto, 
// o dejarlos en App.css/Charts.css si son compartidos.

export default function AlbumCard({ album }) {
    return (
        <Link to={`/album/${album.id}`} className="album-card">
            <div className="cover-wrapper">
                <img src={album.cover} alt={album.title} />
                {album.avgRating && (
                    <span className="rating-badge">★ {album.avgRating}</span>
                )}
            </div>
            <div className="album-info">
                <h3>{album.title}</h3>
                <p>{album.artist}</p>

                {/* Si quieres mostrar etiquetas, opcional */}
                {album.descriptors && (
                    <div className="tags" style={{ marginTop: '5px' }}>
                        {album.descriptors.slice(0, 2).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}