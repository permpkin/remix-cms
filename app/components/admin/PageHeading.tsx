import { Link, useLocation } from "@remix-run/react"
import { ReactNode } from "react"

interface Props {
  crumbs: { label: string, path: string }[]
  children?: ReactNode
}

export const PageHeading = ({ crumbs, children }:Props) => {

  return (
    <div className="sm:flex sm:items-center border-b border-b-gray-200 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 pb-4">
      <div className="sm:flex-auto">
        <div className="flex">
          {
            crumbs.map((crumb, index) => (
              <>
              { index > 0 && <span className='text-gray-400 mx-3'>/</span> }
              {
                index === (crumbs.length-1) ? (
                  <h1 className="text-xl font-semibold text-gray-900 dark-mode:text-gray-100">{crumb.label}</h1>
                ) : (
                  <Link to={`/admin${crumb.path}`} className="text-xl font-semibold text-gray-900 dark-mode:text-gray-100 hover:text-gray-500">{crumb.label}</Link>
                )
              }
              </>
            ))
          }
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        {children}
      </div>
    </div>
  )
} 