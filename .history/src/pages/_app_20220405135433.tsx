import { AppProps } from "next/app";
import { render } from "sass";
import { Header } from "../components/Header";
import { SessionProvider } from "next-auth/react"

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>

  
  <SessionProvider session={session} refetchInterval={5 * 60 } >
    <Header />
    <Component {...pageProps} />
  </SessionProvider>
  </>
  )
}

export default MyApp
