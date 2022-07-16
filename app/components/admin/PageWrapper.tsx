import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }:Props) => {
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
      <div className="px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  )
} 