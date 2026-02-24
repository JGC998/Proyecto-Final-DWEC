import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/ContextoFavoritos';
import { useTema } from '../context/ContextoTema';
import { useUsuario } from '../context/ContextoUsuario';
import '../styles/BarraNavegacion.css';

export default function BarraNavegacion() {
    const { favoritos } = useFavoritos();
    const { tema, alternarTema } = useTema();
    const { usuarioActual, cerrarSesion } = useUsuario();

    // Preparamos el icono del tema según el modo actual
    let iconoTema;
    if (tema === 'dark') {
        iconoTema = '☀';
    } else {
        iconoTema = '☾';
    }

    // Preparamos el contador de favoritos (solo se muestra si hay alguno)
    let contadorFavoritos = null;
    if (favoritos.length > 0) {
        contadorFavoritos = <span className="fav-counter">{favoritos.length}</span>;
    }

    // Preparamos la sección del usuario (logueado o no)
    let seccionUsuario;
    if (usuarioActual) {
        seccionUsuario = (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/profile" className="user-profile" title="Ver mi perfil" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                    <span>{usuarioActual.avatar} {usuarioActual.name}</span>
                </Link>
                <button onClick={cerrarSesion} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.9rem' }}>(Salir)</button>
            </div>
        );
    } else {
        seccionUsuario = (
            <Link to="/login" className="nav-item">Iniciar Sesión</Link>
        );
    }

    return (
        <header className="navbar">
            {/* SECCIÓN IZQUIERDA: Logo + Links principales */}
            <div className="nav-left">
                <Link to="/" className="logo-rym">
                    <span className="logo-icon">💿</span> SoundRate
                </Link>
                <div className="vertical-separator"></div>
                <ul className="nav-links">
                    <li><Link to="/charts">Álbumes</Link></li>
                    <li>
                        <Link to="/favorites" className="nav-item">
                            Discos favoritos
                            {contadorFavoritos}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* SECCIÓN DERECHA: Usuario y Acciones */}
            <div className="nav-right">
                {seccionUsuario}

                <Link to="/add" className="add-btn-rym">Añadir nuevo álbum</Link>

                <button onClick={alternarTema} className="theme-toggle-rym" title="Cambiar tema">
                    {iconoTema}
                </button>
            </div>
        </header>
    );
}