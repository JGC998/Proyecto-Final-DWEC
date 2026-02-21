import AlbumCard from './AlbumCard';

export default function FeaturedAlbums({ albums }) {
    return (
        <section className="top-charts">
            <h2>🔥 Top Rated Albums</h2>
            <div className="album-grid">
                {albums.map(album => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </section>
    );
}