import React, { useState } from 'react';
import { motion } from 'framer-motion';
import products from '../data/products.json';
import ProductCard from '../components/ui/ProductCard';
import ImageModal from '../components/ui/ImageModal'; // Importe o novo componente

const MenuPage = () => {
  // Estado para controlar a URL da imagem que está no modal
  const [selectedImage, setSelectedImage] = useState(null);

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
                // Passa a função para o card para que ele possa definir a imagem selecionada
                onImageClick={setSelectedImage}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Renderiza o modal. Ele só será visível quando 'selectedImage' tiver uma URL. */}
      <ImageModal 
        imageUrl={selectedImage} 
        onClose={() => setSelectedImage(null)} // Define a função para fechar o modal
      />
    </>
  );
};

export default MenuPage;
