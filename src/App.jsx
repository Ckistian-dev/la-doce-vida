import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';

// Componente para o ícone do WhatsApp
const WhatsAppIcon = () => {
  // Número de telefone no formato internacional (país + ddd + número)
  const phoneNumber = '5545998592776';
  // Mensagem padrão
  const message = 'Olá, gostaria de fazer um pedido!';
  // Codifica a mensagem para ser usada em uma URL
  const encodedMessage = encodeURIComponent(message);
  // Monta a URL final do WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    // O link que envolve o ícone
    <motion.a
      href={whatsappUrl}
      target="_blank" // Abre em uma nova aba
      rel="noopener noreferrer" // Boas práticas de segurança para links externos
      aria-label="Conversar no WhatsApp"
      // Estilização com TailwindCSS: fixo, no canto, com z-index alto, cor do WhatsApp, etc.
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      // Animação ao passar o mouse
      whileHover={{ scale: 1.1, rotate: 5 }}
      // Animação ao clicar
      whileTap={{ scale: 0.95 }}
      // Animação contínua para chamar atenção
      animate={{
        scale: [1, 1.05, 1], // Efeito de pulsar
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity, // Repete a animação infinitamente
        repeatType: 'loop',
      }}
    >
      {/* Ícone do WhatsApp em SVG para não depender de imagens externas */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    </motion.a>
  );
};


function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'menu':
        return <MenuPage />;
      case 'about':
        return <AboutPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-brand-cream text-brand-brown flex flex-col min-h-screen">
      <Navbar setPage={setPage} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      {/* Adicionamos o ícone aqui, fora do conteúdo principal para que ele sobreponha tudo */}
      <WhatsAppIcon />
    </div>
  );
}

export default App;
