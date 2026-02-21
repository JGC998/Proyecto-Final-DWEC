import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres, createAlbum } from '../services/api';
import AlbumForm from '../components/AlbumForm';
import '../styles/AddAlbum.css';

export default function AddAlbum() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres().then(setGenres).catch(console.error);
    }, []);

    const handleAddAlbum = async (formData) => {
        const magicCover = `https://picsum.photos/seed/${encodeURIComponent(formData.title)}/300/300`;

        const newAlbum = {
            title: formData.title,
            artist: formData.artist,
            year: parseInt(formData.year),
            genre: formData.genre,
            cover: magicCover,
            descriptors: formData.descriptors.split(',').map(tag => tag.trim())
        };

        try {
            await createAlbum(newAlbum);
            alert("¡Álbum añadido con éxito!");
            navigate('/charts');
        } catch (err) {
            console.error("Error subiendo disco:", err);
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Contribuye a la base de datos</h2>

            {/* Usamos el componente inyectándole los géneros y la función de guardado */}
            <AlbumForm genres={genres} onSubmit={handleAddAlbum} />

        </div>
    );
}