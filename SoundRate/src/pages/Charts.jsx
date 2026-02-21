import { useState, useEffect } from 'react';
import { getGenres, getAlbums } from '../services/api';
import FilterBar from '../components/FilterBar';
import AlbumCard from '../components/AlbumCard';
import '../styles/Charts.css';

export default function Charts() {
    const [albums, setAlbums] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // 1. Cargar Géneros
    useEffect(() => {
        getGenres().then(setGenres).catch(console.error);
    }, []);

    // 2. Cargar Álbumes (reacciona al cambiar selectedGenre)
    useEffect(() => {
        getAlbums(selectedGenre).then(setAlbums).catch(console.error);
    }, [selectedGenre]);

    // 3. Lógica de filtrado por texto
    const filteredAlbums = albums.filter(album => {
        if (searchTerm === "") return true;
        const lowerSearch = searchTerm.toLowerCase();
        return (
            album.title.toLowerCase().includes(lowerSearch) ||
            album.artist.toLowerCase().includes(lowerSearch)
        );
    });

    return (
        <div className="charts-container">
            <h1>Álbumes puntuados</h1>

            {/* Inyectamos el componente de filtros */}
            <FilterBar
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="charts-grid">
                {filteredAlbums.map(album => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>

            {filteredAlbums.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-main)', opacity: 0.7, gridColumn: '1/-1' }}>
                    No se encontraron resultados para "{searchTerm}".
                </p>
            )}
        </div>
    );
}