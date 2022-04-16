
import { GetStaticProps } from 'next';
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

export default function Home({ product }: HomeProps) {
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


export const getStaticProps: GetStaticProps = async () => {
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
    },
    revalidate: 60 + 60 + 24, // 24 horas
  }
}

// * export -> const <- -  em forma de constante pois dentro do next pode-se importar uma tipagem para esta função, chamada  GetServerSideProps .


/** 
* * GetServerSideProps - tudo que você repassar como propriedade voce consegue acessar atravez das props.
* * expand: [product] - tem acesso a todas as infos do produto.
* * amount: price.unit_amount / 100 - preço unitário - 100 centavos.  
*/

/** 
* * const product = {...} - formatação do preço, através do servidor
* * return - retorna a propriedade (props), nesse caso a propriedade é o product (produto)
*/

// * Static Site Generation
/**
 * além de retornar para o  browser o Next e salva (cria) o arquivo html de forma estatica,
 *  que contém o resultado final gerado a partir da tela,
 *  assim se o ususário acessar novamente aquela tela, o Next irá exibir retornar 
 *  o html salvo direto para o browser.
 * 
 * * como aplicar SSG no Next
 * trocamos o getServerSideProps por getStaticProps
 * importar GetStaticProps
 * trocar GetServerSideProps por  GetStaticProps
 * 
 * * revalidate
 * ctrl + space - revalidate
 * revalidate - quanto tempo em segundos
 *  eu quero que essa página se mantenha sem precisar ser reconstruida (revalidada)
 * 60 - 1 minuto | 60 1 hora | 24 um dia
 * */


// * Diferenças entre getStaticProps e getServerSideProps
/**
 * * getStaticProps 
 * - executa uma vez e salva o resultado do html de forma estática até o revalidate
 * - é mais performatico pois ele salva o html 
 * ! só pode ser aplicado em páginas onde o conteudo é o mesmo para todos os usuários
 * - não substituem totalmente uma chamada API que possa ser feita diretamente por um componente
 * ---
 * * getServerSideProps 
 * - faz todo o processo novamente
 * - é mais dinâmico
 * - posso pegar dados do ususário logado
 * - não substituem totalmente uma chamada API que possa ser feita diretamente por um componente
 * 
*/

// * 3 formas principais de se fazer uma chmada API
/**
* * Client-side - uma info que é carregada pela ação do usuário, ex: um comentário em um post
* * Server-side - infos em tempo real do usuário que está acessando etc...
* * Static site generation - uma página que será exibida para todos os usuários, ex: o post de um blog
*/