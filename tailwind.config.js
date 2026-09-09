import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            container: {
                center: true,
                padding: '5%',
            },
            maxWidth: {
                small: '64rem',
                medium: '94rem',
                large: '104rem',
            },
            spacing: {
                '15': '3.75rem',
                '30': '7rem',
                '40': '9.375rem',
                '50': '12.5rem',
            },
            colors: {
                primary: '#E0D3A8',
                secondary: '',
            },
            keyframes: {
                'fade-in-down': {
                    '0%': { opacity: '0', transform: 'translate3d(0,-100px,0)' },
                    '100%': { opacity: '1', transform: 'none' },
                }
            },
            animation: {
                'fade-in-down': 'fade-in-down 200ms linear'
            },
        },
    },

    plugins: [
        function({ addComponents }) {
            addComponents({
                'p + p': {
                    marginTop: '1rem',
                },
            })
        }
    ],
};
