import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>SoundRate</h1>
      </header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/charts">Charts</a></li>
          <li><a href="/favorites">Favorites</a></li>
          <li><a href="/add">Add</a></li>
        </ul>
      </nav>
      <main>
        <h1>Puntúe sus albumes favoritos</h1>
        <p>Encuentre su favorito en la lista de charts y déjelo un voto</p>
      </main>
      <footer>
        <p>© 2026 SoundRate. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App
