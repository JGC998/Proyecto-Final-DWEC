import { useFavoritos } from '../context/ContextoFavoritos';
import FavoritosVacios from '../components/FavoritosVacios';
import TarjetaFavorito from '../components/TarjetaFavorito';
import '../styles/Catalogo.css';

export default function Favoritos() {
    const { favoritos, quitarFavorito } = useFavoritos();

    return (
        <div className="charts-container">
            <h1 style={{ color: 'var(--accent)' }}>Mis Discos Favoritos ❤️</h1>

            {favoritos.length === 0 ? (
                <FavoritosVacios />
            ) : (
                <div className="charts-grid">
                    {favoritos.map(album => (
                        <TarjetaFavorito
                            key={album.id}
                            album={album}
                            alQuitar={quitarFavorito}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}