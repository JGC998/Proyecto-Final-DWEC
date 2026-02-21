import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { obtenerGeneros, crearAlbum } from '../services/api';
import FormularioAlbum from '../components/FormularioAlbum';
import '../styles/AgregarAlbum.css';

export default function AgregarAlbum() {
    const navegar = useNavigate();
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        obtenerGeneros().then(setGeneros).catch(console.error);
    }, []);

    const manejarAgregarAlbum = async (datoFormulario) => {
        const portadaAleatoria = `https://picsum.photos/seed/${encodeURIComponent(datoFormulario.title)}/300/300`;

        const nuevoAlbum = {
            title: datoFormulario.title,
            artist: datoFormulario.artist,
            year: parseInt(datoFormulario.year),
            genre: datoFormulario.genre,
            cover: portadaAleatoria,
            descriptors: datoFormulario.descriptors.split(',').map(etiqueta => etiqueta.trim())
        };

        try {
            await crearAlbum(nuevoAlbum);
            toast.success(`"${nuevoAlbum.title}" añadido al catálogo 🎵`);
            navegar('/charts');
        } catch (err) {
            console.error("Error subiendo disco:", err);
            toast.error('No se pudo añadir el álbum. Revisa la conexión con la API.');
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Contribuye a la base de datos</h2>
            <FormularioAlbum generos={generos} alEnviar={manejarAgregarAlbum} />
        </div>
    );
}