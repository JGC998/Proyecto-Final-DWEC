import { useState } from 'react';

export default function FormularioAlbum({ generos, alEnviar }) {
    // Estado del formulario con cada campo por separado (más claro que un objeto)
    const [titulo, setTitulo] = useState('');
    const [artista, setArtista] = useState('');
    const [anio, setAnio] = useState('');
    const [genero, setGenero] = useState('');
    const [descriptores, setDescriptores] = useState('');

    // Función que se ejecuta al enviar el formulario
    function manejarEnvio(evento) {
        evento.preventDefault();

        // Creamos el objeto con los datos del formulario
        const datoFormulario = {
            title: titulo,
            artist: artista,
            year: anio,
            genre: genero,
            descriptors: descriptores
        };

        // Le pasamos los datos a la página padre
        alEnviar(datoFormulario);
    }

    return (
        <form onSubmit={manejarEnvio}>
            <div className="form-group">
                <label>Título del Álbum</label>
                <input
                    type="text"
                    name="title"
                    required
                    onChange={function (evento) { setTitulo(evento.target.value); }}
                />
            </div>
            <div className="form-group">
                <label>Artista</label>
                <input
                    type="text"
                    name="artist"
                    required
                    onChange={function (evento) { setArtista(evento.target.value); }}
                />
            </div>
            <div className="form-group">
                <label>Año de lanzamiento</label>
                <input
                    type="number"
                    name="year"
                    required
                    onChange={function (evento) { setAnio(evento.target.value); }}
                />
            </div>
            <div className="form-group">
                <label>Género</label>
                <select
                    name="genre"
                    required
                    defaultValue=""
                    onChange={function (evento) { setGenero(evento.target.value); }}
                >
                    <option value="" disabled>Selecciona un género</option>
                    {generos.map(function (g) {
                        return <option key={g.id} value={g.name}>{g.name}</option>;
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Descriptores (separados por coma)</label>
                <input
                    type="text"
                    name="descriptors"
                    placeholder="Ej: melancólico, rápido"
                    onChange={function (evento) { setDescriptores(evento.target.value); }}
                />
            </div>
            <button type="submit" className="submit-btn">Publicar Disco</button>
        </form>
    );
}