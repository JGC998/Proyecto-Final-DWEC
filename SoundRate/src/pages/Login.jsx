import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function Login() {
    const { login, register, currentUser } = useUser();
    const navigate = useNavigate();

    // Redirigir si ya hay sesión iniciada (mejor usar useEffect para esto en React)
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <AuthForm onLogin={login} onRegister={register} />
    );
}