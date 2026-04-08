/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                text: '#1d283a',
                background: '#ffffff',
                primary: '#F96939',
                secondary: '#f8fafc',
                accent: '#f59f0a',
                link: '#1d283a',
                danger: '#ff0000',
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    700: '#374151',
                    900: '#111827',
                },
            },
            fontSize: {
                sm: '0.750rem',
                base: '1rem',
                xl: '1.333rem',
                '2xl': '1.777rem',
                '3xl': '2.369rem',
                '4xl': '3.158rem',
                '5xl': '4.210rem',
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Poppins', 'sans-serif'],
            },
            fontWeight: {
                normal: '400',
                bold: '700',
            },
            width: {
                '45': '11.25rem',
            },
        },
    },
    plugins: [],
};
