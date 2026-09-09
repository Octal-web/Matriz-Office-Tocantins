import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Doubt = ({ index, doubt }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const questionId = `faq-question-${doubt.id ?? index}`;
    const answerId = `faq-answer-${doubt.id ?? index}`;

    return (
        <article className="overflow-hidden rounded-sm border border-neutral-200 bg-white transition-colors duration-300 hover:border-neutral-300">
            <h3>
                <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setIsOpen(current => !current)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 2xl:py-6"
                >
                    <span className="shrink-0 text-xs font-semibold tracking-widest text-primary">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1 text-base font-medium leading-snug text-neutral-900 sm:text-lg tracking-tighter sm:tracking-tight md:tracking-normal">
                        {doubt.title}
                    </span>

                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-300">
                        <ChevronDown
                            size={17}
                            aria-hidden="true"
                            className={`text-neutral-700 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </span>
                </button>
            </h3>

            <div
                id={answerId}
                ref={contentRef}
                role="region"
                aria-labelledby={questionId}
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : '0px',
                }}
            >
                <div className="border-t border-neutral-100 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
                    <p className="max-w-5xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                        {doubt.text}
                    </p>
                </div>
            </div>
        </article>
    );
};
