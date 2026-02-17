import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Charts.css';
import AlbumCard from '../components/AlbumCard';

export default function Charts() {
    const [albums, setAlbums] = useState([]);
    const [genres, setGenres] = useState([]); // Para llenar el select dinámicamente
    const [selectedGenre, setSelectedGenre] = useState(''); // Estado del filtro

    const [searchTerm, setSearchTerm] = useState("")

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

    const filteredAlbums = albums.filter(album => {
        if (searchTerm === "") return true; // Si no hay búsqueda, mostramos todo
        return (
            album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            album.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="charts-container">
            <h1>Explorar Catálogo</h1>

            {/* ZONA DE FILTROS Y BÚSQUEDA */}
            <div className="filters">
                <div className="filter-group">
                    <label>Género:</label>
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

                {/* 3. NUEVO: Input del buscador */}
                <div className="filter-group search-group">
                    <label>Buscar:</label>
                    <input
                        type="text"
                        placeholder="Nombre del disco o artista..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 4. CAMBIO: Ahora mapeamos 'filteredAlbums' en vez de 'albums' */}
            <div className="charts-grid">
                {filteredAlbums.map(album => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>

            {/* Mensaje si no hay resultados en la búsqueda */}
            {filteredAlbums.length === 0 && (
                <p style={{ textAlign: 'center', color: '#888', gridColumn: '1/-1' }}>
                    No se encontraron resultados para "{searchTerm}".
                </p>
            )}
        </div>
    );
}