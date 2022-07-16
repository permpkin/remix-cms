import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }:Props) => {
  return (
    <main className="flex-1 flex flex-col relative z-0 overflow-y-auto focus:outline-none xl:order-last">
      {children}
    </main>
  )
} 