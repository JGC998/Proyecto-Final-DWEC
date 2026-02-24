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

    // 1. Cargar los géneros al montar el componente
    useEffect(function () {
        obtenerGeneros()
            .then(datos => setGeneros(datos))
            .catch(error => console.error(error));
    }, []);

    // 2. Cargar álbumes (se recarga cada vez que cambia el género seleccionado)
    useEffect(function () {
        obtenerAlbumes(generoSeleccionado)
            .then(datos => setAlbumes(datos))
            .catch(error => console.error(error));
    }, [generoSeleccionado]);

    // 3. Filtrar por texto de búsqueda
    const busquedaMin = terminoBusqueda.toLowerCase();

    const albumesFiltradosPorTexto = albumes.filter(album => {
        // Si el buscador está vacío, .includes("") siempre devuelve true (incluye todo)
        const coincideTitulo = album.title.toLowerCase().includes(busquedaMin);
        const coincideArtista = album.artist.toLowerCase().includes(busquedaMin);

        return coincideTitulo || coincideArtista;
    });

    // 4. Ordenar los álbumes filtrados
    // Creamos una copia para no modificar el array original
    const albumesOrdenados = [...albumesFiltradosPorTexto].sort((a, b) => {
        switch (ordenSeleccionado) {
            case 'titulo-asc': return a.title.localeCompare(b.title);
            case 'titulo-desc': return b.title.localeCompare(a.title);
            case 'anio-asc': return a.year - b.year;
            case 'anio-desc': return b.year - a.year;
            default: return 0;
        }
    });

    // 5. Preparamos el mensaje de "sin resultados"
    let mensajeSinResultados = null;
    if (albumesOrdenados.length === 0) {
        mensajeSinResultados = (
            <p style={{ textAlign: 'center', color: 'var(--text-main)', opacity: 0.7, gridColumn: '1/-1' }}>
                No se encontraron resultados para "{terminoBusqueda}".
            </p>
        );
    }

    // 6. Generamos la lista de tarjetas
    const listaTarjetas = albumesOrdenados.map(function (album) {
        return <TarjetaAlbum key={album.id} album={album} />;
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
                {listaTarjetas}
            </div>

            {mensajeSinResultados}
        </div>
    );
}