import { useState } from 'react';

export default function AlbumForm({ genres, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '', artist: '', year: '', genre: '', descriptors: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Le pasa los datos a la página
    };

    return (
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
                <input type="text" name="descriptors" placeholder="Ej: melancólico, rápido" onChange={handleChange} />
            </div>
            <button type="submit" className="submit-btn">Publicar Disco</button>
        </form>
    );
}