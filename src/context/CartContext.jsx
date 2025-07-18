import React, { createContext, useReducer, useEffect, useContext } from 'react';

// O contexto é exportado para ser usado em outros arquivos.
export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Lógica atualizada para lidar com diferentes tipos de produtos.
      // Se o produto for 'simple', verificamos se ele já existe para incrementar a quantidade.
      if (action.payload.type === 'simple') {
          const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
          if (existingItemIndex > -1) {
            return state.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
      }
      // Para produtos customizados (com variações ou por peso), sempre adicionamos como um novo item no carrinho,
      // pois eles podem ter nomes e preços diferentes.
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== action.payload.id);
    }
    case 'INCREMENT_QUANTITY': {
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    case 'DECREMENT_QUANTITY': {
      const targetItem = state.find(item => item.id === action.payload.id);
      if (targetItem && targetItem.quantity > 1) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return state.filter(item => item.id !== action.payload.id);
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const localData = localStorage.getItem('laDoceVidaCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('laDoceVidaCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  const incrementQuantity = (id) => dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } });
  const decrementQuantity = (id) => dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Mantivemos o hook 'useCart' aqui, pois é uma boa prática e estava no seu código.
export const useCart = () => useContext(CartContext);
