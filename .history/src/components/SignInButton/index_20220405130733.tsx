import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

import {  SignIn  } from 'next-auth/client';

export function SignInButton(){
    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button
        className={styles['signInButton']}
         type="button">
            <FaGithub color='#04d361'/>
            Naya Silva
            <FiX color='#737388' className={styles['closeIcon']}/>
        </button>
        
    ) : (

        <button
        className={styles['signInButton']}
         type="button"
         onClick={SignIn}
         >
            <FaGithub color='#eba417'/>
            Sign in with GitHub
        </button>
    );
}

// * SignI faz a autenticaçãodo usuário