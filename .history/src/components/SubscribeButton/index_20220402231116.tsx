import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton(){
    return(
        <button
        type='button' 
        className={styles.SubscribeButton}>
            Subscribe Now!
        </button>
    )
}

// * { priceId }: SubscribeButtonProps