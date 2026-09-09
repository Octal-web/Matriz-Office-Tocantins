import { sitePath } from '@/urls';

export const homeBrands = [
    {
        id: 'bortolini',
        name: 'Bortolini',
        logo: sitePath('content/brands/bortolini.png'),
        highlight: 'Principal parceira da Matriz Office',
        description:
            'Uma das maiores referências brasileiras em mobiliário corporativo. Com mais de 77 anos de história, oferece soluções completas para escritórios, ambientes colaborativos, recepções, salas de reunião e espaços corporativos completos.',
        url: 'https://www.bortolini.com.br',
    },
    {
        id: 'cavaletti',
        name: 'Cavaletti',
        logo: sitePath('content/brands/cavaletti.png'),
        highlight: 'Referência em ergonomia e conforto',
        description:
            'Referência nacional em cadeiras corporativas, ergonomia e conforto para ambientes profissionais. Soluções Cavaletti em projetos que exigem alta performance e bem-estar para as equipes.',
        url: 'https://www.cavaletti.com.br',
    },
];