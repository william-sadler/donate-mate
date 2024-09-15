interface Props {
  filtered: string
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FilterTag({ filtered, onDelete }: Props) {
  return (
    <div className="inline-flex w-max items-center space-x-2 text-nowrap rounded-full border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-blue-800 transition-colors duration-300 hover:border-red-500">
      <button
        name={filtered}
        onClick={onDelete}
        className="flex items-center space-x-1 text-blue-800 hover:text-blue-900 focus:outline-none"
        aria-label={`Delete ${filtered}`}
      >
        <span className="heading-4">{filtered}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-blue-500 transition-colors duration-300 hover:text-red-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
