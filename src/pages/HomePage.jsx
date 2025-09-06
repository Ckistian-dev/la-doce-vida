import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton'; // <-- 1. IMPORTE O SKELETON
import ImageModal from '../components/ui/ImageModal';
import ProductOptionsModal from '../components/ui/ProductOptionsModal';
import { useCart } from '../context/CartContext';

const heroImages = [
  'https://delicious.com.br/wp-content/uploads/2020/10/DSC_0183.jpg',
  'https://ocirurgiaovascular.com.br/wp/wp-content/uploads/2020/08/receitas-doces-saudaveis-dr-daniel-benitti-cirurgiao-vascular-sao-paulo-campinas.jpg',
  'https://panicenter.com.br/cardapio/uploads/produtos/imagem/0p86X_NCuq081ef.jpg',
];

const HomePage = ({ setPage }) => {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProductForOptions, setSelectedProductForOptions] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- 2. REMOVEMOS A VERIFICAÇÃO DE 'loading' E 'error' DAQUI ---
  // A página inteira será renderizada, e a lógica de carregamento
  // ficará apenas na seção de produtos.

  return (
    <>
      {/* Seção Hero com Carrossel de Fundo (SEMPRE VISÍVEL) */}
      <div className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImages[currentImageIndex]}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          className="relative z-10 text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold drop-shadow-lg" style={{color: '#FFF'}}>La Doce Vida</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-2xl mx-auto drop-shadow-md" style={{color: '#FFF'}}>Aqui você encontra bolos caseiros, tortas fresquinhas e outras gostosuras feitas com amor.</p>
          <motion.button
            onClick={() => setPage('menu')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-brand-pink text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-brand-brown transition-colors duration-300"
          >
            Ver Cardápio
          </motion.button>
        </motion.div>
      </div>
      
      {/* Seção de Produtos em Destaque */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-serif text-center text-brand-brown mb-12">Nossos Queridinhos</h2>
          
          {/* --- 3. NOVA LÓGICA DE RENDERIZAÇÃO CONDICIONAL AQUI --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Se estiver carregando, mostra 3 skeletons
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : error ? (
              // Se der erro, mostra uma mensagem de erro no local
              <p className="col-span-3 text-center text-red-600">Erro ao carregar os produtos. Tente novamente.</p>
            ) : (
              // Se carregou com sucesso, mostra os produtos
              products.filter(p => p.isFeatured).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onImageClick={setSelectedImage}
                    onProductSelect={setSelectedProductForOptions}
                  />
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <motion.button
              onClick={() => setPage('menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-brown text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:bg-brand-pink transition-colors duration-300"
            >
              Ver todos os produtos
            </motion.button>
          </div>
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

export default HomePage;