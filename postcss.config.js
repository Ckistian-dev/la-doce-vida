// postcss.config.js - Para Tailwind CSS v3
export default { // ou module.exports = { se o seu arquivo original usava CommonJS
  plugins: {
    tailwindcss: {}, // Você pode também especificar o caminho da config: tailwindcss: { config: './tailwind.config.js' }, mas geralmente não é necessário.
    autoprefixer: {},
  },
};