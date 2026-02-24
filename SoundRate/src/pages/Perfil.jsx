import { useEffect, useState } from 'react';
import { useUsuario } from '../context/ContextoUsuario';
import { useFavoritos } from '../context/ContextoFavoritos';
import { obtenerAlbumes, obtenerResenasUsuario } from '../services/api';
import GraficoPerfil from '../components/GraficoPerfil';

export default function Perfil() {
    const { usuarioActual } = useUsuario();
    const { favoritos } = useFavoritos();
    const [resenas, setResenas] = useState([]);
    const [datoGrafico, setDatoGrafico] = useState(null);

    // Efecto: cuando hay un usuario, cargamos sus reseñas y calculamos las estadísticas
    useEffect(function () {
        if (!usuarioActual) {
            return;
        }

        // Función asíncrona para cargar datos
        async function cargarDatos() {
            try {
                // Cargamos las reseñas del usuario y todos los álbumes por separado
                const resenasUsuario = await obtenerResenasUsuario(usuarioActual.id);
                const todosAlbumes = await obtenerAlbumes();

                setResenas(resenasUsuario);

                // Calculamos la nota media por género
                // estadisticasGenero es un objeto donde cada clave es un nombre de género
                // y el valor es { suma: X, cantidad: Y }
                const estadisticasGenero = {};

                for (let i = 0; i < resenasUsuario.length; i++) {
                    const resena = resenasUsuario[i];

                    // Buscamos el álbum que corresponde a esta reseña
                    let albumEncontrado = null;
                    for (let j = 0; j < todosAlbumes.length; j++) {
                        if (todosAlbumes[j].id === resena.albumId) {
                            albumEncontrado = todosAlbumes[j];
                            break;
                        }
                    }

                    // Si encontramos el álbum, sumamos su puntuación al género correspondiente
                    if (albumEncontrado) {
                        const genero = albumEncontrado.genre;

                        // Si el género no existe aún en las estadísticas, lo inicializamos
                        if (!estadisticasGenero[genero]) {
                            estadisticasGenero[genero] = { suma: 0, cantidad: 0 };
                        }

                        estadisticasGenero[genero].suma = estadisticasGenero[genero].suma + resena.rating;
                        estadisticasGenero[genero].cantidad = estadisticasGenero[genero].cantidad + 1;
                    }
                }

                // Extraemos los nombres de los géneros y calculamos sus medias
                const nombresGeneros = Object.keys(estadisticasGenero);
                const mediasGeneros = [];
                for (let i = 0; i < nombresGeneros.length; i++) {
                    const nombre = nombresGeneros[i];
                    const stats = estadisticasGenero[nombre];
                    const media = stats.suma / stats.cantidad;
                    mediasGeneros.push(media.toFixed(1));
                }

                // Creamos el objeto de datos para el gráfico de Chart.js
                setDatoGrafico({
                    labels: nombresGeneros,
                    datasets: [{
                        label: 'Nota media otorgada',
                        data: mediasGeneros,
                        backgroundColor: '#fbbf24',
                        borderColor: '#f59e0b',
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error(error);
            }
        }

        cargarDatos();
    }, [usuarioActual]);

    // Si no hay usuario logueado, mostramos un mensaje
    if (!usuarioActual) {
        return <div style={{ padding: '2rem', color: 'var(--text-main)' }}>Debes iniciar sesión.</div>;
    }

    // Preparamos la lista de favoritos
    let listaFavoritos;
    if (favoritos.length > 0) {
        listaFavoritos = favoritos.map(function (fav) {
            return <li key={fav.id}>{fav.title} - {fav.artist}</li>;
        });
    } else {
        listaFavoritos = <li>No tienes favoritos aún.</li>;
    }

    // Preparamos la lista de reseñas
    let listaResenas;
    if (resenas.length > 0) {
        listaResenas = resenas.map(function (resena) {
            return <li key={resena.id}>⭐ {resena.rating}/5 - "{resena.text}"</li>;
        });
    } else {
        listaResenas = <li>No has valorado ningún disco.</li>;
    }

    return (
        <div style={{ padding: '2rem', color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '4rem' }}>{usuarioActual.avatar}</span>
                <h1>Perfil de {usuarioActual.name}</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3>Mis Discos Favoritos ({favoritos.length})</h3>
                    <ul style={{ marginBottom: '2rem' }}>
                        {listaFavoritos}
                    </ul>

                    <h3>Historial de Reseñas ({resenas.length})</h3>
                    <ul>
                        {listaResenas}
                    </ul>
                </div>

                <div>
                    <h3>Géneros mejor valorados</h3>
                    <GraficoPerfil datoGrafico={datoGrafico} />
                </div>
            </div>
        </div>
    );
}