import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-pink text-brand-brown mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 items-center text-center md:text-left">
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">La Doce Vida Confeitaria</h3>
            <p>R. Heriberto B. de Cecco, 2431 - Toledo - PR</p>
            <p>contato@ladocevida.com</p>
            <p>Horário: Ter-Dom, 9:00 - 18:00</p>
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="https://www.instagram.com/la.docevidaa/" className="hover:text-white transition-colors duration-300"><Instagram /></a>
            <a href="#" className="hover:text-white transition-colors duration-300"><Facebook /></a>
            <a href="#" className="hover:text-white transition-colors duration-300"><Twitter /></a>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-brand-brown/20 pt-4">
          <p>&copy; {new Date().getFullYear()} La Doce Vida. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;