import { useState, useEffect } from 'react';
import { obtenerGeneros, obtenerAlbumes } from '../services/api';
import BarraFiltros from '../components/BarraFiltros';
import TarjetaAlbum from '../components/TarjetaAlbum';
import '../styles/Catalogo.css';

export default function Catalogo() {
    const [albumes, setAlbumes] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [ordenSeleccionado, setOrdenSeleccionado] = useState('defecto');

    // 1. Cargar Géneros
    useEffect(() => {
        obtenerGeneros().then(setGeneros).catch(console.error);
    }, []);

    // 2. Cargar Álbumes (reacciona al cambiar generoSeleccionado)
    useEffect(() => {
        obtenerAlbumes(generoSeleccionado).then(setAlbumes).catch(console.error);
    }, [generoSeleccionado]);

    // 3. Filtrar por texto y ordenar
    const albumesFiltrados = albumes
        .filter(album => {
            if (terminoBusqueda === "") return true;
            const busquedaMin = terminoBusqueda.toLowerCase();
            return (
                album.title.toLowerCase().includes(busquedaMin) ||
                album.artist.toLowerCase().includes(busquedaMin)
            );
        })
        .sort((a, b) => {
            switch (ordenSeleccionado) {
                case 'titulo-asc': return a.title.localeCompare(b.title);
                case 'titulo-desc': return b.title.localeCompare(a.title);
                case 'anio-asc': return a.year - b.year;
                case 'anio-desc': return b.year - a.year;
                default: return 0;
            }
        });

    return (
        <div className="charts-container">
            <h1>Álbumes puntuados</h1>

            <BarraFiltros
                generos={generos}
                generoSeleccionado={generoSeleccionado}
                alCambiarGenero={setGeneroSeleccionado}
                terminoBusqueda={terminoBusqueda}
                alCambiarBusqueda={setTerminoBusqueda}
                ordenSeleccionado={ordenSeleccionado}
                alCambiarOrden={setOrdenSeleccionado}
            />

            <div className="charts-grid">
                {albumesFiltrados.map(album => (
                    <TarjetaAlbum key={album.id} album={album} />
                ))}
            </div>

            {albumesFiltrados.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-main)', opacity: 0.7, gridColumn: '1/-1' }}>
                    No se encontraron resultados para "{terminoBusqueda}".
                </p>
            )}
        </div>
    );
}