import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavoritesProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
