# Matriz Office — Tocantins

Site institucional em React com Vite e Tailwind CSS. Inclui apresentação da marca, soluções, galerias, showrooms, perguntas frequentes e política de privacidade. O contato é feito pelos telefones e e-mails dos showrooms.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+ (ou versão posterior compatível).

```sh
npm ci
npm run dev
```

## Build e publicação

```sh
npm run build
npm run preview
```

O caminho de publicação é `/lp/referencia-em-mobiliario-corporativo-no-tocantins/`, configurado em `vite.config.js`. Publique o conteúdo de `dist/` nessa pasta da hospedagem. O servidor deve servir `index.html` como página padrão e redirecionar o endereço sem barra final para a mesma pasta com barra final.

O build gera a landing page estática. Os links de política de privacidade abrem a página externa https://matrizoffice.com/politica-de-privacidade em uma nova aba. Não é necessário configurar variáveis de ambiente ou banco de dados. `npm run preview` serve apenas para conferir o build localmente; abra o caminho completo indicado acima.

## Publicação automática na branch gh-pages

O workflow `.github/workflows/deploy.yml` executa a cada push na `main` e também pode ser iniciado manualmente em **Actions → Build and Deploy → Run workflow**, selecionando a `main`.

Ele instala as dependências com `npm ci`, gera o build e publica os arquivos de `dist/` na raiz da branch `gh-pages`. Usa o `GITHUB_TOKEN` automático com permissão `contents: write`, sem necessidade de criar um token adicional. A branch de destino é dedicada aos arquivos gerados: arquivos antigos são substituídos a cada publicação, sem apagar o histórico de commits.

O workflow atualiza a branch; o servidor que consome essa branch deve montar seu conteúdo em `/lp/referencia-em-mobiliario-corporativo-no-tocantins/`. A URL padrão de um projeto no GitHub Pages (`/<repositorio>/`) não corresponde a esse caminho. A publicação na branch não configura domínio, hospedagem ou esse mapeamento automaticamente.

## Estrutura

- `src/`: componentes, páginas, dados, imagens importadas e estilos.
- `public/`: imagens públicas, favicon, robots e sitemap.
- `index.html`: entrada da página inicial.

As preferências de cookies são salvas no navegador. O Google Tag Manager existente só é carregado após o aceite de cookies analíticos. O domínio do sitemap e de `public/llms.txt` deve acompanhar o domínio de publicação.
