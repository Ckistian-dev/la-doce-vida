import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// --- Variantes de Animação para o Menu que Expande para Baixo ---

// Animação para o container do menu (expande a altura)
const mobileMenuContainerVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
      when: "afterChildren", // Garante que o container colapse depois que os filhos sumirem
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeIn',
      duration: 0.3,
      when: "beforeChildren", // Garante que o container expanda antes dos filhos aparecerem
    },
  },
};

// Animação para cada item da lista (aparecem de cima para baixo)
const mobileMenuItemVariants = {
  hidden: {
    opacity: 0,
    y: -20, // Começa um pouco acima
  },
  visible: (i) => ({ // 'i' é o índice do item, passado como propriedade custom
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08, // Atraso em cascata para cada item
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  }),
};


const Navbar = ({ setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: 'Início', page: 'home' },
    { label: 'Cardápio', page: 'menu' },
    { label: 'Sobre Nós', page: 'about' },
  ];
  
  return (
    // O header é 'isolate' para criar um novo contexto de empilhamento para o z-index
    <header className="bg-brand-cream/80 backdrop-blur-sm sticky top-0 z-30 font-sans isolate">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => setPage('home')} className="flex items-center space-x-2 ml-2">
           <img src="https://i.ibb.co/YTfpTSSd/3917ab0e-60fd-4754-a5b3-11859f92c129.png" alt="La Doce Vida Logo" className="h-16 w-auto" />
        </button>

        {/* Links para Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button key={link.page} onClick={() => setPage(link.page)} className="text-brand-brown hover:text-brand-pink transition-colors duration-300 font-serif text-lg">
              {link.label}
            </button>
          ))}
        </div>

        {/* Ícones da Direita */}
        <div className="flex items-center space-x-4">
          {/* Ícone do Carrinho */}
          <button onClick={() => setPage('checkout')} className="relative text-brand-brown hover:text-brand-pink transition-colors duration-300">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          
          {/* Botão do Menu Mobile (Hamburguer) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="relative top-0.5 text-brand-brown z-50"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Container do Menu Mobile que Expande */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu-dropdown"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              // O menu agora é posicionado de forma absoluta abaixo do header
              className="md:hidden absolute top-full left-0 w-full bg-brand-cream/80 backdrop-blur-sm overflow-hidden isolate"
            >
              {/* Lista de links, alinhada à direita */}
              <div className="flex flex-col items-end py-4 px-6">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.page}
                    custom={i}
                    variants={mobileMenuItemVariants}
                    className="w-full flex justify-end"
                  >
                    <button
                      onClick={() => { setPage(link.page); setIsMobileMenuOpen(false); }}
                      className="text-brand-brown hover:text-brand-pink w-auto text-right font-serif text-2xl py-3 px-2 transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
