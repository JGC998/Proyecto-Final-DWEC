import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css'
import Aplicacion from './App.jsx'
import { ProveedorFavoritos } from './context/ContextoFavoritos.jsx';
import { ProveedorTema } from './context/ContextoTema.jsx';
import { ProveedorUsuario } from './context/ContextoUsuario.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorTema>
      <ProveedorUsuario>
        <ProveedorFavoritos>
          <BrowserRouter>
            <Aplicacion />
          </BrowserRouter>
        </ProveedorFavoritos>
      </ProveedorUsuario>
    </ProveedorTema>
  </StrictMode>,
)
