import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// A função de formatação de preço que já estávamos usando
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
};

const ProductOptionsModal = ({ product, isOpen, onClose, onAddToCart }) => {
    const [selectedVariations, setSelectedVariations] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState(500);
    // REMOVEMOS o estado 'selectedFlavor', pois agora usaremos 'selectedVariations' para ambos os tipos.

    // Reseta os estados internos quando o produto do modal muda
    useEffect(() => {
        if (product) {
            setSelectedVariations([]); // Reseta as seleções para todos os tipos
            if (product.type === 'by_weight') {
                setSelectedWeight(product.minWeight || 500);
            }
        }
    }, [product]);

    // Esta função agora serve tanto para 'variations' quanto para 'by_weight'
    const handleVariationChange = (optionId) => {
        setSelectedVariations(prev => {
            if (prev.includes(optionId)) {
                return prev.filter(id => id !== optionId); // Desmarcar
            }
            // Limita a seleção ao máximo permitido
            if (prev.length < (product.maxSelections || 1)) {
                return [...prev, optionId]; // Marcar
            }
            // Se o limite foi atingido, não faz nada
            return prev;
        });
    };

    const calculatedPrice = useMemo(() => {
        if (!product) return 0;

        // A lógica de preço para 'by_weight' foi simplificada.
        // O preço por quilo é o mesmo para todos os sabores, então não depende mais da seleção.
        if (product.type === 'by_weight' && product.options?.length > 0) {
            const pricePerKg = product.options[0].pricePerKg; // Pegamos o preço do primeiro sabor, pois todos são iguais.
            return (selectedWeight / 1000) * pricePerKg;
        }

        // Preço para produtos 'simple' ou 'variations'
        return product.price || 0;
    }, [product, selectedWeight]);

    const handleConfirm = () => {
        let finalName = product.name;
        let finalPrice = product.price;

        // Lógica unificada para criar o nome do produto com os sabores escolhidos
        if (product.type === 'variations' || product.type === 'by_weight') {
            const selectedLabels = selectedVariations
                .map(id => product.options.find(opt => opt.id === id)?.label)
                .join(' + ');

            if (product.type === 'by_weight') {
                finalName = `${product.name} - ${selectedLabels} (${selectedWeight}g)`;
                finalPrice = calculatedPrice;
            } else { // 'variations'
                finalName = `${product.name} (${selectedLabels})`;
            }
        }

        const itemToAdd = {
            ...product,
            id: `${product.id}-${Date.now()}`,
            name: finalName,
            price: finalPrice,
        };
        onAddToCart(itemToAdd);
        onClose();
    };

    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative"
                >
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"><X /></button>
                    <h2 className="text-2xl font-serif text-brand-brown mb-4">{product.name}</h2>
                    
                    {/* LÓGICA ATUALIZADA E UNIFICADA para produtos por Peso */}
                    {(product.type === 'by_weight' || product.type === 'variations') && Array.isArray(product.options) && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 mb-3">Escolha até {product.maxSelections || 1} sabores:</p>
                                <div className="space-y-2">
                                    {product.options.map(option => (
                                        <label key={option.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-brand-pink/10 transition-colors">
                                            {/* MUDANÇA PRINCIPAL: De 'radio' para 'checkbox' */}
                                            <input
                                                type="checkbox"
                                                checked={selectedVariations.includes(option.id)}
                                                onChange={() => handleVariationChange(option.id)}
                                                className="h-5 w-5 rounded text-brand-pink focus:ring-brand-pink"
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* O seletor de peso só aparece para produtos 'by_weight' */}
                            {product.type === 'by_weight' && (
                                <div>
                                    <p className="text-gray-600 mb-2">Selecione o peso desejado:</p>
                                    <input type="range" min={product.minWeight} max={product.maxWeight} step="50" value={selectedWeight} onChange={(e) => setSelectedWeight(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-pink" />
                                    <div className="text-center text-lg font-bold text-brand-brown mt-2">
                                        {selectedWeight}g
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className="mt-6 border-t pt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-brand-pink font-serif">
                            {formatPrice(calculatedPrice)}
                        </span>
                        <button
                            onClick={handleConfirm}
                            // O botão fica desabilitado se nenhum sabor for escolhido
                            disabled={selectedVariations.length === 0}
                            className="bg-brand-brown text-white px-6 py-2 rounded-full hover:bg-brand-pink transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Confirmar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductOptionsModal;