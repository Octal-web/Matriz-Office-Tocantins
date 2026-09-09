
import { homeShowrooms } from '@/Data/homeShowrooms';
import { Reveal } from './Reveal';
import { ShowroomCard } from './ShowroomCard';

export const Showrooms = () => (
    <section className="bg-neutral-900 py-16 sm:py-20 scroll-mt-20" id="onde-encontrar">
        <div className="container max-w-large">

            <Reveal direction="bottom">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-8 2xl:mb-12">
                    <h2 className="text-white text-3xl sm:text-4xl font-semibold leading-tight max-w-xl text-balance">
                        Conheça os Showrooms da{' '}
                        <span className="text-neutral-400">Matriz Office</span>
                    </h2>

                    <p className="text-neutral-300 sm:text-neutral-400 text-sm leading-relaxed max-w-md lg:text-right">
                        Mais do que apresentar soluções em mobiliário corporativo, oferecemos
                        espaços onde empresas, arquitetos e gestores conhecem de perto
                        materiais, acabamentos, ergonomia e possibilidades para seus ambientes.
                    </p>
                </div>
            </Reveal>

            <Reveal direction="bottom" delay={0.1}>
                <p className="text-neutral-400 sm:text-neutral-500 text-sm leading-relaxed border-l-2 border-neutral-700 pl-5 mb-12 max-w-3xl">
                    Com unidades em Goiânia (GO) e Palmas (TO), nossa equipe auxilia desde a
                    definição do layout até a especificação completa do mobiliário — garantindo
                    que cada projeto seja desenvolvido de acordo com as necessidades da operação,
                    da cultura e dos objetivos de cada empresa.
                </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {homeShowrooms.map((store, i) => (
                    <Reveal key={store.id} direction="bottom" delay={i * 0.15}>
                        <ShowroomCard {...store} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);