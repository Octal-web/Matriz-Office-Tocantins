import { homeBrands } from '@/Data/homeBrands';
import { Reveal } from './Reveal';
import { BrandCard } from './BrandCard';

export const Brands = () => (
    <section className="py-20 border-t border-neutral-800" id="marcas">
        <div className="container max-w-large">
            <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-12 lg:gap-20">

                <Reveal direction="bottom">
                    <div className="">
                        <h2 className="text-4xl font-semibold sm:leading-snug tracking-tight sm:tracking-normal mb-6">
                            Parcerias que Impulsionam <span className="text-primary">Excelência</span>
                        </h2>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                            A Matriz Office trabalha com fabricantes reconhecidos nacionalmente pela qualidade, inovação, ergonomia e desempenho em ambientes corporativos. Isso permite entregar projetos completos, desde estações de trabalho e áreas colaborativas até salas executivas, auditórios, arquivos deslizantes e cabines acústicas.
                        </p>
                    </div>
                </Reveal>

                <div className="flex flex-col">
                    {homeBrands.map((brand, i) => (
                        <BrandCard key={brand.id} {...brand} index={i} />
                    ))}
                    <div className="border-t border-neutral-800" />
                </div>

            </div>
        </div>
    </section>
);