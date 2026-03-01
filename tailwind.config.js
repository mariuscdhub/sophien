/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00F0FF',
                'primary-dim': 'rgba(0,240,255,0.15)',
                'space-bg': '#050B14',
                'surface': 'rgba(5,11,20,0.85)',
                'surface-card': 'rgba(15,34,35,0.6)',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'sans-serif'],
                tech: ['"Rajdhani"', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            boxShadow: {
                'cyan-glow': '0 0 20px rgba(0,240,255,0.4)',
                'cyan-glow-lg': '0 0 40px rgba(0,240,255,0.3)',
                'modal': '0 -10px 60px -10px rgba(0,240,255,0.15)',
            },
        },
    },
    plugins: [],
}
