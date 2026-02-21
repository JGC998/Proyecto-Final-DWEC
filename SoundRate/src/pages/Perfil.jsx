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

    useEffect(() => {
        if (!usuarioActual) return;

        Promise.all([obtenerResenasUsuario(usuarioActual.id), obtenerAlbumes()])
            .then(([resenasUsuario, todosAlbumes]) => {
                setResenas(resenasUsuario);

                const estadisticasGenero = {};
                resenasUsuario.forEach(resena => {
                    const album = todosAlbumes.find(a => a.id === resena.albumId);
                    if (album) {
                        if (!estadisticasGenero[album.genre]) estadisticasGenero[album.genre] = { suma: 0, cantidad: 0 };
                        estadisticasGenero[album.genre].suma += resena.rating;
                        estadisticasGenero[album.genre].cantidad += 1;
                    }
                });

                const etiquetas = Object.keys(estadisticasGenero);
                const datos = etiquetas.map(g => (estadisticasGenero[g].suma / estadisticasGenero[g].cantidad).toFixed(1));

                setDatoGrafico({
                    labels: etiquetas,
                    datasets: [{
                        label: 'Nota media otorgada',
                        data: datos,
                        backgroundColor: '#fbbf24',
                        borderColor: '#f59e0b',
                        borderWidth: 1
                    }]
                });
            })
            .catch(console.error);
    }, [usuarioActual]);

    if (!usuarioActual) return <div style={{ padding: '2rem', color: 'var(--text-main)' }}>Debes iniciar sesión.</div>;

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
                        {favoritos.length > 0
                            ? favoritos.map(fav => <li key={fav.id}>{fav.title} - {fav.artist}</li>)
                            : <li>No tienes favoritos aún.</li>}
                    </ul>

                    <h3>Historial de Reseñas ({resenas.length})</h3>
                    <ul>
                        {resenas.length > 0
                            ? resenas.map(resena => <li key={resena.id}>⭐ {resena.rating}/5 - "{resena.text}"</li>)
                            : <li>No has valorado ningún disco.</li>}
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