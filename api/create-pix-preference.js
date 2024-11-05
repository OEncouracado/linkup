// pages/api/create-pix-preference.js
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, quantity, price } = req.body;

      const preference = new Preference(client);

      const preferenceBody = {
        items: [
          {
            title,
            quantity,
            currency_id: "BRL",
            unit_price: price,
          },
        ],
        payment_methods: {
          excluded_payment_types: [{ id: "credit_card" }],
          installments: 1,
        },
        back_urls: {
          success: "https://linkii.me/s/Sucesso",
          failure: "https://linkii.me/s/Cancelado",
          pending: "https://linkii.me/s/Pendente",
        },
        auto_return: "approved",
      };

      const response = await preference.create({ body: preferenceBody });

      // Retornar a resposta completa para o front-end
      res.status(200).json(response);
      console.info("Mensagem a ser Enviada: ",response)
    } catch (error) {
      console.error("Erro ao criar preferência PIX:", error);
      res.status(500).json({ message: "Erro ao criar pagamento PIX" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
