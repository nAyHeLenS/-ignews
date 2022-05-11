import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header(){

    return(
        <header className={styles['header-container']}>
            <div className={styles['header-content']}>
                <img src="assets/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink asActiveClassName={styles['active']} href='/'>
                      <a>Home</a>
                     </ActiveLink>

                     <ActiveLink asActiveClassName={styles['active']} href='/posts'>
                      <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}

