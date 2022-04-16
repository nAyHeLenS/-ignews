import { AppProps } from "next/app";
import { render } from "sass";
import { Header } from "../components/Header";

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Header />
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
