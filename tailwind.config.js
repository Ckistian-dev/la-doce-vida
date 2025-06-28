/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#E6C0C0',
        'brand-brown': '#5D4037',
        'brand-cream': '#FDF8F5',
        'brand-gold': '#D4AF37',
      },
      fontFamily: {
        // Lembre-se de importar estas fontes no seu index.html
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
