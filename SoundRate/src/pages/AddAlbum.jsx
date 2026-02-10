import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al acabar
import '../styles/AddAlbum.css';

export default function AddAlbum() {
    const navigate = useNavigate();

    // Estado para guardar los datos del formulario
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        year: '',
        genre: '',
        descriptors: '' // Lo pediremos como texto separado por comas
    });

    const [genres, setGenres] = useState([]);

    // 1. Cargar la lista de géneros al entrar
    useEffect(() => {
        fetch('http://localhost:3000/genres')
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

    // 2. Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 3. Enviar el formulario (POST)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Generamos la portada automática basada en el título
        const magicCover = `https://picsum.photos/seed/${encodeURIComponent(formData.title)}/300/300`;

        // Preparamos el objeto final
        const newAlbum = {
            title: formData.title,
            artist: formData.artist,
            year: parseInt(formData.year),
            genre: formData.genre,
            cover: magicCover,
            avgRating: 0, // Empieza sin nota
            votes: 0,
            // Convertimos el texto "oscuro, triste" a un array ["oscuro", "triste"]
            descriptors: formData.descriptors.split(',').map(tag => tag.trim())
        };

        // Petición POST a la API
        fetch('http://localhost:3000/albums', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAlbum)
        })
            .then(() => {
                alert("¡Álbum añadido con éxito!");
                navigate('/charts'); // Redirigimos al catálogo
            })
            .catch(err => console.error("Error subiendo disco:", err));
    };

    return (
        <div className="form-container">
            <h2>Contribuye a la base de datos</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Título del Álbum</label>
                    <input type="text" name="title" required onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Artista</label>
                    <input type="text" name="artist" required onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Año de lanzamiento</label>
                    <input type="number" name="year" required onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Género</label>
                    <select name="genre" required onChange={handleChange} defaultValue="">
                        <option value="" disabled>Selecciona un género</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Descriptores (separados por coma)</label>
                    <input
                        type="text"
                        name="descriptors"
                        placeholder="Ej: melancólico, rápido, técnico"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-btn">Publicar Disco</button>
            </form>
        </div>
    );
}