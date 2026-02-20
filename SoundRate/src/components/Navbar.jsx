import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import '../styles/Navbar.css';

export default function Navbar() {
    const { favorites } = useFavorites();
    const { theme, toggleTheme } = useTheme();

    // CORRECCIÓN: Quitamos switchUser y traemos logout
    const { currentUser, logout } = useUser();

    return (
        <header className="navbar">
            {/* SECCIÓN IZQUIERDA: Logo + Links principales */}
            <div className="nav-left">
                <Link to="/" className="logo-rym">
                    <span className="logo-icon">💿</span> SoundRate
                </Link>
                <div className="vertical-separator"></div>
                <ul className="nav-links">
                    <li><Link to="/charts">Albums</Link></li>
                    <li><Link to="/favorites" className="nav-item">
                        Discos favoritos
                        {favorites.length > 0 && <span className="fav-counter">{favorites.length}</span>}
                    </Link></li>
                </ul>
            </div>

            {/* SECCIÓN DERECHA: Usuario y Acciones */}
            <div className="nav-right">
                {/* CORRECCIÓN: Estructura limpia para el Login/Logout */}
                {currentUser ? (
                    <div className="user-profile" onClick={logout} title="Cerrar sesión" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                        <span>{currentUser.avatar} {currentUser.name} (Salir)</span>
                    </div>
                ) : (
                    <Link to="/login" className="nav-item">Iniciar Sesión</Link>
                )}

                <Link to="/add" className="add-btn-rym">Añadir nuevo album</Link>

                <button onClick={toggleTheme} className="theme-toggle-rym" title="Cambiar tema">
                    {theme === 'dark' ? '☀' : '☾'}
                </button>
            </div>
        </header>
    );
}