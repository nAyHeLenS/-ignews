import Styles from './home.module.scss';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

export default function Home() {
  return (
  <>
    <Head>
        <title> Home | IgNews </title>
      </Head>
    <main className={Styles.contentContainer}>
      <section className={Styles.hero}>
        <span> 👏 Hey Welcome</span>
        <h1>News about the  <span>React</span> World!</h1>
        <p> Get access to all the publications <br/> 
        <span>
        for $9,90 month
        </span> 
        </p>
        <SubscribeButton/>
      </section>
      <img src="/assets/images/avatar.svg" alt="Girl Coding" />
    </main>
  </>
  )

}


export const getServerSideProps()