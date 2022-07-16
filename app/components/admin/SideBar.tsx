import {
  CogIcon,
  DocumentTextIcon,
  HomeIcon,
  PhotographIcon,
  ShoppingCartIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { Link, useLocation } from '@remix-run/react'
import { useMemo } from 'react'
import { config } from '~/config'
import { classNames } from '~/utils'
import { BrandLogo } from '../BrandLogo'

interface MenuItem {
  name: string
  href: string
  icon?: any,
  active?: boolean,
  activeChild?: boolean,
  children?: MenuItem[]
}

export const SideBar = () => {

  const location = useLocation()

  const navigation = useMemo(() => {

    const pathname = location.pathname.replace(`${config.ADMIN_URL}`,'')

    const items: MenuItem[] = [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
      { name: 'Files', href: '/files', icon: PhotographIcon },
      { name: 'Pages', href: '/pages', icon: DocumentTextIcon },
      { name: 'Store', href: '/store', icon: ShoppingCartIcon, children: [
        { name: 'Products', href: '/store/products' },
        { name: 'Customers', href: '/store/customers' },
        { name: 'Orders', href: '/store/orders' }
      ] },
      { name: 'Users', href: '/users', icon: UserGroupIcon },
      { name: 'Settings', href: '/settings', icon: CogIcon }
    ]

    function parseMenuItem(menu_item: MenuItem) {
      menu_item.active = menu_item.href === '/' ? pathname === '/' : (pathname === menu_item.href)
      menu_item.activeChild = menu_item.href === '/' ? false : (pathname.indexOf(menu_item.href) == 0)
      if (menu_item?.children) {
        menu_item.children.map(parseMenuItem)
      }
      return menu_item
    } 
    
    return items.map(parseMenuItem)

  }, [location])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark-mode:border-gray-900 bg-gray-100 dark-mode:bg-gray-900">
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <BrandLogo/>
          </div>
          <nav aria-label="Sidebar" className="mt-5">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <>
                    <Link
                      to={`${config.ADMIN_URL}${item.href}`}
                      className={classNames(
                        item.active
                          ? `bg-gray-800 text-gray-100 ${item.children?.length ? 'rounded-b-none' : ''}`
                          : (
                            item.activeChild ?
                            'bg-gray-300 dark-mode:bg-gray-800 text-gray-600 hover:bg-gray-400 dark-mode:hover:bg-gray-700 hover:text-gray-800 dark-mode:hover:text-gray-400 rounded-b-none' :
                            'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark-mode:hover:bg-gray-700 dark-mode:text-gray-400 dark-mode:hover:text-gray-200'
                          ),
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.active ? 'text-gray-300' : 'text-gray-600 group-hover:text-gray-800 dark-mode:group-hover:text-gray-400 dark-mode:text-gray-400 dark-mode:hover:text-gray-200',
                          'mr-4 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                    <div className='rounded-b-md bg-white dark-mode:bg-gray-800 overflow-hidden'>
                      {
                        (item.active || item.activeChild) && item.children?.map((child) => (
                          <Link
                            key={`${item.name}_${child.name}`}
                            to={`${config.ADMIN_URL}${child.href}`}
                            className={classNames(
                              child.active
                                ? 'bg-gray-800 text-gray-100'
                                : 'text-gray-600 hover:bg-gray-50 dark-mode:hover:bg-gray-700 hover:text-gray-900 dark-mode:hover:text-gray-400',
                              'group flex items-center px-2 py-2 text-sm font-medium rounded-none'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))
                      }
                    </div>
                  </>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}