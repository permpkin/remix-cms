import type { MouseEventHandler, ReactNode } from "react"

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}
export const Button = ({ onClick, children }:Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded bg-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  )
}