import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SPARKS Foundation</title>
        <meta name="description" content="SPARKS Foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta name="theme-color" content="#020617" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
