import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Charts.css';

export default function Charts() {
    const [albums, setAlbums] = useState([]);
    const [genres, setGenres] = useState([]); // Para llenar el select dinámicamente
    const [selectedGenre, setSelectedGenre] = useState(''); // Estado del filtro

    // 1. Cargar Géneros (solo una vez al inicio)
    useEffect(() => {
        fetch('http://localhost:3000/genres')
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

    // 2. Cargar Álbumes (Cada vez que cambie 'selectedGenre')
    useEffect(() => {
        // Si hay género seleccionado, pedimos filtrado. Si no, pedimos todos.
        const url = selectedGenre
            ? `http://localhost:3000/albums?genre=${selectedGenre}`
            : 'http://localhost:3000/albums';

        fetch(url)
            .then(res => res.json())
            .then(data => setAlbums(data))
            .catch(err => console.error(err));
    }, [selectedGenre]); // <--- OJO: Dependencia clave

    return (
        <div className="charts-container">
            <h1>Explorar Catálogo</h1>

            {/* FILTROS */}
            <div className="filters">
                <label>Filtrar por género:</label>
                <select
                    className="filter-select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">Todos</option>
                    {genres.map(g => (
                        <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                </select>
            </div>

            {/* GRID DE RESULTADOS */}
            <div className="charts-grid">
                {albums.map(album => (
                    <Link to={`/album/${album.id}`} key={album.id} className="album-card">
                        <div className="cover-wrapper">
                            <img src={album.cover} alt={album.title} />
                            <span className="rating-badge">★ {album.avgRating}</span>
                        </div>
                        <div className="album-info">
                            <h3>{album.title}</h3>
                            <p>{album.artist}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {albums.length === 0 && <p>No hay discos en esta categoría.</p>}
        </div>
    );
}