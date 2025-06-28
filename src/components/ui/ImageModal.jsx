import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageModal = ({ imageUrl, onClose }) => {
  // Não renderiza nada se não houver imagem selecionada
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      {/* O overlay de fundo escuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Fecha o modal ao clicar no fundo
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
        style={{ cursor: 'zoom-out' }}
      >
        {/* O container da imagem com animação de zoom */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          onClick={(e) => e.stopPropagation()} // Impede que o modal feche ao clicar na própria imagem
          className="relative"
          style={{ cursor: 'default' }}
        >
          <img 
            src={imageUrl} 
            alt="Produto Ampliado" 
            className="block w-auto h-auto max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl" 
          />
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white text-brand-brown rounded-full p-2 hover:bg-brand-pink hover:text-white transition-colors shadow-lg"
            aria-label="Fechar imagem"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
