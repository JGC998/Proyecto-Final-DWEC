import { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const ContextoTema = createContext();

export const ProveedorTema = ({ children }) => {
    // 2. Estado inicial: intentamos leer del localStorage, si no, "dark"
    const [tema, setTema] = useState(() => {
        return localStorage.getItem('appTheme') || 'dark';
    });

    // 3. Efecto: guardar en localStorage y actualizar el atributo en el <body>
    useEffect(() => {
        localStorage.setItem('appTheme', tema);
        // Esto es clave: pone <body class="dark"> o <body class="light">
        document.body.className = tema;
    }, [tema]);

    // 4. Función para alternar el tema
    const alternarTema = () => {
        setTema((temaAnterior) => (temaAnterior === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ContextoTema.Provider value={{ tema, alternarTema }}>
            {children}
        </ContextoTema.Provider>
    );
};

// 5. Hook personalizado
export const useTema = () => useContext(ContextoTema);