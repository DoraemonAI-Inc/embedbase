import { Dialog, Transition } from '@headlessui/react'
import {
  Bars2Icon,
  Bars3CenterLeftIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  CreditCardIcon,
  HomeIcon,
  XMarkIcon,
  PlayIcon,
  UserCircleIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { classNames } from '../lib/utils'
import Breadcrumbs from './Breadcrumbs'
import CommunityHubButton from './CommunityHubButton'
import { User } from './User'

const navigation = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: HomeIcon,
    current: true,
    color: 'blue-500', // Adding blue-100 class for blue background
  },
  {
    path: '/dashboard/playground',
    name: 'Playground',
    icon: PlayIcon,
    current: false,
    color: 'purple-500', // Adding purple-300 class for purple background
  },

  {
    path: '/dashboard/pricing',
    name: 'Billing',
    icon: CreditCardIcon,
    current: false,
    color: 'green-500', // Adding green-300 class for green background
  },
  {
    path: 'https://discord.gg/pMNeuGrDky',
    name: 'Get Help',
    icon: QuestionMarkCircleIcon,
    current: false,
    color: 'pink-500', // Adding pink-300 class for pink background
  },
  {
    path: 'https://docs.embedbase.xyz',
    name: 'Docs',
    icon: BookOpenIcon,
    current: false,
    color: 'red-500', // Adding red-300 class for red background
  },
  {
    path: '/dashboard/tutorial',
    name: 'Quickstart',
    icon: Bars2Icon,
    current: false,
    color: 'yellow-500', // Adding yellow-300 class for yellow background
  },
]

// We update the className property in the Link component to use the color value defined in the navigation array
const DesktopSidebar = ({ current }) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-purple-700 lg:border-opacity-25 lg:pt-5 lg:pb-4">
      <div className="flex justify-center">
        <Image
          height={100}
          width={130}
          src="/newlogo2.png"
          alt="embedbase logo"
        />
      </div>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex h-0 flex-1 flex-col overflow-y-auto pt-1">
        {/* Navigation */}
        <nav className="mt-6 px-3 flex-col flex justify-between h-full">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={classNames(
                  item.path === current
                    ? `text-purple-700 bg-purple-200`
                    : `text-gray-700 `,
                  // Using template literals to add the color value defined in the navigation array
                  `group flex cursor-pointer items-center rounded-md px-3 py-2  text-sm font-medium tracking-wide	`
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    item.path === current
                      ? `text-purple-600`
                      : `text-gray-700 g`,
                    `mr-2 h-4 w-4 flex-shrink-0 stroke-2 font-bold d`
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>

        <User />
        </nav>
      </div>
    </div>
  )
}

export default function Dashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const current = router?.pathname

  /* should extract the following in a separate component */

  return (
    <>
      <div className="min-h-full bg-white">
        <DesktopSidebar current={current} />
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="px-2">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <Link
                            href={item.path}
                            key={item.name}
                            className={classNames(
                              item.path === current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex cursor-pointer items-center rounded-md px-2 py-2 text-base font-bold leading-5 '
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.path === current
                                  ? 'text-gray-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 h-6 w-6 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-purple-700 border-opacity-25 bg-white lg:hidden">
            <button
              type="button"
              className="border-r border-purple-700 border-opacity-25 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 bg-white px-4">
            {/* Page title & actions */}
            {/* Pinned projects */}
            <div className="mt-6 flex w-full justify-between">
              <Breadcrumbs />
              <CommunityHubButton />
            </div>

            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
