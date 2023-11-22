/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            'inter': ['Inter', 'sans-serif']
        },
        colors: {
            'electron-primary-dark-blue': '#0E1120',
            'electron-primary-white': '#FFFFFF',
            'electron-primary-grey': '#afafaf',
            'electron-input-bg': '#262836',
            'electron-input-border': 'rgba(240, 240, 240, 0.05)',
            'electron-gradient-light-blue': '#4AA8FF',
            'electron-gradient-eye-blue': '#00F0FF',
            'electron-button-bg-blue': '#2287FD',
        },
        extend: {},
    },
    plugins: [],
}

