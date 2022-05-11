import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { stripe } from "../../services/stripe";
import Stripe from "stripe";
import { saveSubscription } from "./_lib/menageSubscription";


async function buffer(readble: Readable) {
  const chunks = []; // pedaços da stream

  for await (const chunk of readble) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// quais eventos queremos ouvir
const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // verfifiar metodo
  if (req.method === 'POST') {
    // buf - é a requisição em si
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':

            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription (
              subscription.id,
              subscription.customer.toString(),
              type === 'customer.subscription.created',
            );

            break;

          case 'checkout.session.completed':

           const checkoutSession = event.data.object as Stripe.Checkout.Session

           await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
          )

            break;
          default:
            throw new Error('unhandled event');
        }
      } catch (err) {
        console.log(err)
        return res.status(400).json({ error: 'Webhook handler failed' });
      }
    }

    res.json({ received: true });
  } else {
    console.log(req.method)

    res.setHeader('Allow', 'POST');
    res.status(400).end('Method not allowed');
  }
};

// adicionar eventos ao cli - stripe trigger payment_intent.succeede
