import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Truck } from 'lucide-react';

// --- Componente Customizado para Dropdowns (Select) ---
// Criamos um componente reutilizável para manter o estilo consistente.
const CustomSelect = ({ options, selected, onSelect, placeholder, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(opt => opt.value === selected)?.label || placeholder;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-pink focus:border-brand-pink sm:text-sm"
      >
        <span className="block truncate">{selectedLabel}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-brand-pink/10"
              >
                <span className="font-normal block truncate">{option.label}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};


const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' ou 'pickup'
  const [address, setAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState('matriz');
  const [status, setStatus] = useState({ message: '', type: '' });

  const DELIVERY_FEE = 10;
  const deliveryOptions = [
    { value: 'delivery', label: 'Entrega em domicílio' },
    { value: 'pickup', label: 'Retirar no local' },
  ];
  const pickupLocations = [
    { value: 'Talatto', label: 'Talatto - R. Alberto Dalcanale, 3103' },
    { value: 'Gruber', label: 'Gruber - R. Santos Dumont, 2005' },
    { value: 'Prati', label: 'Prati - R. Mitsugoro Tanaka, 145' },
    { value: 'Casa', label: 'Casa - R. H. B. de Cecco, 2431' },
  ];

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const totalAmount = useMemo(() => (deliveryType === 'delivery' ? subtotal + DELIVERY_FEE : subtotal), [subtotal, deliveryType]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setStatus({ message: 'Seu carrinho está vazio para finalizar o pedido.', type: 'error' });
      return;
    }
    setStatus({ message: 'Enviando pedido...', type: 'loading' });

    const orderItems = cart.map(item => `${item.quantity}x ${item.name}`).join('; ');
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzlBdURxSylsnjA9o7u0xzsrNsvR02713GO75T88fvp4D4rjkuWTAVG6wcHUnnoCOdrhg/exec';
    
    const data = new FormData();
    data.append('Timestamp', new Date().toISOString());
    data.append('CustomerName', formData.name);
    data.append('Phone', formData.phone);
    data.append('PaymentMethod', 'Pix'); // Assumindo Pix, já que o select foi removido para a nova UI
    data.append('OrderItems', orderItems);
    data.append('TotalAmount', totalAmount.toFixed(2));
    data.append('DeliveryType', deliveryType);
    
    if (deliveryType === 'delivery') {
      data.append('Address', address);
    } else {
      data.append('PickupLocation', pickupLocations.find(l => l.value === pickupLocation)?.label || '');
    }

    try {
      const response = await fetch(scriptURL, { method: 'POST', body: data });
      if (response.ok) {
        setStatus({ message: 'Pedido enviado com sucesso! Entraremos em contato em breve.', type: 'success' });
        clearCart();
        setFormData({ name: '', phone: '' });
        setAddress('');
      } else {
         throw new Error('Falha ao enviar para a planilha.');
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      setStatus({ message: 'Houve um erro ao enviar seu pedido. Por favor, tente novamente.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl space-y-6">
      <h2 className="text-2xl font-serif text-brand-brown border-b pb-4">Seus Dados e Entrega</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
        <input type="text" name="name" id="name" required onChange={handleInputChange} value={formData.name} placeholder="Digite seu nome completo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-pink focus:ring-brand-pink sm:text-sm placeholder:text-gray-400" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone (com DDD)</label>
        <input type="tel" name="phone" id="phone" required onChange={handleInputChange} value={formData.phone} placeholder="(XX) XXXXX-XXXX" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-pink focus:ring-brand-pink sm:text-sm placeholder:text-gray-400" />
      </div>

      <CustomSelect
        label="Opção de Entrega"
        options={deliveryOptions}
        selected={deliveryType}
        onSelect={setDeliveryType}
      />
      
      <AnimatePresence mode="wait">
        {deliveryType === 'delivery' ? (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço Completo (Rua, N°, Bairro)</label>
            <input type="text" name="address" id="address" required={deliveryType === 'delivery'} onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Ex: Rua das Flores, 123, Centro" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-pink focus:ring-brand-pink sm:text-sm placeholder:text-gray-400" />
          </motion.div>
        ) : (
          <motion.div
            key="pickup"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CustomSelect
              label="Local de Retirada"
              options={pickupLocations}
              selected={pickupLocation}
              onSelect={setPickupLocation}
              placeholder="Selecione um local"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resumo do Pedido */}
      <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <AnimatePresence>
            {deliveryType === 'delivery' && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-between text-gray-600">
                    <span>Taxa de Entrega</span>
                    <span>R$ {DELIVERY_FEE.toFixed(2)}</span>
                </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between font-bold text-lg text-brand-brown">
              <span>Total</span>
              <span>R$ {totalAmount.toFixed(2)}</span>
          </div>
      </div>


      <button type="submit" disabled={status.type === 'loading'} className="w-full bg-brand-pink text-white py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-bold hover:bg-brand-brown transition-colors disabled:bg-gray-400">
        {status.type === 'loading' ? 'Enviando...' : 'Finalizar Compra'}
      </button>

      {status.message && (
        <p className={`mt-4 text-center text-sm p-3 rounded-md ${ status.type === 'success' ? 'bg-green-100 text-green-800' : '' } ${ status.type === 'error' ? 'bg-red-100 text-red-800' : '' }`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
