import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-pink text-brand-brown font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Layout para Mobile (Visível apenas em telas pequenas) --- */}
        <div className="md:hidden text-center">
          <div className="flex justify-center mb-4">
              <div>
              <img src="https://i.ibb.co/YTfpTSSd/3917ab0e-60fd-4754-a5b3-11859f92c129.png" alt="La Doce Vida Logo" className="h-20 w-auto" />
            </div>
          </div>
          <div className="text-sm space-y-1">
            <p>R. Heriberto B. de Cecco, 2431 - Toledo - PR</p>
            <p>contato@ladocevida.com</p>
            <p>Horário: Ter-Dom, 9:00 - 18:00</p>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="https://www.instagram.com/la.docevidaa/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300"><Instagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300"><Facebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300"><Twitter /></a>
          </div>
        </div>

        {/* --- Layout para Desktop (Visível apenas em telas médias e grandes) --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* Coluna 1: Logo e Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <div>
              <img src="https://i.ibb.co/YTfpTSSd/3917ab0e-60fd-4754-a5b3-11859f92c129.png" alt="La Doce Vida Logo" className="h-16 w-auto" />
            </div>
            <p className="text-sm">Onde cada doce conta uma história de sabor e paixão.</p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 tracking-wider">Navegação</h3>
            <ul className="space-y-2 text-sm">
                <li><button onClick={() => window.location.href='/'} className="hover:text-white transition-colors duration-300">Início</button></li>
                <li><button onClick={() => window.location.href='/menu'} className="hover:text-white transition-colors duration-300">Cardápio</button></li>
                <li><button onClick={() => window.location.href='/sobre'} className="hover:text-white transition-colors duration-300">Sobre Nós</button></li>
                <li><button onClick={() => window.location.href='/checkout'} className="hover:text-white transition-colors duration-300">Meu Carrinho</button></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 tracking-wider">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>R. Heriberto B. de Cecco, 2431 - Toledo - PR</li>
              <li>contato@ladocevida.com</li>
              <li>Horário: Ter-Dom, 9:00 - 18:00</li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 tracking-wider">Siga-nos</h3>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="https://www.instagram.com/la.docevidaa/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* --- Linha de Copyright Comum para todos os tamanhos --- */}
        <div className="text-center mt-12 border-t border-brand-brown/20 pt-8">
          <p className="text-sm">&copy; {new Date().getFullYear()} La Doce Vida. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
