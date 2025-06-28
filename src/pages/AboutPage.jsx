import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <h1 className="text-4xl font-serif text-center text-brand-brown mb-8">Nossa Doce História</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg text-lg text-gray-700 leading-relaxed space-y-4">
            <p>A "La Doce Vida" nasceu de um sonho de infância e de uma paixão que atravessou gerações. Nossa fundadora, a Chef Ana, cresceu na cozinha de sua avó, onde aprendeu que o segredo de um bom doce não está apenas nos ingredientes, mas no amor e na dedicação depositados em cada receita.</p>
            <p>Cada bolo, cada torta e cada cupcake que sai de nossa cozinha carrega um pedaço dessa história. Usamos apenas ingredientes frescos e de alta qualidade, combinando técnicas clássicas de confeitaria com um toque de criatividade e inovação.</p>
            <p>Nossa missão é simples: criar momentos de felicidade. Queremos que cada mordida seja uma experiência única, um convite para celebrar a vida e seus momentos mais doces. Bem-vindo à nossa família!</p>
        </div>
    </div>
  );
};

export default AboutPage;
