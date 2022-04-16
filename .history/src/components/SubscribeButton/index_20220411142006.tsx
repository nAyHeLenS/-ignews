import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string
};

export function SubscribeButton({ priceId }: SubscribeButtonProps){
    function handleSubscribe(){
        
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