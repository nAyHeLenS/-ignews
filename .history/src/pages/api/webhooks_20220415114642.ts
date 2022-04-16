import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import { stripe } from "../../services/stripe";
import Stripe from "stripe";

async function buffer(readble: Readable){
    const chunks = []; // pedaços da stream

    for await (const chunk of readble){
        chunks.push(
            typeof chunk  === 'string' ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

// quais eventos queremos ouvir
const relevantEvents = new Set([
    'checkout.session.completed'
])


export default async (req: NextApiRequest, res: NextApiResponse) =>{
    // verfifiar metodo
    if(req.method === 'POST'){
       // buf - é a requisição em si
       const buf = await buffer(req); 
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
        } catch (err){
            return res.status(400).send(`webhook error: ${err.message}`)
        }

        const type = event.type;

        if(!relevantEvents.has(type))
    

       res.status(200).json({ ok: true })
   } else{
       res.setHeader('Allow', 'POST')
       res.status(405).end('Method not allowed')
   }
}

// adicionar eventos ao cli - stripe trigger payment_intent.succeede