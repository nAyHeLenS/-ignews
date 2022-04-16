import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../services/stripe';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    // verificar se o método da requisição é POST
    if(req.method != 'POST'){
        // sempre que estou criando algo o método é - POST
        // se for POST
        const checkoutSession  = await stripe.checkout.sessions.create({
            customer: {}
            // quais metodos de pagamento aceitar
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1KkHmpHvUVXM2uxLOQbMbHuv', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

    } else{
        // se não for POST
        req.setHeader('Allow', 'POST') // o método que a requisição aceita é POST
        res.status(405).end('Method not allowed') // se não for POST - a resposta é método não permititdo
    }
}