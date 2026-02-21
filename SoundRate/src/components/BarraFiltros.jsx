export default function BarraFiltros({ generos, generoSeleccionado, alCambiarGenero, terminoBusqueda, alCambiarBusqueda, ordenSeleccionado, alCambiarOrden }) {
    return (
        <div className="filters">
            <div className="filter-group">
                <label>Género:</label>
                <select
                    className="filter-select"
                    value={generoSeleccionado}
                    onChange={(e) => alCambiarGenero(e.target.value)}
                >
                    <option value="">Todos</option>
                    {generos.map(g => (
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
                    value={terminoBusqueda}
                    onChange={(e) => alCambiarBusqueda(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Ordenar por:</label>
                <select
                    className="filter-select"
                    value={ordenSeleccionado}
                    onChange={(e) => alCambiarOrden(e.target.value)}
                >
                    <option value="defecto">Por defecto</option>
                    <option value="titulo-asc">Título (A → Z)</option>
                    <option value="titulo-desc">Título (Z → A)</option>
                    <option value="anio-asc">Año (más antiguo)</option>
                    <option value="anio-desc">Año (más reciente)</option>
                </select>
            </div>
        </div>
    );
}