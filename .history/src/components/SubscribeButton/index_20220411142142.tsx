import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string
};

export function SubscribeButton({ priceId }: SubscribeButtonProps){
    const [session] = useSession();

    function handleSubscribe(){
        if(!session){
            signIn('github')
            return;
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