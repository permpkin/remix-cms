import { Switch } from "@headlessui/react"
import { useState } from "react"
import { classNames } from "~/utils"

interface Props {
  label: string
  description?: string
  type: string
  value: string | false
}

export const SettingsField = ({ label, description, type, value }:Props) => {
  return (
    <>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <span className="flex-grow">
          {
            Boolean(value) ? (
              value
            ) : (
              <span className="text-gray-400">not set</span>
            )
          }
        </span>
        <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
          {
            Boolean(value) ? (
              <>
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Update
                </button>
                <span className="text-gray-300" aria-hidden="true">
                  |
                </span>
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Remove
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Edit
              </button>
            )
          }
        </span>
      </dd>
    </>
  )
}