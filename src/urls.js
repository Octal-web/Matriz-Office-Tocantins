export const sitePath = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const absoluteSiteUrl = (path = '') => new URL(sitePath(path), window.location.origin).href;

export const isHomePage = () => window.location.pathname.replace(/\/+$/, '') === sitePath().replace(/\/+$/, '');
