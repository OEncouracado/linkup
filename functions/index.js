const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  const {priceId} = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/s/Sucesso",
      cancel_url: "http://localhost:3000/s/Cancelado",
    });

    res.json({id: session.id});
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({error: "Failed to create checkout session"});
  }
});
