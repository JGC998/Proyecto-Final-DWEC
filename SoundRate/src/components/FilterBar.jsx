export default function FilterBar({ genres, selectedGenre, onGenreChange, searchTerm, onSearchChange }) {
    return (
        <div className="filters">
            <div className="filter-group">
                <label>Género:</label>
                <select
                    className="filter-select"
                    value={selectedGenre}
                    onChange={(e) => onGenreChange(e.target.value)}
                >
                    <option value="">Todos</option>
                    {genres.map(g => (
                        <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group search-group">
                <label>Buscar:</label>
                <input
                    type="text"
                    placeholder="Nombre del disco o artista..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
}