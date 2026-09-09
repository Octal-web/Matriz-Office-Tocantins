import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = '/lp/referencia-em-mobiliario-corporativo-no-tocantins/';

const redirectToDirectory = (server) => {
    server.middlewares.use((request, response, next) => {
        const url = new URL(request.url, 'http://localhost');
        if (url.pathname === base.slice(0, -1)) {
            response.writeHead(308, { Location: base + url.search });
            response.end();
            return;
        }
        next();
    });
};

export default defineConfig({
    base,
    plugins: [react(), {
        name: 'base-directory-redirect',
        configureServer: redirectToDirectory,
        configurePreviewServer: redirectToDirectory,
    }],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
