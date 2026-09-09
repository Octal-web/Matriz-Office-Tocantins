import { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import 'yet-another-react-lightbox/styles.css';

import { homeGalleryPhotos } from '@/Data/homeGalleryPhotos';

export const SolutionsSlides = ({ slides }) => {
    const containerRef = useRef(null);
    const slidesRef = useRef([]);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const lightboxSlides = homeGalleryPhotos.map((photo) => ({
        src: photo.full,
        alt: photo.alt,
    }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            slidesRef.current.forEach((slide, index) => {
                if (!slide) return;

                gsap.fromTo(slide,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.8,
                        rotationY: 15,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: index * 0.15,
                        scrollTrigger: {
                            trigger: slide,
                            start: "top 85%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [slides]);

    const handleSlideClick = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div ref={containerRef}>
            <h2 className="text-2xl sm:text-3xl 2xl:text-[34px] text-white !leading-tight max-w-[900px] mx-auto mb-8 text-center text-balance">
                Ambientes que inspiram <span className="text-primary font-semibold">produtividade</span> e <span className="text-primary font-semibold">bem-estar</span>
            </h2>

            <Swiper
                slidesPerView={3.1}
                spaceBetween={30}
                breakpoints={{
                    0: { slidesPerView: 1.8, spaceBetween: 20 },
                    500: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 3.1, spaceBetween: 30 },
                }}
                className="!overflow-visible"
                loop={true}
                centeredSlides={true}
            >
                {homeGalleryPhotos.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="aspect-square cursor-pointer overflow-hidden group"
                            ref={el => slidesRef.current[index] = el}
                            onClick={() => handleSlideClick(index)}
                        >
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="60" viewBox="0 0 1024 1024" version="1.1">
                                    <path d="M428.447049 130.400932c-165.798117 0-300.69648 134.931109-300.69648 300.759925 0 165.798117 134.899386 300.69648 300.69648 300.69648 165.829839 0 300.728202-134.899386 300.728202-300.69648C729.175251 265.332041 594.274842 130.400932 428.447049 130.400932zM428.447049 672.01439c-132.821051 0-240.821811-108.032482-240.821811-240.853533 0-132.821051 108.032482-240.885256 240.821811-240.885256s240.853533 108.064204 240.853533 240.885256C669.331281 563.981908 561.267077 672.01439 428.447049 672.01439z"/>
                                    <path d="M872.861768 774.315334 763.127528 664.581094c-27.182083-27.182083-71.276347-27.182083-98.458429 0-27.182083 27.182083-27.182083 71.276347 0 98.458429l109.702518 109.733217c27.182083 27.212782 71.276347 27.212782 98.490152 0C900.011104 845.591681 900.011104 801.496393 872.861768 774.315334z"/>
                                </svg>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxSlides}
                index={lightboxIndex}
                styles={{
                    container: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                }}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio: 1.5,
                    scrollToZoom: true,
                }}
            />
        </div>
    );
};