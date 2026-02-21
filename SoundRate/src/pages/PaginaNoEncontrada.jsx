import { Link } from 'react-router-dom';
import '../styles/PaginaNoEncontrada.css';

export default function PaginaNoEncontrada() {
    return (
        <div className="not-found-container">
            <div className="error-code">404</div>
            <h1>¡Ups! Página no encontrada</h1>
            <p>Parece que te has perdido en el catálogo musical.</p>

            <Link to="/" className="home-btn">
                Volver al Inicio
            </Link>
        </div>
    );
}