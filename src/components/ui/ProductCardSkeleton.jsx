import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Placeholder da Imagem */}
      <div className="w-full h-56 bg-gray-300 animate-pulse"></div>
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Placeholder do Título */}
        <div className="h-7 w-3/4 bg-gray-300 rounded-md animate-pulse mb-3"></div>
        
        {/* Placeholder da Descrição */}
        <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse mb-4"></div>
        
        <div className="flex justify-between items-center mt-auto">
          {/* Placeholder do Preço */}
          <div className="h-6 w-1/3 bg-gray-300 rounded-md animate-pulse"></div>
          
          {/* Placeholder do Botão */}
          <div className="h-10 w-32 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;