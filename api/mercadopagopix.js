
// SDK do Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Adicione as credenciais
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });


const preference = new Preference(client);

preference.create({
  body: {
    items: [
      {
        title: 'Meu produto',
        quantity: 1,
        unit_price: 25
      }
    ],
  }
})
.then(console.log)
.catch(console.log);
