// * as React from 'react'
import React, { ReactElement, Fragment } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { circlePic } from '../../lib/utils'
import { useUser } from '../../lib/UserProvider'
import styles from './Header.module.css'
import ShoppingBagIcon from '@heroicons/react/outline'

import SvgShoppingBag from '../icons/ShoppingBag'
import UnstyledLink from '@/components/links/UnstyledLink'

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
]

type Props = {
  currentPage?: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Header: React.FC<Props> = ({ currentPage }): ReactElement => {
  const router = useRouter()
  const { user } = useUser()

  const loggedInLinks = [
    { href: '/#', text: 'test' },
    { href: '/#', text: 'test' },
    { href: '/#', text: 'test' },
  ]

  return (
    <header>
      <Popover className='relative bg-white'>
        {({ open }) => (
          <>
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6"> */}
            <div //className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
              id='header'
              className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ${
                user ? 'py-4' : 'py-2'
              } md:justify-start md:space-x-10`}
            >
              <div className='-my-2 -mr-2 md:hidden'>
                <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              {/* <Popover.Group as="nav" className="hidden md:flex space-x-10"> */}
              <nav className='hidden space-x-10 md:flex'>
                {user ? (
                  <>
                    {loggedInLinks.map((link, index) => (
                      <Link key={index} href={link.href}>
                        <a
                          className={
                            'font-mediumtext-gray-900 text-base hover:text-blue-700' +
                            ' ' +
                            `${
                              router.pathname === link.href ||
                              currentPage === link.href
                                ? styles.selected
                                : ''
                            }`
                          }
                        >
                          {link.text}
                        </a>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <a
                      href='/'
                      className='font-mediumtext-gray-900 text-base hover:text-blue-700'
                    >
                      Dad's Beans
                    </a>
                    <a
                      href='/about'
                      className='font-mediumtext-gray-900 text-base hover:text-blue-700'
                    >
                      About Us
                    </a>
                  </>
                )}
              </nav>
              {/* </Popover.Group> */}
              <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
                {user ? (
                  <>
                    <Popover className='relative mr-2'>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? 'text-gray-900' : 'text-gray-500',
                              'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            )}
                          >
                            {/* The reason we need profile pic in the userProvider so we can use the 
                          profile picture in the Message Component and other components. If this is NOT
                          the way you want it you can remove the below code and uncheck back and update 
                          other components with QueryUserProfile. 
                          */}
                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500'>
                              <span className='text-xs font-medium leading-none text-white'>
                                {user.username[0].toUpperCase()}
                              </span>
                              {/* {userBio && userBio.profile_pic && (
                                <img
                                  className='h-10 w-10 rounded-full'
                                  src={circlePic(userBio.profile_pic)}
                                  alt='user profile photo'
                                />
                              )} */}
                            </span>
                            {/*{profilePicReady() ? (<img className="relative rounded-full w-50" src={circlePic(profilePic.data.photos[0].url)} alt="" />) :
                            (<span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                              <span className="text-xs font-medium leading-none text-white">{user.nickname[0].toUpperCase()}</span>
                            </span>)}*/}
                          </Popover.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                          >
                            <Popover.Panel
                              static
                              className='absolute left-1/2 z-10 mt-3 w-screen -translate-x-1/2 transform px-2 sm:px-0'
                              style={{ maxWidth: '10rem' }}
                            >
                              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                                <div className='relative grid gap-2 bg-white px-2 py-3 sm:gap-4 sm:p-4'>
                                  <ul>
                                    <li
                                      key='0'
                                      className='my-2 truncate py-2 text-base hover:bg-gray-50'
                                    >
                                      <Link
                                        href={`/profile/${encodeURIComponent(
                                          user.sub
                                        )}`}
                                      >
                                        <a className='font-medium text-gray-900 hover:text-gray-700'>
                                          Profile
                                        </a>
                                      </Link>
                                    </li>
                                    <li
                                      key='1'
                                      className='my-2 truncate py-2 text-base hover:bg-gray-50'
                                    >
                                      <Link href={'/preferences'}>
                                        <a className='font-medium text-gray-900 hover:text-gray-700'>
                                          Account Settings
                                        </a>
                                      </Link>
                                    </li>
                                    {/* order history, track order | help phone, chat w us */}
                                    <li
                                      key='2'
                                      className='my-2 py-2 hover:bg-gray-50'
                                    >
                                      {/* <a
                                        onClick={logOut}
                                        className='cursor-pointer whitespace-nowrap text-base font-medium text-gray-900 hover:text-gray-700'
                                      >
                                        Log out
                                      </a> */}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </>
                ) : (
                  <>
                    <a href='/cart'>
                      <SvgShoppingBag className='h-6 w-6' />
                    </a>
                    {/* <a
                      href='/login'
                      className='whitespace-nowrap text-base font-mediumtext-gray-900 hover:text-blue-700'
                    >
                      Sign in
                    </a>
                    <a
                      href='/signup'
                      className='my-2 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
                    >
                      Sign up
                    </a> */}
                  </>
                )}
              </div>
            </div>
            {/* </div> */}

            <Transition
              show={open}
              as={Fragment}
              enter='duration-200 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Popover.Panel
                focus
                static
                className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden'
              >
                <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                  <div className='px-5 pt-5 pb-6'>
                    <div className='flex items-center justify-between'>
                      <div>
                        {/* <img alt="bitcoin logo" draggable="false" src="/images/Bitcoin.png" className={styles.bitcoinLogo} /> */}
                        <img
                          className='h-8 w-auto'
                          src='/images/Bitcoin.png'
                          alt='Workflow'
                        />
                      </div>
                      <div className='-mr-2'>
                        <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                          <span className='sr-only'>Close menu</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className='mt-6'>
                      <nav className='grid gap-y-8'>
                        {user ? (
                          <>
                            {loggedInLinks.map((link, index) => (
                              <Link key={index} href={link.href}>
                                <a
                                  className={
                                    'font-mediumtext-gray-900 text-base hover:text-blue-700' +
                                    ' ' +
                                    `${
                                      router.pathname === link.href ||
                                      currentPage === link.href
                                        ? styles.selected
                                        : ''
                                    }`
                                  }
                                >
                                  {link.text}
                                </a>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <>
                            <a
                              href='/'
                              className='font-mediumtext-gray-900 text-base hover:text-blue-700'
                            >
                              Dad's Beans
                            </a>
                            <a
                              href='/pricing'
                              className='font-mediumtext-gray-900 text-base hover:text-blue-700'
                            >
                              Pricing
                            </a>
                            <a
                              href='/about'
                              className='font-mediumtext-gray-900 text-base hover:text-blue-700'
                            >
                              About Us
                            </a>
                          </>
                        )}
                      </nav>
                    </div>
                  </div>
                  <div className='space-y-6 py-6 px-5'>
                    {/* 
                    sandwhich section 
                  */}
                    {user ? (
                      <>
                        <div className='mr-2'>
                          <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500'>
                            <span className='text-xs font-medium leading-none text-white'>
                              Nickname
                            </span>
                          </span>
                        </div>
                        <div>
                          {/* <a onClick={logOut} className="whitespace-nowrap cursor-pointer text-base font-mediumtext-gray-900 hover:text-blue-700">
                          Log out
                        </a> */}
                        </div>
                      </>
                    ) : (
                      <div>
                        <a
                          href='/signup'
                          className='mb-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                        >
                          Sign up
                        </a>
                        <a
                          href='/login'
                          className='flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 bg-opacity-80 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-70 hover:text-blue-700'
                        >
                          Sign in
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </header>
  )
}

export default Header
