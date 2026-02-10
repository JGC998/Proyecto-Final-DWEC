import { Routes, Route, Link } from 'react-router-dom';

//Importaciones páginas
import Home from './pages/Home';
import Charts from './pages/Charts';
import AddAlbum from './pages/AddAlbum';
import AlbumDetail from './components/AlbumDetail';

//Importaciones estilos
import './styles/App.css';

function App() {
  return (
    <>
      <header>
        <h1>SoundRate</h1>
      </header>

      {/* NAVEGACIÓN SPA */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/charts">Charts</Link></li>
          <li><Link to="/add">Add</Link></li>
        </ul>
      </nav>

      <main>
        {/* Aquí se cargan las páginas dinámicamente */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/add" element={<AddAlbum />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
        </Routes>
      </main>

      <footer>
        <p>© 2026 SoundRate. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;