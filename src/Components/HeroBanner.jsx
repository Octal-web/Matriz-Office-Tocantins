import React, { useEffect, useRef } from 'react';
import { CustomLink } from '@/Components/CustomLink';
import { sitePath } from '@/urls';

export const HeroBanner = () => {
    const sectionRef = useRef(null);
    const heroImgRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroButtonRef = useRef(null);

    useEffect(() => {
        let context;
        let cancelled = false;

        const runAnimation = async () => {
            if (typeof window === 'undefined') {
                return;
            }

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                return;
            }

            const [{ gsap }, { ScrollTrigger }] = await Promise.all([
                import('gsap'),
                import('gsap/ScrollTrigger'),
            ]);

            if (cancelled) {
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            context = gsap.context(() => {
                if (heroImgRef.current) {
                    gsap.fromTo(
                        heroImgRef.current,
                        { yPercent: 0 },
                        {
                            yPercent: 0,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: true,
                            },
                        }
                    );
                }

                if (heroTextRef.current) {
                    gsap.fromTo(
                        heroTextRef.current,
                        { y: 18, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.55,
                            delay: 0.15,
                            ease: 'power2.out',
                        }
                    );
                }

                if (heroButtonRef.current) {
                    gsap.fromTo(
                        heroButtonRef.current,
                        { y: 14, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.45,
                            delay: 0.28,
                            ease: 'power2.out',
                        }
                    );
                }
            }, sectionRef);

            ScrollTrigger.refresh();
        };

        runAnimation();

        return () => {
            cancelled = true;

            if (context) {
                context.revert();
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            <picture>
                <source
                    media="(max-width: 767px)"
                    srcSet={sitePath('content/display/main-bg-mobile.jpg')}
                    type="image/jpeg"
                />

                <img
                    ref={heroImgRef}
                    src={sitePath('content/display/main-bg.jpg')}
                    alt=""
                    width="1920"
                    height="1080"
                    fetchpriority="high"
                    decoding="sync"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-60 sm:opacity-100"
                />
            </picture>

            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="absolute bottom-0 left-0 top-0 w-full bg-gradient-to-r from-black/95 from-20% via-black/55 to-black/20 lg:w-3/4 lg:to-transparent" />

            <div className="relative container max-w-large">
                <div className="grid min-h-[100svh] grid-cols-1 items-end gap-10 pb-12 pt-28 md:min-h-[84vh] md:pb-[4%] lg:items-end lg:gap-12 2xl:min-h-[78vh] 2xl:pb-[5%]">
                    <div className="max-w-4xl md:ml-2">
                        <h1 className="mb-6 text-3xl leading-tight text-white sm:text-4xl 2xl:text-[44px]">
                            <span className="inline sm:block">
                                Soluções em <span className="font-semibold">Mobiliário</span>{' '}
                            </span>

                            <span className="inline sm:block">
                                <span className="font-semibold">Corporativo</span> para Escritórios{' '}
                            </span>

                            <span className="inline sm:block">
                                que <span className="font-semibold text-primary">Evoluem</span> com o seu Negócio
                            </span>
                        </h1>

                        <div
                            ref={heroTextRef}
                            className="mb-8 max-w-[715px] text-balance text-sm font-light leading-normal text-white sm:mb-11 sm:text-base xl:text-lg 2xl:text-xl"
                        >
                            <p>
                                A Matriz Office desenvolve soluções completas para ambientes corporativos, unindo mobiliário, planejamento de espaços e personalização para criar escritórios mais funcionais, produtivos e alinhados à realidade de cada empresa.
                            </p>
                        </div>

                        <div
                            ref={heroButtonRef}
                            className="flex flex-wrap gap-4 sm:gap-6"
                        >
                            <CustomLink
                                to="#solucoes"
                                className="w-full max-w-xs border border-primary bg-transparent px-8 py-3 text-center text-sm font-semibold uppercase text-white transition-colors duration-300 hover:bg-primary hover:text-black sm:py-4 sm:tracking-wider"
                            >
                                Conheça nossas soluções
                            </CustomLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
