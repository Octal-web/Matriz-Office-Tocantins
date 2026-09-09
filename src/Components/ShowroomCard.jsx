import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { MapPin, ArrowUpRight } from 'lucide-react';

export const ShowroomCard = ({ tag, building, address, mapUrl, description, images }) => {
    const hasMultiple = images.length > 1;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-sm bg-neutral-800 flex-1">

            <div className="relative aspect-[20/9] overflow-hidden shrink-0">
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    autoplay={hasMultiple ? { delay: 4000, disableOnInteraction: false } : false}
                    loop={hasMultiple}
                    pagination={hasMultiple ? { clickable: true } : false}
                    className="size-full [&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet-active]:bg-white"
                >
                    {images.map((src, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={src}
                                alt={`Showroom ${tag} — foto ${i + 1}`}
                                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <span className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-sm border border-white/10">
                    {tag}
                </span>
            </div>

            <div className="flex flex-col flex-1 p-5 2xl:p-6 gap-3 2xl:gap-4">
                <div>
                    <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">{building}</p>
                    <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">{address}</p>
                </div>

                <p className="text-neutral-400 text-sm xl:leading-relaxed flex-1">
                    {description}
                </p>

                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start text-sm font-medium text-white
                               border border-white/20 px-4 py-2.5 rounded-sm
                               hover:bg-white hover:text-neutral-900 hover:border-white
                               transition-all duration-300 group/btn"
                >
                    <MapPin size={14} className="shrink-0" />
                    Ver no Mapa
                    <ArrowUpRight
                        size={13}
                        className="ml-auto -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200"
                    />
                </a>
            </div>
        </div>
    );
};