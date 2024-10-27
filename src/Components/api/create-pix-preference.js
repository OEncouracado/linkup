// src/api/create-pix-preference.js
import mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken("APP_USR-6401240289490759-101313-6cfd47928d448af4be509a829dedccd1-2031844957");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, price } = req.body;

    try {
      const preference = {
        items: [
          {
            title,
            quantity: 1,
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
      res.status(200).json({ init_point: response.body.init_point });
    } catch (error) {
      console.error('Erro ao criar preferência de pagamento:', error);
      res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
    }
  } else {
    res.setHeader('Allow', ['POST','GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
