import { Reveal } from './Reveal';
import { sitePath } from '@/urls';

export const MoreAbout = () => {
    return (
        <section className="py-20 scroll-mt-20" id="sobre">
            <div className="container max-w-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xl:gap-12 items-center">
                    <Reveal direction="right">
                        <img
                            src={sitePath('content/display/more-img.jpg')}
                            alt="Sobre a Matriz Office"
                            loading="lazy"
                            decoding="async"
                            width="720"
                            height="720"
                            className="h-auto w-full"
                        />
                    </Reveal>

                    <div className="border-l-2 border-primary overflow-hidden">
                        <Reveal direction="left" className="pl-4 xl:pl-10" delay={0.2}>
                            <h2 className="text-3xl 2xl:text-5xl text-balance font-bold mb-4">Mais do que fornecer móveis,</h2>
                            <p className="xl:text-xl max-w-[600px] text-gray-700 leading-relaxed text-balance">
                                ajudamos organizações a transformar seus ambientes de trabalho em espaços preparados para colaborar, crescer e receber pessoas com conforto, eficiência e identidade.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};
