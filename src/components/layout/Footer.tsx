/* eslint react/no-unescaped-entities: 0 */
// __./components/HomePage/Footer.tsx
// import Logo from './Logo'
import FooterStyle from './Footer.module.css'
import Link from 'next/link'

const informations = [
  {
    title: 'About us',
    href: '/about',
  },
  {
    title: 'Contact us',
    href: '/contact',
  },
]

const legal = [
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    title: 'Terms & Conditions',
    href: '/terms',
  },
]

const Footer = () => {
  return (
    <footer className='bg-yellow-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-12 gap-8 py-20'>
          <div className='col-span-12 lg:col-span-6'>
            <div>
              {/* <img className="h-12" src="/images/logo.png" alt="bitcoin logo" /> */}
              {/* <Logo style={{ height: '64px', width: '64px'}}/> */}
              <div className='mt-2 text-2xl text-gray-200'>Dad's Beans</div>
            </div>
          </div>
          {/* <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
            <div className='text-md font-bold text-gray-200'>
              INFORMATION & SUPPORT
            </div>
            <div className='mt-3 flex flex-col space-y-2'>
              {informations.map((information: any, index: number) => (
                <Link key={index} href={information.href}>
                  <a
                    className={`${FooterStyle.footer__text} text-sm hover:text-white`}
                  >
                    {information.title}
                  </a>
                </Link>
              ))}
            </div>
            <div className='text-md mt-8 font-bold text-gray-200'>LEGAL</div>
            <div className='mt-3 flex flex-col space-y-2'>
              {legal.map((item: any, index: number) => (
                <Link key={index} href={item.href}>
                  <a
                    className={`${FooterStyle.footer__text} text-sm hover:text-white`}
                  >
                    {item.title}
                  </a>
                </Link>
              ))}
            </div>
          </div> */}
          <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
            <div className='text-md font-bold text-gray-200'>CONTACT US</div>
            <div
              className={`${FooterStyle.footer__text} mt-4 flex flex-col text-sm tracking-wide`}
            >
              <div>IYKYK</div>
              {/* <div>jimmy@dadsbeans.com</div> */}
            </div>
            <div className='text-md mt-8 font-bold text-gray-200'>
              SOCIAL MEDIA
            </div>
            <div className='mt-4 flex items-center space-x-3'>
              {/* <a href='https://twitter.com/imyjimmy'>
                <button className='inline-flex items-center space-x-2 rounded bg-blue-400 p-3 font-semibold text-white'>
                  <svg
                    className='h-4 w-4 fill-current'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                  </svg>
                </button>
              </a> */}
              <div className='text-md font-bold text-gray-200'>
                Coming Soon!
              </div>
              {/* 
                todo: 
                - tik tok
                - instagram
              */}
            </div>
          </div>
        </div>
      </div>
      <div className='py-4'>
        <p className='text-center text-base text-gray-200'>
          &copy; {new Date().getFullYear()} Dad's Beans. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
