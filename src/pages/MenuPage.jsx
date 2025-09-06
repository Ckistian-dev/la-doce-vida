import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton'; // <-- 1. IMPORTE O SKELETON
import ImageModal from '../components/ui/ImageModal';
import ProductOptionsModal from '../components/ui/ProductOptionsModal';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProductForOptions, setSelectedProductForOptions] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- 2. REMOVEMOS A VERIFICAÇÃO DE 'loading' E 'error' DAQUI ---

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* O título do cardápio agora aparece imediatamente */}
        <h1 className="text-4xl font-serif text-center text-brand-brown mb-12">Nosso Cardápio</h1>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
              visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* --- 3. NOVA LÓGICA DE RENDERIZAÇÃO CONDICIONAL AQUI --- */}
          {loading ? (
            // Se estiver carregando, mostra 6 skeletons para preencher mais a tela
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : error ? (
            // Se der erro, mostra uma mensagem de erro no local
            <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-red-600 py-10">
              Ops! Não foi possível carregar o cardápio. <br /> Tente recarregar a página.
            </p>
          ) : (
            // Se carregou com sucesso, mostra os produtos
            products.map(product => (
              <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <ProductCard
                  product={product}
                  onImageClick={setSelectedImage}
                  onProductSelect={setSelectedProductForOptions}
                />
              </motion.div>
            ))
          )}
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