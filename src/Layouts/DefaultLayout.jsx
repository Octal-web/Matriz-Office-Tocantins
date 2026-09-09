import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Head } from '@/Components/Head';
import { getCookie } from '@/cookies';
import { sitePath, absoluteSiteUrl, isHomePage } from '@/urls';

import logoWhite from '@/assets/logo.png';
import logoFooter from '@/assets/logo-footer.png';

import { CustomLink } from '@/Components/CustomLink';

import { homeShowrooms } from '@/Data/homeShowrooms';
import { homeDoubts } from '@/Data/homeDoubts';

const CookieModal = lazy(() =>
    import('@/Components/CookieModal').then((module) => ({
        default: module.CookieModal,
    }))
);

const DefaultLayout = ({
    children,
    title = 'Matriz Office – Mobiliário Corporativo em Goiânia e Palmas',
    description = 'A Matriz Office é especialista em mobiliário corporativo de alto padrão. Soluções completas para escritórios em Goiânia (GO) e Palmas (TO). Peça seu orçamento!'
}) => {

    const [isAtTop, setIsAtTop] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(() => getCookie('notify-cookies') === '1' && getCookie('reject-cookies') !== '1');

    const lenisRef = useRef(null);
    const gtmLoadedRef = useRef(false);

    useEffect(() => {
        let cancelled = false;
        let rafId = null;

        const initLenis = async () => {
            if (typeof window === 'undefined') {
                return;
            }

            const isDesktop = window.matchMedia('(min-width: 1280px)').matches;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (!isDesktop || prefersReducedMotion) {
                return;
            }

            const { default: Lenis } = await import('lenis');

            if (cancelled) {
                return;
            }

            lenisRef.current = new Lenis({
                duration: 1,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                smooth: true,
                smoothTouch: false,
            });

            const raf = (time) => {
                if (lenisRef.current) {
                    lenisRef.current.raf(time);
                    rafId = requestAnimationFrame(raf);
                }
            };

            rafId = requestAnimationFrame(raf);
        };

        initLenis();

        return () => {
            cancelled = true;

            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) {
                return;
            }

            ticking = true;

            window.requestAnimationFrame(() => {
                const nextIsAtTop = window.scrollY <= 140;

                setIsAtTop((current) => {
                    if (current === nextIsAtTop) {
                        return current;
                    }

                    return nextIsAtTop;
                });

                ticking = false;
            });
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((current) => !current);
    };

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        if (!trackingEnabled || gtmLoadedRef.current) {
            return;
        }

        let idleId = null;
        let timeoutId = null;

        const loadGtm = () => {
            if (gtmLoadedRef.current) {
                return;
            }

            gtmLoadedRef.current = true;

            const script = document.createElement('script');

            script.innerHTML = `
                (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WQCW52GK');
            `;

            document.head.appendChild(script);

            const noscript = document.createElement('noscript');

            noscript.innerHTML = `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQCW52GK" height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `;

            document.body.appendChild(noscript);
        };

        if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(loadGtm, { timeout: 3000 });
        } else {
            timeoutId = window.setTimeout(loadGtm, 2500);
        }

        return () => {
            if (idleId && 'cancelIdleCallback' in window) {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [trackingEnabled]);

    const localBusinessSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "FurnitureStore"],
        "name": "Matriz Office",
        "description": "Especialistas em mobiliário corporativo de alto padrão para escritórios.",
        "url": absoluteSiteUrl(),
        "logo": {
            "@type": "ImageObject",
            "url": absoluteSiteUrl('site/img/logo.png')
        },
        "image": absoluteSiteUrl('content/display/main-bg.jpg'),
        "email": "contato@matrizoffice.com.br",
        "priceRange": "$$",
        "sameAs": [],
        "address": homeShowrooms.map(s => ({
            "@type": "PostalAddress",
            "addressLocality": s.city,
            "addressRegion": s.state,
            "addressCountry": "BR",
            "streetAddress": s.address.replace('\n', ', ')
        })),
        "contactPoint": homeShowrooms.map(s => ({
            "@type": "ContactPoint",
            "telephone": s.phone,
            "contactType": "customer service",
            "areaServed": s.city,
            "availableLanguage": "Portuguese"
        })),
        "hasMap": homeShowrooms.map(s => s.mapUrl),
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            }
        ]
    }), []);

    const faqSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": homeDoubts.map(item => ({
            "@type": "Question",
            "name": item.title,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.text
            }
        }))
    }), []);

    const organizationSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Matriz Office",
        "url": absoluteSiteUrl(),
        "logo": {
            "@type": "ImageObject",
            "url": absoluteSiteUrl('site/img/logo.png')
        },
        "email": "contato@matrizoffice.com.br",
        "contactPoint": homeShowrooms.map(s => ({
            "@type": "ContactPoint",
            "telephone": s.phone,
            "contactType": "customer service",
            "areaServed": s.city,
            "availableLanguage": "Portuguese"
        })),
        "sameAs": []
    }), []);

    const menuItems = [
        { name: "A Matriz Office", to: "#sobre", label: "Saiba mais sobre a Matriz Office", external: false },
        { name: "Nossas Soluções", to: "#solucoes", label: "Confira nossas soluções", external: false },
        { name: "Onde Encontrar", to: "#onde-encontrar", label: "Onde encontrar a Matriz Office", external: false },
    ];

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <meta property="og:url" content={window.location.origin + window.location.pathname} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={absoluteSiteUrl('content/display/main-bg.jpg')} />

                <meta name="robots" content="index, follow" />
                <meta name="author" content="Octal Web" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || ''} />
                <meta name="twitter:image" content={absoluteSiteUrl('content/display/main-bg.jpg')} />

                <link rel="icon" href={sitePath('favicon.ico')} type="image/x-icon" />

                <script type="application/ld+json">
                    {JSON.stringify(localBusinessSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Head>

            <header className={`header fixed top-0 left-0 right-0 z-[20] transition-all duration-300 ease-in-out ${!isAtTop || !isHomePage() ? ' bg-black shadow-2xl shadow-black/10' : ''}`}>
                <div
                    className={`fixed inset-0 bg-black xl:hidden duration-300 ease-out ${isMenuOpen ? 'opacity-30' : 'opacity-0 h-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                <div className="container max-w-large">
                    <div className="flex items-center justify-between">
                        <div className="relative z-[1] flex items-center justify-between w-full my-5 xl:my-7 2xl:my-8">
                            <h1 className="flex items-center">
                                <a href={sitePath()} className="flex items-center">
                                    <img
                                        src={logoWhite}
                                        alt="Logo"
                                        width="220"
                                        height="80"
                                        decoding="async"
                                        className="block h-auto w-[120px] lg:w-[180px] xl:w-[200px]"
                                    />
                                </a>
                            </h1>

                            <button
                                className={`fixed top-0 left-0 w-screen h-screen xl:hidden bg-black transition-all ${isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                                aria-label="Close Menu"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            <div className={`fixed xl:relative bg-black bg-opacity-70 max-xl:backdrop-blur-sm xl:bg-transparent left-0 ${!isMenuOpen ? '-top-1 max-xl:-translate-y-full' : 'top-0'} xl:left-auto xl:top-auto flex flex-col xl:flex-row xl:items-center justify-center xl:justify-end w-full h-[calc(100vh_/6_*_5)] xl:h-auto xl:my-0.5 2xl:my-1.5 transition-all ease-out duration-500`}>
                                <nav className="relative">
                                    <ul className="flex flex-col xl:flex-row items-center xl:justify-center gap-5 xl:gap-10 relative lg:mr-5 2xl:mr-0">
                                        {menuItems.map((item) => (
                                            <li key={item.name}>
                                                {item.external ? (
                                                    <a
                                                        href={item.url}
                                                        className="text-lg xl:text-base text-white font-medium transition-all hover:opacity-80"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={item.name}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ) : (
                                                    <CustomLink
                                                        to={item.to}
                                                        className="text-lg xl:text-base text-white font-medium transition-all hover:opacity-80"
                                                        onClick={() => setIsMenuOpen(false)}
                                                        aria-label={item.name}
                                                    >
                                                        {item.name}
                                                    </CustomLink>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            <button className="xl:hidden relative z-[2]" onClick={toggleMenu} aria-label="Toggle Menu">
                                <div className="flex items-center">
                                    <div className="relative w-7 h-[21px]">
                                        <div className={`absolute top-0 bg-white h-[2px] w-7 transition-all duration-300 ${isMenuOpen ? 'rotate-45 !top-[10px]' : ''}`} />
                                        <div className={`absolute top-[9px] bg-white h-[2px] w-7 transition-all duration-300 ${isMenuOpen ? 'scale-x-0 !top-[10px]' : ''}`} />
                                        <div className={`absolute bottom-0 bg-white h-[2px] w-7 transition-all duration-300 ${isMenuOpen ? '-rotate-45 bottom-[9px]' : ''}`} />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="overflow-hidden">
                {children}
            </main>

            <footer className="bg-neutral-950 pt-12 lg:pt-10 pb-4">
                <div className="container max-w-large">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1fr_1fr] md:gap-12 lg:items-start mb-6">
                        <div className="flex items-start md:pt-10">
                            <img
                                src={logoFooter}
                                alt="Matriz Office"
                                width="220"
                                height="80"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        {homeShowrooms.map((showroom) => (
                            <address
                                key={showroom.id}
                                className="not-italic text-sm leading-snug text-neutral-300"
                            >
                                <h2 className="mb-3 text-lg font-semibold text-white">
                                    {showroom.city} ({showroom.state})
                                </h2>

                                <div className="space-y-2">
                                    <p>
                                        <strong className="font-semibold text-white">Endereço:</strong>{' '}
                                        <a
                                            href={showroom.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-colors hover:text-primary"
                                        >
                                            {showroom.building} —{' '}
                                            <span className="whitespace-pre-line tracking-tighter">{showroom.address}</span>
                                        </a>
                                    </p>

                                    <p>
                                        <strong className="font-semibold text-white">Telefone:</strong>{' '}
                                        <a
                                            href={`tel:${showroom.phone.replace(/\D/g, '')}`}
                                            className="transition-colors hover:text-primary"
                                        >
                                            {showroom.phone}
                                        </a>
                                    </p>

                                    <p>
                                        <strong className="font-semibold text-white">E-mail:</strong>{' '}
                                        <a
                                            href={`mailto:${showroom.email}`}
                                            className="break-all transition-colors hover:text-primary"
                                        >
                                            {showroom.email}
                                        </a>
                                    </p>

                                    <p>
                                        <strong className="font-semibold text-white">
                                            Horário de funcionamento:
                                        </strong>{' '}
                                        {showroom.openingHours}
                                    </p>
                                </div>
                            </address>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="container max-w-large flex flex-col gap-3 pt-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
                        <p>© {new Date().getFullYear()} Matriz Office. Todos os direitos reservados.</p>

                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            <a href="https://matrizoffice.com/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                                Política de Privacidade
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            <Suspense fallback={null}>
                <CookieModal acceptCookies={acceptCookies} visible />
            </Suspense>
        </>
    );
};

export default DefaultLayout;
