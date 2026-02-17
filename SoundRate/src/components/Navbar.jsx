import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css'; // Crearemos este archivo ahora

export default function Navbar() {
    const { favorites } = useFavorites();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">SoundRate 🎵</Link>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/charts">Charts</Link></li>
                        <li>
                            <Link to="/favorites" className="fav-link">
                                Favorites
                                {favorites.length > 0 && <span className="fav-badge">{favorites.length}</span>}
                            </Link>
                        </li>

                        <li><Link to="/add" className="add-btn">Add +</Link></li>
                        <li>
                            <button
                                onClick={toggleTheme}
                                className="theme-btn"
                                title="Cambiar tema"
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
}