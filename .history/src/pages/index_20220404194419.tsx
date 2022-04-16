
import { GetServerSideProps } from 'next';
import Styles from './home.module.scss';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HmeProps) {
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
        <span> for {product.amount} month </span> 
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>
      <img src="/assets/images/avatar.svg" alt="Girl Coding" />
    </main>
  </>
  )

}


export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KkHmpHvUVXM2uxLOQbMbHuv')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }

  return{
    props: {
      product
    }
  }
}

// * export -> const <- -  em forma de constante pois dentro do next pode-se importar uma tipagem para esta função, chamada  GetServerSideProps .


/** 
* * GetServerSideProps - tudo que você repassar como propriedade voce consegue acessar atravez das props.
* * expand: [product] - tem acesso a todas as infos do produto.
* * amount: price.unit_amount / 100 - preço unitário - 100 centavos.
* *  
*/