import { ReactNode } from 'react'
// import Link from 'next/link'
import Head from 'next/head'

// import UnderConstruction from './UnderConstruction'
import Seo from '@/components/Seo'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: ReactNode
  title?: string
  currentPage?: string
}

const Layout = ({ children, title = "Dad's Beans!", currentPage }: Props) => (
  <div className='flex min-h-screen flex-col'>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon.png' />
      {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
    </Head>
    {/* <Seo /> */}
    {/* <UnderConstruction /> */}
    <Header currentPage={currentPage} />
    <div className='flex-1 bg-white'>
      <div className='mx-auto max-w-7xl bg-white sm:px-6 lg:px-8'>
        {children}
      </div>
    </div>

    <Footer />
  </div>
)

export default Layout
