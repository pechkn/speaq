import { Provider } from "react-redux"
import type { AppProps } from "next/app"
import styled, { createGlobalStyle } from "styled-components"
import { store } from "../store"
import { useLayoutEffect, useState } from "react"
import { Header } from "../components/Header"
import Head from "next/head"

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		border: none;
		font-family: sans-serif;
		resize: none;
		outline: none;
		background-color: transparent;
    color: black;
    text-decoration: none;
	}
`

const Main = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`

const MyApp = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   const data = localStorage.getItem("store")
  //   try {
  //     localStorage.setItem("store", JSON.stringify(data))
  //   } catch (e) {
  //     localStorage.clear()
  //   }
  // }, [currentUserId])

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Social network</title>
      </Head>
      <GlobalStyle />
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
    </Provider>
  )
}

export default MyApp
