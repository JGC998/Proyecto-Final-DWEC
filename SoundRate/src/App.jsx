import { Routes, Route, Link } from 'react-router-dom';
import { useFavorites } from './context/FavoritesContext'

//Importaciones páginas
import Home from './pages/Home';
import Charts from './pages/Charts';
import AddAlbum from './pages/AddAlbum';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Login from './pages/Login';


//Importaciones componentes
import Navbar from './components/Navbar';
import AlbumDetail from './components/AlbumDetail';



//Importaciones estilos
import './styles/App.css';

function App() {

  return (
    <>
      <Navbar />

      <header>
        <h1>SoundRate</h1>
      </header>

      <main>
        {/* Aquí se cargan las páginas dinámicamente */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/add" element={<AddAlbum />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <p>© 2026 SoundRate. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;