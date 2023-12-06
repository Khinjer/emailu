const router = require('express').Router();

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OKHwuK4jrm1oK3cvXdlwkUy78EwVKTaUEkm7p91MU5ZT2z0qqymQBAyBH56i59gp6a8aZcqxtQTrmgGrgpy5G7700gz2oQtbO');
const YOUR_DOMAIN = 'http://localhost:5173';
router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1OKIWcK4jrm1oK3cHXLU0OBe',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});


module.exports = router;