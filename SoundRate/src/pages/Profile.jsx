import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useFavorites } from '../context/FavoritesContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Profile() {
    const { currentUser } = useUser();
    const { favorites } = useFavorites();
    const [reviews, setReviews] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        // Traemos las reseñas del usuario y todos los discos para cruzar los géneros
        Promise.all([
            fetch(`http://localhost:3000/reviews?userId=${currentUser.id}`).then(res => res.json()),
            fetch('http://localhost:3000/albums').then(res => res.json())
        ]).then(([userReviews, allAlbums]) => {
            setReviews(userReviews);

            // Calculamos la nota media por género
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
            const data = labels.map(genre => (genreStats[genre].sum / genreStats[genre].count).toFixed(1));

            setChartData({
                labels,
                datasets: [{
                    label: 'Nota media otorgada',
                    data,
                    backgroundColor: 'rgba(0, 255, 136, 0.5)',
                    borderColor: '#00ff88',
                    borderWidth: 1
                }]
            });
        });
    }, [currentUser]);

    if (!currentUser) return <div style={{ color: 'white', padding: '2rem' }}>Debes iniciar sesión para ver tu perfil.</div>;

    return (
        <div style={{ padding: '2rem', color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '4rem' }}>{currentUser.avatar}</span>
                <h1>Perfil de {currentUser.name}</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Columna Izquierda: Datos */}
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

                {/* Columna Derecha: Gráfico */}
                <div>
                    <h3>Géneros mejor valorados</h3>
                    {chartData && chartData.labels.length > 0 ? (
                        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                            <Bar
                                data={chartData}
                                options={{
                                    scales: { y: { beginAtZero: true, max: 5 } }
                                }}
                            />
                        </div>
                    ) : (
                        <p>Valora algunos discos para generar tu gráfico.</p>
                    )}
                </div>
            </div>
        </div>
    );
}