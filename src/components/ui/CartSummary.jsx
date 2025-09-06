import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, BookOpen } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Este componente já está correto, nenhuma alteração é necessária para as imagens.
const CartSummary = ({ setPage }) => { 
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, formatPrice } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-xl text-center flex flex-col items-center">
        <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4"/>
        <h2 className="text-2xl font-serif text-brand-brown mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6">Adicione alguns doces para começar!</p>
        <motion.button
          onClick={() => setPage('menu')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center bg-brand-pink text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg hover:bg-brand-brown transition-colors duration-300"
        >
          <BookOpen size={20} className="mr-2" />
          Ver Cardápio
        </motion.button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-serif text-brand-brown border-b pb-4 mb-4">Resumo do Pedido</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {cart.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {/* A imagem aqui apenas exibe o item.imageUrl, que já vem correto do useProducts */}
                <img src={item.imageurl} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                <div>
                  <p className="font-bold text-brand-brown">{item.name}</p>
                  <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border rounded-full">
                  <button onClick={() => decrementQuantity(item.id)} className="p-1 text-brand-brown hover:text-brand-pink"><Minus size={16} /></button>
                  <span className="px-3 text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)} className="p-1 text-brand-brown hover:text-brand-pink"><Plus size={16} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-6 pt-4 border-t text-right">
        <p className="text-lg">Subtotal: <span className="font-bold text-xl text-brand-brown">{formatPrice(subtotal)}</span></p>
        <p className="text-sm text-gray-500">Taxas e entrega calculadas na finalização.</p>
      </div>
    </div>
  );
};

export default CartSummary;