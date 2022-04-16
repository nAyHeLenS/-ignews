import { signIn, useSession } from 'next-auth/react';
import { stripe } from '../../services/stripe';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string
};

export function SubscribeButton({ priceId }: SubscribeButtonProps){
    const { data: session } = useSession();

    function handleSubscribe(){
        if (!session){
            signIn('github')
            return; // a partir daqui o código para de ser executado
        }

        // se o usuário estiver logado | checkout session
        // stripe.checkout.sessions.create
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