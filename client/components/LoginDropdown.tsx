import { useEffect, useRef, useState } from 'react'

interface Props {
  options: { id: number; name: string }[] // Assuming orgs have id and name
  onSelect: (id: number) => void // Callback when an option is selected
}

export default function LoginDropdown({ options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Filter options based on search term
    setFilteredOptions(
      options
        .filter((option) =>
          option.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5), // Show only top 5 results
    )
  }, [searchTerm, options])

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSelect = (id: number) => {
    setSelectedOption(id)
    onSelect(id)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button className="custom-join-button" onClick={handleToggle}>
        {selectedOption ? `Request Sent` : 'Join'}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          <input
            type="text"
            placeholder="Search organisations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none"
          />
          <ul className="max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  className="w-full px-4 py-2 text-left hover:bg-gray-200"
                  onClick={() => handleSelect(option.id)}
                >
                  {option.name}
                </button>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
