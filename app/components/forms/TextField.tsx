interface Props {
  label: string
  placeholder?: string
  description?: string
  type?: string
  value?: string
}
export const TextField = ({ label, description, placeholder, type = "text", value = "" }: Props) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          aria-describedby="description"
          defaultValue={value}
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
  )
}