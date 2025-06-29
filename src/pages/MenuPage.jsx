import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import products from '../data/products.json';
import ProductCard from '../components/ui/ProductCard';
import ImageModal from '../components/ui/ImageModal';
import ProductOptionsModal from '../components/ui/ProductOptionsModal';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProductForOptions, setSelectedProductForOptions] = useState(null);

  // Efeito para rolar para o topo sempre que a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif text-center text-brand-brown mb-12">Nosso Cardápio</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
              visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {products.map(product => (
            <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ProductCard
                product={product}
                onImageClick={setSelectedImage}
                onProductSelect={setSelectedProductForOptions}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <ImageModal 
        imageUrl={selectedImage} 
        onClose={() => setSelectedImage(null)}
      />

      <ProductOptionsModal
        isOpen={!!selectedProductForOptions}
        product={selectedProductForOptions}
        onClose={() => setSelectedProductForOptions(null)}
        onAddToCart={addToCart}
      />
    </>
  );
};

export default MenuPage;
