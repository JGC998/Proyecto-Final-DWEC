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

    // Efecto: al montar la página, cargamos más álbumes (ej. 8) para que el carrusel pueda moverse
    useEffect(function () {
        obtenerAlbumesDestacados(8)
            .then(function (datos) {
                setAlbumesDestacados(datos);
                setCargando(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    // Mientras se cargan los datos, mostramos un mensaje
    if (cargando) {
        return <div className="loading">Cargando charts...</div>;
    }

    return (
        <div className="page-container">
            <SeccionHero usuarioActual={usuarioActual} />
            <AlbumesDestacados albumes={albumesDestacados} />
        </div>
    );
}