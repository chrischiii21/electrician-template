/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                text: '#0f0302',
                background: '#ffffff',
                primary: '#1E2023',
                secondary: '#2B2D30',
                accent: '#D52212',
                // New color palette
                'brand-blue': '#0066CC',
                'brand-orange': '#FF6B35',
                'brand-green': '#00A878',
                'brand-purple': '#7B2CBF',
                'brand-yellow': '#FFB627',
                'neutral-50': '#F9FAFB',
                'neutral-100': '#F3F4F6',
                'neutral-200': '#E5E7EB',
                'neutral-300': '#D1D5DB',
                'neutral-400': '#9CA3AF',
                'neutral-500': '#6B7280',
                'neutral-600': '#4B5563',
                'neutral-700': '#374151',
                'neutral-800': '#1F2937',
                'neutral-900': '#111827',
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
