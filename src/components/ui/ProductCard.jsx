import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Check } from 'lucide-react';

// CORREÇÃO: Adicionamos um valor padrão para 'onProductSelect' e 'onImageClick'
// para evitar erros caso um componente pai não passe essas funções.
const ProductCard = ({ product, onImageClick = () => {}, onProductSelect = () => {} }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAdded) return;
    
    // Se o produto for simples, adiciona direto e mostra feedback
    if (product.type === 'simple') {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } else {
      // Se tiver opções, chama a função para abrir o modal
      onProductSelect(product);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group"
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      layout
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onImageClick(product.imageUrl)}
          style={{ cursor: 'zoom-in' }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-brand-brown mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow font-sans">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-brand-pink font-serif">
            {product.type === 'by_weight' 
              ? `R$ ${product.pricePerKg.toFixed(2)}/kg` 
              : `R$ ${product.price.toFixed(2)}`
            }
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`
              relative flex items-center justify-center min-w-[130px] h-[40px]
              text-white px-5 py-2 rounded-full 
              transform transition-colors duration-300 
              group-hover:scale-105
              ${isAdded ? 'bg-green-500' : 'bg-brand-brown group-hover:bg-brand-pink'}
            `}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check size={18} className="mr-1.5" />
                  Adicionado!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {product.type === 'simple' ? 'Adicionar' : 'Escolher'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
