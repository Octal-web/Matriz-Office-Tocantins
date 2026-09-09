import { Children, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Head = ({ children }) => {
    const elements = Children.toArray(children);
    const title = elements.find((element) => element.type === 'title')?.props.children;
    useEffect(() => { if (title) document.title = title; }, [title]);
    return createPortal(elements.filter((element) => element.type !== 'title'), document.head);
};
