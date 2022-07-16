import { Link } from "@remix-run/react"
import { config } from "~/config"

export const BrandLogo = () => {
  return (
    <Link to={'/'}>
      <h2 className="text-center text-lg font-extrabold text-gray-900 dark-mode:text-gray-400">{config.APP_NAME}</h2>
    </Link>
  )
}