import type { NextPage } from 'next'
import Head from 'next/head'

import { DailyComponent } from 'components';

const PageDaily: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pixionary: Daily</title>
        <meta name="description" content="A daily pixel picture puzzle" />
      </Head>
      <DailyComponent />
    </>
  )
}

export default PageDaily;
