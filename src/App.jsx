import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';

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
    </div>
  );
}

export default App;
