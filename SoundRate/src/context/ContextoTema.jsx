import { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto (es como un "almacén global" para compartir datos)
const ContextoTema = createContext();

// 2. Este componente envuelve a toda la app y le da acceso al tema
export function ProveedorTema({ children }) {

    // 3. Leemos del localStorage si el usuario ya eligió un tema antes
    const temaGuardado = localStorage.getItem('appTheme');

    // 4. Si no hay nada guardado, usamos "dark" por defecto
    let temaInicial;
    if (temaGuardado) {
        temaInicial = temaGuardado;
    } else {
        temaInicial = 'dark';
    }

    // 5. Creamos el estado con ese valor inicial
    const [tema, setTema] = useState(temaInicial);

    // 6. Efecto: cada vez que cambie el tema, lo guardamos en localStorage
    //    y actualizamos la clase del <body> para aplicar los estilos CSS
    useEffect(function () {
        localStorage.setItem('appTheme', tema);
        // Esto es clave: pone <body class="dark"> o <body class="light">
        document.body.className = tema;
    }, [tema]);

    // 7. Función para alternar entre tema claro y oscuro
    function alternarTema() {
        if (tema === 'dark') {
            setTema('light');
        } else {
            setTema('dark');
        }
    }

    // 8. Retornamos el Provider, que comparte "tema" y "alternarTema" con toda la app
    return (
        <ContextoTema.Provider value={{ tema, alternarTema }}>
            {children}
        </ContextoTema.Provider>
    );
}

// 9. Hook personalizado para que cualquier componente use el tema fácilmente
export function useTema() {
    return useContext(ContextoTema);
}