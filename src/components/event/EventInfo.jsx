import React, { useState } from 'react';
import './EventInfo.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

// Inicializa Mercado Pago con tu Public Key

const EventInfo = () => {

    initMercadoPago('APP_USR-cd78e2e4-b7ee-4b1d-ad89-e90d69693f9c', { locale: 'es-AR' });
    const [preferenceId, setPreferenceId] = useState(null);


      const handleBuy = async () => {
    const id = await preference();
    if (id) {
        setPreferenceId(id);
    }
};

  return (
    <div className="event-info">
      <h2>{title}</h2>
      <div className="price">Precio: ${price}</div>
      <div className="quantity">Entradas: <span style={{ fontWeight: '500' }}>{quantity}</span></div>
      <button onClick={handleBuy} className="subtitle">Comprar</button>
      {preferenceId && <Wallet initialization={{preferenceId: preferenceId}} />}
      
    </div>
  );
};

const preference = async () => {
    try {
        const response = await axios.post('http://localhost:3001/create_preference', {
            items: [
                {
                    title: 'Evento de prueba',
                    quantity: 1,
                    unit_price: 2000
                }
            ]
        });
        const { id } = response.data;
        return id;
    } catch (error) {
        console.error(error);
    }
};


export default EventInfo;
