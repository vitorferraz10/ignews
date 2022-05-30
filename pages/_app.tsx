
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Header } from '../src/components/header'
import '../styles/global.scss'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>

    </>
  )
}

export default MyApp
