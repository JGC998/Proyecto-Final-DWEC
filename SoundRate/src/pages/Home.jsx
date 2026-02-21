import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { getFeaturedAlbums } from '../services/api';
import HeroSection from '../components/HeroSection';
import FeaturedAlbums from '../components/FeaturedAlbums';
import '../styles/Home.css';

export default function Home() {
    const { currentUser } = useUser();
    const [topAlbums, setTopAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFeaturedAlbums(4)
            .then(data => {
                setTopAlbums(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) return <div className="loading">Cargando charts...</div>;

    return (
        <div className="page-container">
            <HeroSection currentUser={currentUser} />
            <FeaturedAlbums albums={topAlbums} />
        </div>
    );
}