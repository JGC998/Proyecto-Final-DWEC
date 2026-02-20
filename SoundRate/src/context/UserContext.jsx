import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (username, password) => {
        const res = await fetch(`http://localhost:3000/users?name=${username}&password=${password}`);
        const users = await res.json();
        if (users.length > 0) {
            setCurrentUser(users[0]);
        } else {
            alert("Credenciales incorrectas");
        }
    };

    const register = async (username, password) => {
        // Verificar si existe
        const check = await fetch(`http://localhost:3000/users?name=${username}`);
        const exist = await check.json();
        if (exist.length > 0) return alert("El usuario ya existe");

        const newUser = { name: username, password, avatar: '👤' };
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        const createdUser = await res.json();
        setCurrentUser(createdUser);
    };

    const logout = () => setCurrentUser(null);

    return (
        <UserContext.Provider value={{ currentUser, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
