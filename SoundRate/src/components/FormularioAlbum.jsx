import { useState } from 'react';

export default function AlbumForm({ generos, alEnviar }) {
    const [datoFormulario, setDatoFormulario] = useState({
        title: '', artist: '', year: '', genre: '', descriptors: ''
    });

    const manejarCambio = (e) => {
        setDatoFormulario({ ...datoFormulario, [e.target.name]: e.target.value });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        alEnviar(datoFormulario); // Le pasa los datos a la página
    };

    return (
        <form onSubmit={manejarEnvio}>
            <div className="form-group">
                <label>Título del Álbum</label>
                <input type="text" name="title" required onChange={manejarCambio} />
            </div>
            <div className="form-group">
                <label>Artista</label>
                <input type="text" name="artist" required onChange={manejarCambio} />
            </div>
            <div className="form-group">
                <label>Año de lanzamiento</label>
                <input type="number" name="year" required onChange={manejarCambio} />
            </div>
            <div className="form-group">
                <label>Género</label>
                <select name="genre" required onChange={manejarCambio} defaultValue="">
                    <option value="" disabled>Selecciona un género</option>
                    {generos.map(g => (
                        <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Descriptores (separados por coma)</label>
                <input type="text" name="descriptors" placeholder="Ej: melancólico, rápido" onChange={manejarCambio} />
            </div>
            <button type="submit" className="submit-btn">Publicar Disco</button>
        </form>
    );
}