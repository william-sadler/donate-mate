interface Props {
  filtered: string
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FilterTag({ filtered, onDelete }: Props) {
  return (
    <div className="bg-blue-200 text-blue-800 inline-flex items-center space-x-2 rounded-full border border-transparent px-3 py-1 text-sm font-medium transition-colors duration-300 hover:border-red-500">
      <button
        name={filtered}
        onClick={onDelete}
        className="text-blue-800 hover:text-blue-900 flex items-center space-x-2 focus:outline-none"
        aria-label={`Delete ${filtered}`}
      >
        <span>{filtered}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-500 h-4 w-4 transition-colors duration-300 hover:text-red-500"
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
