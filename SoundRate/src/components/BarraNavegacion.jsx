import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/ContextoFavoritos';
import { useTema } from '../context/ContextoTema';
import { useUsuario } from '../context/ContextoUsuario';
import '../styles/BarraNavegacion.css';

export default function BarraNavegacion() {
    const { favoritos } = useFavoritos();
    const { tema, alternarTema } = useTema();
    const { usuarioActual, cerrarSesion } = useUsuario();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    // Icono del tema
    const iconoTema = tema === 'dark' ? '☀' : '☾';

    // Contador de favoritos
    let contadorFavoritos = null;
    if (favoritos.length > 0) {
        contadorFavoritos = <span className="fav-counter">{favoritos.length}</span>;
    }

    // Sección del usuario (desktop)
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

            {/* SECCIÓN DERECHA: Usuario y Acciones (desktop) */}
            <div className="nav-right">
                {seccionUsuario}

                <Link to="/add" className="add-btn-rym">Añadir nuevo álbum</Link>

                <button onClick={alternarTema} className="theme-toggle-rym" title="Cambiar tema">
                    {iconoTema}
                </button>

                {/* Botón hamburguesa — solo visible en móvil */}
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                >
                    {menuAbierto ? '✕' : '☰'}
                </button>
            </div>

            {/* Panel de menú desplegable — solo en móvil */}
            <nav className={`mobile-menu${menuAbierto ? ' open' : ''}`}>
                <Link to="/charts" onClick={cerrarMenu}>Álbumes</Link>
                <Link to="/favorites" onClick={cerrarMenu}>
                    Discos favoritos {favoritos.length > 0 && <span className="fav-counter">{favoritos.length}</span>}
                </Link>
                <Link to="/add" onClick={cerrarMenu}>Añadir nuevo álbum</Link>
                {usuarioActual ? (
                    <>
                        <Link to="/profile" onClick={cerrarMenu}>{usuarioActual.avatar} Mi perfil</Link>
                        <button onClick={() => { cerrarSesion(); cerrarMenu(); }}>Cerrar sesión</button>
                    </>
                ) : (
                    <Link to="/login" onClick={cerrarMenu}>Iniciar sesión</Link>
                )}
            </nav>
        </header>
    );
}