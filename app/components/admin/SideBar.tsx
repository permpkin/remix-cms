import {
  ChevronDownIcon,
  ChevronRightIcon,
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
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <BrandLogo/>
          </div>
          <nav aria-label="Sidebar" className="mt-5">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <>
                    <Link
                      to={`${config.ADMIN_URL}${item.href}`}
                      className={classNames(
                        item.active
                          ? `bg-indigo-600 text-indigo-50`
                          : (
                            item.activeChild ?
                            'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800 dark-mode:hover:text-gray-400' :
                            'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark-mode:text-gray-400 dark-mode:hover:text-gray-200'
                          ),
                        'group flex items-center justify-between px-3 py-2 text-xs font-medium'
                      )}
                    >
                      <span className='flex items-center'>
                        <item.icon
                          className={classNames(
                            item.active ? 'text-gray-300' : 'text-gray-600 group-hover:text-gray-800 dark-mode:group-hover:text-gray-400 dark-mode:text-gray-400 dark-mode:hover:text-gray-200',
                            'mr-2 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                      {item.name}
                      </span>
                      {
                        item.children && (
                          item.active || item.activeChild ? (
                            <ChevronDownIcon className='w-3 h-3'/>
                          ) : (
                            <ChevronRightIcon className='w-3 h-3'/>
                          )
                        )
                      }
                    </Link>
                    <div className='bg-white dark-mode:bg-gray-800 overflow-hidden'>
                      {
                        (item.active || item.activeChild) && item.children?.map((child) => (
                          <Link
                            key={`${item.name}_${child.name}`}
                            to={`${config.ADMIN_URL}${child.href}`}
                            className={classNames(
                              child.active
                              ? 'bg-indigo-600 text-indigo-50'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark-mode:hover:text-gray-400',
                              'group flex items-center px-1 py-2 text-xs font-medium',
                              'pl-9'
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