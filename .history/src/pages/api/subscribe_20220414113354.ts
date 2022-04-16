import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';
import { getSession } from 'next-auth/react';
import { stripe } from '../../services/stripe';

// tipagem
type User = {
    ref: {
        id: string
    },
    data: {
        stripe_customer_id: string
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // verificar se o método da requisição é POST
    if(req.method === 'POST'){
        // sempre que estou criando algo o método é - POST
        
        const session = await getSession({ req })

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        // se o ususário não existir
        if(!customerId){
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
                // metadata
            })

            await fauna.query(
                // atualizar um usuário
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            )

            customerId = stripeCustomer.id
        }

        

       
        
        const stripeCheckoutSession  = await stripe.checkout.sessions.create({
            // quems está comprando 
            customer: customerId,
            
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

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })

    } else{
        // se não for POST
        res.setHeader('Allow', 'POST') // o método que a requisição aceita é POST
        res.status(405).end('Method not allowed') // se não for POST - a resposta é método não permititdo
    }
}