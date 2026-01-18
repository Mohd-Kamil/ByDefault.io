/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                background: 'rgb(16, 16, 16)',
                foreground: 'rgb(234, 239, 255)',
            }
        },
    },
    plugins: [],
}
