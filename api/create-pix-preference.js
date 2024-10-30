// pages/api/create-pix-preference.js
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Redis } from '@upstash/redis';

// Inicializar o Redis
const redis = new Redis({
  url: process.env.pix_KV_REST_API_URL,
  token: process.env.pix_KV_REST_API_TOKEN,
});

// Configurar o Mercado Pago com o token do ambiente
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, quantity, price, userId } = req.body;

      // Criar preferência de pagamento no Mercado Pago
      const preference = new Preference(client);

      // Configuração da preferência
      const preferenceBody = {
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
          pending: 'https://linkii.me/s/Pendente',
        },
        auto_return: 'approved',
      };

      // Criar preferência e obter link de pagamento
      const response = await preference.create({ body: preferenceBody });

      // Log para confirmar a estrutura de resposta
      console.log('Response:', response);

      const initPoint = response?.body?.init_point;

      if (initPoint) {
        // Armazenar informações temporárias no Redis
        await redis.set(`transaction:${userId}`, JSON.stringify({ title, quantity, price, status: 'pending' }));

        // Retornar a URL de pagamento ao cliente
        res.status(200).json({ init_point: initPoint });
      } else {
        console.error('Erro: init_point não encontrado na resposta');
        res.status(500).json({ message: 'Erro ao criar pagamento PIX: init_point não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao criar preferência PIX:', error);
      res.status(500).json({ message: 'Erro ao criar pagamento PIX' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
