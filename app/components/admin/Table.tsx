import { useEffect, useRef, useState } from 'react'
import { classNames } from '~/utils'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

interface Props {
  columns: string[]
  data: { [key: string]: any }[]
}

export const Table = ({ columns, data }:Props) => {

  const checkbox = useRef<any>()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>([])

  useEffect(() => {
    const isIndeterminate = selectedRow.length > 0 && selectedRow.length < people.length
    setChecked(selectedRow.length === people.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current)
      checkbox.current.indeterminate = isIndeterminate
  }, [selectedRow])

  function toggleAll() {
    setSelectedRow(checked || indeterminate ? [] : people)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {selectedRow.length > 0 && (
              <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Bulk edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Delete all
                </button>
              </div>
            )}
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500 sm:left-6"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  {
                    columns.map((column, index) => 
                      <th key={`${column}-${index}`} scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                        {column}
                      </th>
                    )
                  }
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item, index) => (
                  <tr key={index} className={selectedRow.includes(item) ? 'bg-gray-50' : undefined}>
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedRow.includes(item) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-gray-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500 sm:left-6"
                        value={item.email}
                        checked={selectedRow.includes(item)}
                        onChange={(e) =>
                          setSelectedRow(
                            e.target.checked
                              ? [...selectedRow, item]
                              : selectedRow.filter((p: any) => p !== item)
                          )
                        }
                      />
                    </td>
                    {
                      columns.map((column) =>
                        <td
                          key={`${column}-${index}`}
                          className={classNames(
                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                            selectedRow.includes(item) ? 'text-gray-600' : 'text-gray-900'
                          )}
                        >
                          {item[column]}
                        </td>
                      )
                    }
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" className="text-gray-600 hover:text-gray-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}