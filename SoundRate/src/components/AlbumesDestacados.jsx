import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import TarjetaAlbum from './TarjetaAlbum';

export default function AlbumesDestacados({ albumes }) {
    return (
        <section className="top-charts">
            <h2>🔥 Álbumes Mejor Valorados</h2>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                }}
                style={{ paddingBottom: '2.5rem' }}
            >
                {albumes.map(album => (
                    <SwiperSlide key={album.id}>
                        <TarjetaAlbum album={album} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}