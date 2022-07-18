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
      className="inline-flex items-center rounded bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-100 hover:bg-indigo-800 hover:text-indigo-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  )
}