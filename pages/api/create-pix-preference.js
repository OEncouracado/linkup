// pages/api/create-pix-preference.js
import { Redis } from '@upstash/redis';
import mercadopago from 'mercadopago';

// Inicializar o Redis

const redis = new Redis({
  url: process.env.pix_KV_REST_API_URL,
  token: process.env.pix_KV_REST_API_TOKEN,
});

const mercadoPagoToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!mercadoPagoToken) {
  console.error('O token do Mercado Pago não foi definido. Verifique as configurações de ambiente.');
  // Opcional: Lançar um erro personalizado ou utilizar um valor padrão
  throw new Error('Token do Mercado Pago não configurado');
} else {
  mercadopago.configurations.setAccessToken(mercadoPagoToken);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end(); // Responde às requisições OPTIONS antes de continuar
    return;
  }

  if (req.method === 'POST') {
    // Código para o método POST permanece o mesmo
    try {
      const { title, quantity, price, userId } = req.body;
      const preference = {
        items: [
          {
            title,
            quantity,
            currency_id: 'BRL',
            unit_price: price,
          },
        ],
        payment_methods: {
          excluded_payment_types: [{ id: 'credit_card' }],
          installments: 1,
        },
        back_urls: {
          success: 'https://linkii.me/s/Sucesso',
          failure: 'https://linkii.me/s/Cancelado',
          pending: 'https://linkii.me/s/Cancelado',
        },
        auto_return: 'approved',
      };

      const response = await mercadopago.preferences.create(preference);
      const { init_point } = response.body;

      await redis.set(`transaction:${userId}`, JSON.stringify({ title, quantity, price, status: 'pending' }));

      res.status(200).json({ init_point });
    } catch (error) {
      console.error('Erro ao criar preferência PIX:', error);
      res.status(500).json({ message: 'Erro ao criar pagamento PIX' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
