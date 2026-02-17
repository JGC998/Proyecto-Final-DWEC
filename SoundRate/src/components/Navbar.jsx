import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

export default function Navbar() {
    const { favorites } = useFavorites();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="navbar">
            {/* SECCIÓN IZQUIERDA: Logo + Links principales */}
            <div className="nav-left">
                <Link to="/" className="logo-rym">
                    <span className="logo-icon">💿</span> RYM
                </Link>
                <div className="vertical-separator"></div>
                <ul className="nav-links">
                    <li><Link to="/charts">charts</Link></li>
                    <li><Link to="/">genres</Link></li>
                    <li><Link to="/charts">new releases</Link></li>
                </ul>
            </div>

            {/* SECCIÓN CENTRAL: Buscador (Estético) */}
            <div className="nav-center">
                <div className="search-bar-fake">
                    <span>🔍 Search...</span>
                </div>
            </div>

            {/* SECCIÓN DERECHA: Usuario y Acciones */}
            <div className="nav-right">
                <Link to="/favorites" className="nav-item">
                    Favorites
                    {favorites.length > 0 && <span className="fav-counter">{favorites.length}</span>}
                </Link>

                <Link to="/add" className="add-btn-rym">Submit</Link>

                <button onClick={toggleTheme} className="theme-toggle-rym" title="Cambiar tema">
                    {theme === 'dark' ? '☀' : '☾'}
                </button>
            </div>
        </header>
    );
}