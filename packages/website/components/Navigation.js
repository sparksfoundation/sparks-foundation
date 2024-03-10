import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Discord, Notion, Telegram, Twitter } from './icons'
import Logo from './Logo'
import Noise from './Noise'
import Triangle from './Triangle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Articles', href: '#articles' },
  { label: 'Governance', href: '#governance' },
]

const socials = [
  { icon: Twitter, href: 'https://twitter.sparks.foundation' },
  { icon: Discord, href: 'https://discord.sparks.foundation' },
  { icon: Telegram, href: 'https://telegram.sparks.foundation' },
  { icon: Notion, href: 'https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e' },
]

export default function Navigation() {
  return (
    <Disclosure as="nav" className="fixed w-full z-10 drop-shadow-lg md:drop-shadow-none">
      {({ open }) => (
        <>
          <div className="bg-slate-950 h-full w-full absolute overflow-hidden z-0 top-0 left-0">
            <Noise className="h-10 w-10 mr-1" />
            <Triangle className="hidden lg:block left-1/4 top-0 -translate-x-1/2 -translate-y-1/2" solid />
          </div>

          <div className="mx-auto max-w-7xl py-2 px-5 relative">
            <div className="flex h-16 items-center justify-between">
              <a href="#">
                <div className="flex-shrink-0 flex items-center">
                  <Logo className="h-10 w-10 mr-1" />
                  <h2 className="text-slate-50 font-bold text-xl">
                    SPARKS
                  </h2>
                </div>
              </a>

              <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-slate-50", Default: "text-gray-300 hover:bg-gray-700 hover:text-slate-50" */}
                  {links.map(({ label, href }, index) => (
                    <a
                      href={href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-slate-50 hover:bg-violet-50 hover:bg-opacity-5"
                      key={`desktop-link-${index}`}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden md:ml-6 md:block">
                <div className="flex items-center">
                  {/* Social Media Links */}
                  {socials.map(({ icon: Icon, href }, index) => (
                    <a
                      href={href}
                      target="_blank"
                      key={`desktop-social-${index}`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-50 focus:outline-none">
                  <span className="sr-only">open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden relative">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-slate-50", Default: "text-gray-300 hover:bg-gray-700 hover:text-slate-50" */}
              {links.map(({ label, href }, index) => (
                <Disclosure.Button
                  as="a"
                  href={href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-slate-50 hover:bg-violet-50 hover:bg-opacity-10"
                  key={`mobile-link-${index}`}
                >
                  {label}
                </Disclosure.Button>
              ))}
              <div className='p-4'>
                <div className="flex items-center mx-3 my-2 justify-center">
                  {/* Social Media Links */}
                  {socials.map(({ icon: Icon, href }, index) => (
                    <a
                      href={href}
                      target="_blank"
                      key={`mobile-social-${index}`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
