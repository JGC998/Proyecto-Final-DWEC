import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Importaciones páginas
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import AgregarAlbum from './pages/AgregarAlbum';
import Favoritos from './pages/Favoritos';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';
import InicioSesion from './pages/InicioSesion';
import Perfil from './pages/Perfil';

//Importaciones componentes
import BarraNavegacion from './components/BarraNavegacion';
import DetalleAlbum from './components/DetalleAlbum';

//Importaciones estilos
import './styles/App.css';

function Aplicacion() {

  return (
    <>
      <BarraNavegacion />

      <header>
        <h1>SoundRate</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/charts" element={<Catalogo />} />
          <Route path="/add" element={<AgregarAlbum />} />
          <Route path="/album/:id" element={<DetalleAlbum />} />
          <Route path="/favorites" element={<Favoritos />} />
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/profile" element={<Perfil />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <footer>
        <p>© 2026 SoundRate. Todos los derechos reservados.</p>
      </footer>

      {/* Contenedor global de notificaciones Toastify */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Aplicacion;