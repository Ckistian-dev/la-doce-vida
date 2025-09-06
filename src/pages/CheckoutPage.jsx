import React, { useEffect } from 'react';
import CheckoutForm from '../components/ui/CheckoutForm';
import CartSummary from '../components/ui/CartSummary';

const CheckoutPage = ({ setPage }) => {
  // Efeito para rolar para o topo sempre que a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-center text-brand-brown mb-12">Finalizar Pedido</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

        <div className="lg:col-span-2">
          <CartSummary setPage={setPage} />
        </div>
        <div className="lg:col-span-3">
          <CheckoutForm />
        </div>
        
      </div>
    </div>
  );
};

export default CheckoutPage;
