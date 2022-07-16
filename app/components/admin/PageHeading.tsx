import { Link } from "@remix-run/react"
import { Fragment, ReactNode } from "react"

interface Props {
  crumbs: { label: string, path: string }[]
  children?: ReactNode
}

export const PageHeading = ({ crumbs, children }:Props) => {

  return (
    <div className="sm:flex sm:items-center h-12 border-b border-b-gray-200 px-2 pl-4">
      <div className="sm:flex-auto">
        <div className="flex">
          {
            crumbs.map((crumb, index) => (
              <Fragment key={`crumb-${index}`}>
              { index > 0 && <span className='text-gray-400 mx-3'>/</span> }
              {
                index === (crumbs.length-1) ? (
                  <h1 className="text-md font-semibold text-gray-900 dark-mode:text-gray-100">{crumb.label}</h1>
                ) : (
                  <Link to={`/admin${crumb.path}`} className="text-md font-semibold text-gray-900 dark-mode:text-gray-100 hover:text-gray-500">{crumb.label}</Link>
                )
              }
              </Fragment>
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