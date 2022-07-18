interface Props {
  label: string
  placeholder?: string
  description?: string
  value?: string
  slug?: string
}
export const SlugField = ({ label, description, placeholder, value = "", slug = "" }: Props) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 isolate -space-y-px rounded-md shadow-sm bg-white">
        <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder={placeholder}
            aria-describedby="description"
            defaultValue={value}
          />
        </div>
        <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label htmlFor={`${label}-slug`} className="block text-xs font-medium text-gray-900">
            Slug
          </label>
          <input
            type="text"
            name={`${label}-slug`}
            id={`${label}-slug`}
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder={`${label} Slug`}
            defaultValue={slug}
          />
        </div>
        {
          description && (
            <p className="mt-2 text-sm text-gray-500" id="description">
              {description}
            </p>
          )
        }
      </div>
    </>
  )
}