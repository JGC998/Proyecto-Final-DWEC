import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { obtenerGeneros, crearAlbum } from '../services/api';
import FormularioAlbum from '../components/FormularioAlbum';
import '../styles/AgregarAlbum.css';

export default function AgregarAlbum() {
    const navegar = useNavigate();
    const [generos, setGeneros] = useState([]);

    // Efecto: al montar la página, cargamos los géneros
    useEffect(function () {
        obtenerGeneros()
            .then(datos => setGeneros(datos))
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Función que recibe los datos del formulario y crea el álbum
    async function manejarAgregarAlbum(datoFormulario) {
        // Generamos una portada aleatoria con el nombre del álbum
        const tituloParaURL = encodeURIComponent(datoFormulario.title);
        const portadaAleatoria = 'https://picsum.photos/seed/' + tituloParaURL + '/300/300';

        // Procesamos los descriptores: separamos por comas y limpiamos espacios
        const textoDescriptores = datoFormulario.descriptors;
        const descriptoresSeparados = textoDescriptores.split(',');
        const descriptoresLimpios = [];
        for (let i = 0; i < descriptoresSeparados.length; i++) {
            const descriptor = descriptoresSeparados[i].trim();
            if (descriptor !== '') {
                descriptoresLimpios.push(descriptor);
            }
        }

        // Creamos el objeto del nuevo álbum
        const nuevoAlbum = {
            title: datoFormulario.title,
            artist: datoFormulario.artist,
            year: parseInt(datoFormulario.year),
            genre: datoFormulario.genre,
            cover: portadaAleatoria,
            descriptors: descriptoresLimpios
        };

        try {
            await crearAlbum(nuevoAlbum);
            toast.success('"' + nuevoAlbum.title + '" añadido al catálogo 🎵');
            navegar('/charts');
        } catch (error) {
            console.error("Error subiendo disco:", error);
            toast.error('No se pudo añadir el álbum. Revisa la conexión con la API.');
        }
    }

    return (
        <div className="form-container">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Contribuye a la base de datos</h2>
            <FormularioAlbum generos={generos} alEnviar={manejarAgregarAlbum} />
        </div>
    );
}