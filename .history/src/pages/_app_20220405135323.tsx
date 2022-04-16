import { AppProps } from "next/app";
import { render } from "sass";
import { Header } from "../components/Header";
import { SessionProvider } from "next-auth/react"

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Header />
    <Component {...pageProps} />
  
  <SessionProvider session={session} refetchInterval={5 * 60 } ></SessionProvider>
  </>
  )
}

export default MyApp
