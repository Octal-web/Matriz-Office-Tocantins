import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { homeSolutions } from '@/Data/homeSolutions';
import { Reveal } from './Reveal';
import { SolutionsSlides } from './SolutionsSlides';

export const Solutions = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        gsap.from(cardsRef.current, {
            scrollTrigger: {
                trigger: cardsRef.current[0]?.parentElement,
                start: 'top 75%',
            },
            opacity: 0,
            y: 80,
            rotateY: 90,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
        });
    }, []);

    return (
        <section className="bg-black py-20 md:py-24 scroll-mt-20" id="solucoes">
            <div className="container max-w-large">
                <Reveal direction="bottom">
                    <h1 className="text-3xl sm:text-4xl 2xl:text-[44px] text-white !leading-tight max-w-[900px] mx-auto mb-6 text-center tracking-tighter sm:tracking-normal">Soluções para <span className="text-primary font-semibold">Todos os <br className="max-sm:hidden" /></span><span className="font-semibold">Ambientes Corporativos</span></h1>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-8 mt-8 sm:mt-12 mb-20 2xl:mb-30">
                    {homeSolutions.map((solution, index) => (
                        <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)] xl:w-[calc(20%-1.6rem)] bg-white/10 py-5 px-2 sm:p-6 transition-colors duration-300">
                            <div className="mx-10">
                                <img src={solution.src} alt={solution.name} className="w-full h-auto mb-2 2xl:mb-4" />
                            </div>

                            <h2 className="text-base md:text-lg 2xl:text-xl text-white text-center font-semibold md:px-1">
                                {solution.name}
                            </h2>
                        </div>
                    ))}
                </div>

                <SolutionsSlides />
            </div>
        </section>
    );
};