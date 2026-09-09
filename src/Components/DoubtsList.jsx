import React from 'react';

import { homeDoubts } from '@/Data/homeDoubts';
import { Doubt } from './Doubt';
import { Reveal } from './Reveal';

export const DoubtsList = () => (
    <section id="perguntas-frequentes" className="py-20 sm:py-24">
        <div className="container max-w-large">
            <Reveal direction="bottom">
                <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl">
                        Perguntas Frequentes sobre{' '}
                        <span className="text-neutral-500">
                            Mobiliário Corporativo, Ergonomia e Projetos para Escritórios
                        </span>
                    </h2>

                    <p className="max-w-md text-sm leading-relaxed text-neutral-500 lg:text-right">
                        Encontre respostas sobre projetos, ergonomia, mobiliário e o processo de atendimento da Matriz Office.
                    </p>
                </div>
            </Reveal>

            <div className="space-y-3">
                {homeDoubts.map((doubt, index) => (
                    <Reveal
                        key={doubt.id}
                        direction="bottom"
                        delay={Math.min(index * 0.04, 0.2)}
                    >
                        <Doubt index={index} doubt={doubt} />
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
