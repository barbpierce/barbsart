import Stripe from "stripe";
import { convertToCents } from "../../lib/utils";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount:
                  req.body.shipping > 0 ? convertToCents(req.body.shipping) : 0,
                currency: "cad",
              },
              display_name: "Ground Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 2,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
        ],
        line_items: req.body.items.map((item) => {
          return {
            price_data: {
              currency: "cad",
              product_data: {
                name: item.title,
                images: [item.url],
              },
              unit_amount: convertToCents(item.price),
            },
            quantity: 1,
          };
        }),

        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&email=${req.body.email}`,
        cancel_url: `${req.headers.origin}/checkout`,
      });
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: "err.message" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
