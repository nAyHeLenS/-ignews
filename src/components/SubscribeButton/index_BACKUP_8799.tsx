import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string
};

export function SubscribeButton({ priceId }: SubscribeButtonProps){
    const { data: session } = useSession();

    async function handleSubscribe(){
        if (!session){
            signIn('github')
            return; 
            // a partir daqui o código para de ser executado
        }

        // se o usuário estiver logado | checkout session
        // stripe.checkout.sessions.create

        try{
            const response = await api.post('/subscribe');

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

<<<<<<< HEAD
            await stripe.redirectToCheckout({ sessionId })
=======
            await stripe.redirectToCheckout(sessionId)
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <button
        type='button' 
        className={styles.SubscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe Now!
        </button>
    )
}

// README.md - line 41