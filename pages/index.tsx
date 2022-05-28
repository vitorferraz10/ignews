import type { GetServerSideProps } from 'next'

import Head from 'next/head'
import { SubscribeButton } from '../src/components/subscribeButton/indes'
import { stripe } from '../src/services/stripe'
import styles from './home.module.scss'

type HomeProps = {
  product: {
    priceId: string,
    amount: number,
  }
}


const Home = ({ product }: HomeProps) => {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 hey, welcome</span>
          <h1>News aboute the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br /> <span> for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>

    </>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1L4586BDtVbnFOnFkGB2O5sP', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount &&
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    }

  }
}