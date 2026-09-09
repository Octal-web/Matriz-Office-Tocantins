import { sitePath } from '@/urls';

export const homeShowrooms = [
    {
        id: 'goiania',
        city: 'Goiânia',
        state: 'GO',
        tag: 'Goiânia — GO',
        building: 'Edifício Office Flamboyant',
        address: 'Av. Dep. Jamel Cecílio, 3310\nJardim Goiás – Goiânia/GO',
        mapUrl: 'https://maps.app.goo.gl/nqGUG18qqQUtEi9aA',
        phone: '(62) 3920-3615',
        email: 'contato@matrizoffice.com.br',
        openingHours: 'Segunda a sexta, das 08h às 18h',
        description:
            'Espaço destinado à apresentação de soluções corporativas, acabamentos, estações de trabalho, salas de reunião, ambientes colaborativos e mobiliário executivo.',
        images: [
            sitePath('content/showrooms/goiania-1.jpg'),
            sitePath('content/showrooms/goiania-2.jpg'),
            sitePath('content/showrooms/goiania-3.jpg'),
        ],
    },
    {
        id: 'palmas',
        city: 'Palmas',
        state: 'TO',
        tag: 'Palmas — TO',
        building: 'Plano Diretor Sul',
        address: 'Q. 104 Sul, Avenida LO 1, Lote 26, Sala 02\nPlano Diretor Sul – Palmas/TO',
        mapUrl: 'https://maps.app.goo.gl/3PmHZKQGWMFu4oeTA',
        phone: '(63) 3225-5700',
        email: 'contato@matrizoffice.com.br',
        openingHours: 'Segunda a sexta, das 08h às 18h',
        description:
            'Ambiente projetado para apresentar soluções corporativas completas — materiais, ergonomia, tecnologia e possibilidades de personalização para escritórios.',
        images: [
            sitePath('content/showrooms/palmas-1.jpg'),
            sitePath('content/showrooms/palmas-2.jpg'),
        ],
    },
];