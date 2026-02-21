import { useFavorites } from '../context/FavoritesContext';
import EmptyFavorites from '../components/EmptyFavorites';
import FavoriteAlbumCard from '../components/FavoriteAlbumCard';
import '../styles/Charts.css';

export default function Favorites() {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <div className="charts-container">
            <h1 style={{ color: 'var(--accent)' }}>Mis Discos Favoritos ❤️</h1>

            {favorites.length === 0 ? (
                <EmptyFavorites />
            ) : (
                <div className="charts-grid">
                    {favorites.map(album => (
                        <FavoriteAlbumCard
                            key={album.id}
                            album={album}
                            onRemove={removeFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}