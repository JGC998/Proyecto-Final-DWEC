# SoundRate - Web React Profesional 🎵

## 📜 Descripción del Proyecto
**SoundRate** es una plataforma web desarrollada completamente en React orientada a la valoración musical. Permite dar de alta un nuevo album que hayas escuchado, y puntuarlo, asi como puntuar los que ya existen en la base de datos y gestionar una lista personal de favoritos.

Este proyecto ha sido desarrollado como trabajo final del **Tema 10: Desarrollo de una web funcional completamente en React** dentro del ciclo formativo de Desarrollo de Aplicaciones Web.

---

## 🛠 Arquitectura y Tecnologías
- **Core:** React 18, HTML5, CSS3 puro.
- **Enrutamiento:** React Router Dom v6.
- **Consumo de Datos:** API REST simulada usando `json-server`.
- **Organización:** Proyecto modularizado en `components`, `pages`, `services`, `context`, y `styles`.

---

## 🚀 Requisitos Técnicos Cumplidos

### 1. Uso de Hooks Fundamentales
- **`useState`**: Empleado para controlar el estado de carga (`loading`), los campos de los formularios, las respuestas de los usuarios, búsqueda y filtros.
- **`useEffect`**: Utilizado para consumir datos de forma asíncrona desde la API al montar los componentes del catálogo, inicio o detalles, así como la actualización dinámica de información.

### 2. Gestión de Eventos
A lo largo de la aplicación se utilizan múltiples eventos para aportar interactividad real:
- `onClick`: Manejo de navegación customizada, alternancia del tema visual (claro/oscuro), despliegue del menú móvil y gestión de botones "Favorito".
- `onChange`: Captura de texto en el buscador, selector de filtros de género y recolección de datos del formulario POST.
- `onSubmit`: Validación de datos antes de enviar un nuevo álbum a la API.

### 3. Consumo y Envío de Datos (API)
- **GET:** Extracción de datos desde `api/db.json` para poblar el carrusel de inicio, el listado del catálogo y la información individual en la vista de detalle.
- **POST:** Formulario de "Añadir Nuevo Álbum" plenamente funcional, permitiendo que el estado se actualice enviando correctamente la información a la API.

### 4. Navegación Multipágina (React Router)
Aplicación con enrutamiento protegido y declarado. **8 Rutas disponibles:**
1. `/` - Home (Hero y carrusel de tendencias).
2. `/charts` - Catálogo con lista completa de discos.
3. `/album/:id` - Detalles profundos del álbum (Ruta dinámica).
4. `/add` - Formulario para creación de registros.
5. `/favorites` - Gestión de álbumes añadidos a la lista personal.
6. `/login` - Interfaz (mock) de inicio de sesión.
7. `/profile` - Panel de usuario con histórico de reseñas y estadísticas visuales.
8. `*` - Página 404 de Ruta No Encontrada (Fall-back customizado).

### 5. Estado Global (Context API)
Uso de `createContext` y `useContext` para proveer datos a toda la aplicación sin necesidad de *prop drilling*:
- **`ContextoFavoritos`**: Mantiene en memoria los IDs de los álbumes favoritos del usuario en todas las páginas.
- **`ContextoTema`**: Modifica las variables CSS globales para alternar el diseño (Modo Oscuro / Claro).
- **`ContextoUsuario`**: Interfaz de "sesión de usuario" que protege ciertas acciones (evaluar álbumes o ver el perfil) asegurándose de que hay usuario activo.

### 6. Diseño Profesional y Layout Responsivo
- Diseño trabajado con CSS integrando efectos *Glassmorphism*, transiciones suaves y validación de contrastes (Light vs Dark mode).
- **Diseño Responsive** asegurado para resoluciones móviles y de escritorio. Navbar adaptable con integración de un Menú Hamburguesa interactivo y grids dinámicos para las vistas (1 Columna en Móvil, hasta 4 en monitores grandes).

---

## ✨ Puntos Extra Integrados (Librerías y Funciones)

Para enriquecer la aplicación se ha requerido del uso de herramientas recomendadas en la rúbrica:

### **Librerías Externas**
- **[Swiper](https://swiperjs.com/react):** Animación táctil deslizable, usada para el elegante carrusel de álbumes destacados en la presentación del inicio.
- **[Chart.js](https://react-chartjs-2.netlify.app/):** Renderizado de un gráfico dinámico analítico en el panel de **Perfil**, ilustrando la media de rating personal por género musical.
- **[React Toastify](https://fkhadra.github.io/react-toastify/):** Envío interrupciones sutiles de feedback al usuario notificando el resultado del POST (ej: "Álbum añadido correctamente") y otras acciones.

### **Funcionalidades Mínimas (Usabilidad Práctica)**
1. **Búsqueda Avanzada:** Barra filtrante en tiempo real por títulos o artistas.
2. **Filtro Categórico:** Selector en Catálogo para segmentar álbumes por género principal.
3. **Vista de Detalle:** Renderizado atómico particular para cada álbum.
4. **Almacenamiento en Favoritos:** Iconografía interactiva para listar selecciones en su correspondiente página segregada.
5. **Mensajes de Carga (`Loading...`)** integrados de forma condicional para emular con profesionalidad el retardo natural de red (Data fetching).
6. **Sistema de Alerta Global (Toasts)** que confirman transacciones u operaciones al usuario.

---

## ⚙️ Instrucciones de Inicialización Local

1. **Instalar los paquetes del proyecto:**
   ```bash
   npm install
   ```

2. **Levantar el Backend (API Fake JSON):**
   ```bash
   npx json-server --watch api/db.json --port 3000
   ```

3. **Iniciar Vite (Frontend):**
   ```bash
   npm run dev
   ```

4. **Navegar a:** [http://localhost:5173](http://localhost:5173)