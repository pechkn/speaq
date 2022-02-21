import { Provider } from "react-redux"
import type { AppProps } from "next/app"
import { store } from "../store"
import Head from "next/head"
import {YMaps} from "react-yandex-maps";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>speaq!</title>
      </Head>
      <YMaps>
        <Component {...pageProps} />
      </YMaps>
    </Provider>
  )
}

export default App
