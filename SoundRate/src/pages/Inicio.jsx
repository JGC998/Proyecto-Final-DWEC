import { useState, useEffect } from 'react';
import { useUsuario } from '../context/ContextoUsuario';
import { obtenerAlbumesDestacados } from '../services/api';
import SeccionHero from '../components/SeccionHero';
import AlbumesDestacados from '../components/AlbumesDestacados';
import '../styles/Inicio.css';

export default function Inicio() {
    const { usuarioActual } = useUsuario();
    const [albumesDestacados, setAlbumesDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        obtenerAlbumesDestacados(4)
            .then(datos => {
                setAlbumesDestacados(datos);
                setCargando(false);
            })
            .catch(console.error);
    }, []);

    if (cargando) return <div className="loading">Cargando charts...</div>;

    return (
        <div className="page-container">
            <SeccionHero usuarioActual={usuarioActual} />
            <AlbumesDestacados albumes={albumesDestacados} />
        </div>
    );
}