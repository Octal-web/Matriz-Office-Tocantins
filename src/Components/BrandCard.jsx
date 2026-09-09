import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export const BrandCard = ({ name, logo, highlight, description, url, index }) => (
    <Reveal direction="bottom" delay={index * 0.15}>
        <div className="flex flex-col sm:flex-row gap-6 py-6 2xl:py-8 border-t border-neutral-800 group">

            <div className="shrink-0 w-full sm:w-40 flex items-center">
                <img
                    src={logo}
                    alt={`Logo ${name}`}
                    className="max-h-40 max-w-40 object-contain"
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col gap-3 flex-1">
                <p className=" text-xs font-semibold tracking-widest uppercase">
                    {highlight}
                </p>
                <p className="text-neutral-700 text-sm leading-relaxed">
                    {description}
                </p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium mt-1
                               group/link w-fit"
                >
                    <span className="underline underline-offset-4 decoration-neutral-600 group-hover/link:decoration-white transition-colors duration-200">
                        Saiba mais sobre a {name}
                    </span>
                    <ArrowRight
                        size={14}
                        className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-200"
                    />
                </a>
            </div>
        </div>
    </Reveal>
);
