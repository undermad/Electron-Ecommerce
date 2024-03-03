/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            'inter': ['Inter', 'sans-serif']
        },
        colors: {
            'electron-primary-dark-blue': '#0E1120',
            'electron-primary-disabled-dark-blue': '#2f2f2f',
            'electron-primary-white': '#FFFFFF',
            'electron-primary-grey': '#afafaf',
            'electron-light-grey': '#F6F6F6',
            'electron-grey': '#E9E9E9',
            'electron-input-bg': '#262836',
            'electron-input-border': 'rgba(240, 240, 240, 0.05)',
            'electron-input-grey': '#D0D5DD',
            'electron-label-grey': '#344054',
            'electron-gradient-light-blue': '#4AA8FF',
            'electron-gradient-eye-blue': '#00F0FF',
            'electron-button-bg-blue': '#2287FD',
            'electron-placeholder-grey':'#667085',
            'electron-input-ash-blue':'#484C60',
            'electron-error':'#f40000',
            'electron-header-font': '#101828',
            'electron-current-page': '#1D2939',
            'electron-other-page': '#475467',
            'black':'#000',
            'electron-product-listing-bg':'#e6e6e6',
            'electron-bg-grey': '#F9FAFB',
            'electron-pay':'#FFC539',
            'electron-green':'#027A48',
            'electron-very-light-green':'#ECFDF3',
            'electron-very-light-blue':'#f5f8ff',
            'electron-light-blue':'#026AA2',
            'electron-bright-blue':'#ebf3ff'
        },
        extend: {},
    },
    plugins: [],
}

