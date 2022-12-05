/* eslint react/no-unescaped-entities: 0 */
import { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

const UnderConstruction = () => {
  const [show, setShow] = useState<boolean>(true)

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShow((show) => !show)
  }

  return (
    <>
      {show && (
        <div className='relative bg-indigo-500'>
          <div className='mx-auto max-w-7xl py-2 px-3 sm:px-6 lg:px-8'>
            <div className='pr-16 sm:px-16 sm:text-center'>
              <p className='font-small text-white'>
                {/* <span className="md:hidden">You've stumbled across a very early version of Dad's Beans</span> */}
                <span className='hidden md:inline'>
                  👋 You've stumbled across a very early version of Dad's
                  Beans...why don't you sign up for the
                </span>
                <span className='block sm:ml-2 sm:inline-block'>
                  <a
                    href='https://marvelous-hustler-4098.ck.page/87f8801d2d'
                    className='text-white underline'
                  >
                    {' '}
                    mailing list <span aria-hidden='true'></span>
                  </a>
                </span>
              </p>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2'>
              <button
                type='button'
                className='flex rounded-md p-1 hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-white'
                onClick={toggle}
              >
                <span className='sr-only'>Dismiss</span>
                <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UnderConstruction
