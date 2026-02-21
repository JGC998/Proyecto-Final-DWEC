import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useFavorites } from '../context/FavoritesContext';
import { getAlbums, getUserReviews } from '../services/api';
import ProfileChart from '../components/ProfileChart';

export default function Profile() {
    const { currentUser } = useUser();
    const { favorites } = useFavorites();
    const [reviews, setReviews] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        Promise.all([getUserReviews(currentUser.id), getAlbums()])
            .then(([userReviews, allAlbums]) => {
                setReviews(userReviews);

                const genreStats = {};
                userReviews.forEach(rev => {
                    const album = allAlbums.find(a => a.id === rev.albumId);
                    if (album) {
                        if (!genreStats[album.genre]) genreStats[album.genre] = { sum: 0, count: 0 };
                        genreStats[album.genre].sum += rev.rating;
                        genreStats[album.genre].count += 1;
                    }
                });

                const labels = Object.keys(genreStats);
                const data = labels.map(g => (genreStats[g].sum / genreStats[g].count).toFixed(1));

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Nota media otorgada',
                        data,
                        backgroundColor: '#fbbf24',
                        borderColor: '#f59e0b',
                        borderWidth: 1
                    }]
                });
            })
            .catch(console.error);
    }, [currentUser]);

    if (!currentUser) return <div style={{ padding: '2rem', color: 'var(--text-main)' }}>Debes iniciar sesión.</div>;

    return (
        <div style={{ padding: '2rem', color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '4rem' }}>{currentUser.avatar}</span>
                <h1>Perfil de {currentUser.name}</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3>Mis Discos Favoritos ({favorites.length})</h3>
                    <ul style={{ marginBottom: '2rem' }}>
                        {favorites.length > 0
                            ? favorites.map(fav => <li key={fav.id}>{fav.title} - {fav.artist}</li>)
                            : <li>No tienes favoritos aún.</li>}
                    </ul>

                    <h3>Historial de Reseñas ({reviews.length})</h3>
                    <ul>
                        {reviews.length > 0
                            ? reviews.map(rev => <li key={rev.id}>⭐ {rev.rating}/5 - "{rev.text}"</li>)
                            : <li>No has valorado ningún disco.</li>}
                    </ul>
                </div>

                <div>
                    <h3>Géneros mejor valorados</h3>
                    <ProfileChart chartData={chartData} />
                </div>
            </div>
        </div>
    );
}