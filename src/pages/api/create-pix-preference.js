// pages/api/create-pix-preference.js
import { Redis } from '@upstash/redis';
import mercadopago from 'mercadopago';

// Inicializar o Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// Configurar o Mercado Pago com o token do ambiente
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, quantity, price, userId } = req.body;

      // Criar preferência de pagamento no Mercado Pago
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

      // Criar preferência e obter link de pagamento
      const response = await mercadopago.preferences.create(preference);
      const { init_point } = response.body;

      // Armazenar informações temporárias no Redis
      await redis.set(`transaction:${userId}`, JSON.stringify({ title, quantity, price, status: 'pending' }));

      // Retornar a URL de pagamento ao cliente
      res.status(200).json({ init_point });
    } catch (error) {
      console.error('Erro ao criar preferência PIX:', error);
      res.status(500).json({ message: 'Erro ao criar pagamento PIX' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
