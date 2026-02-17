import { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // 2. Estado inicial: intentamos leer del localStorage, si no, "dark"
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('appTheme') || 'dark';
    });

    // 3. Efecto: Guardar en localStorage y actualizar el atributo en el <body>
    useEffect(() => {
        localStorage.setItem('appTheme', theme);
        // Esto es clave: pone <body class="dark"> o <body class="light">
        document.body.className = theme;
    }, [theme]);

    // 4. Función para alternar
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 5. Hook personalizado
export const useTheme = () => useContext(ThemeContext);