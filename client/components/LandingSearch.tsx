import { useState, useEffect, useRef, SetStateAction } from 'react'
import { useAllOrganisations } from '../hooks/useOrganisations'

interface Props {
  onSubmit: (orgName: SetStateAction<string[]>) => void
}

export default function LandingSearch({ onSubmit }: Props) {
  const [newItem, setNewItem] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [orgNames, setAutoComplete] = useState<string[]>([])
  const { isPending, isError, data, error } = useAllOrganisations()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isPending) return <p className="text-gray-500">Loading...</p>
  if (isError)
    return <span className="text-red-500">Error: {error.message}</span>

  const searchResults = data

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setNewItem('')
      onSubmit(orgNames)
      setAutoComplete([])
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = async (orgName: string) => {
    try {
      setNewItem('')
      onSubmit([orgName])
      setAutoComplete([])
      setShowDropdown(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewItem(value)
    setShowDropdown(value.length > 0 && isNaN(Number(value)))
    if (value === '' || !isNaN(Number(value))) {
      setAutoComplete([])
      return
    }
    const reg = new RegExp(value, 'i')
    setAutoComplete(
      searchResults
        .filter((term) => reg.test(term.name))
        .map((term) => term.name),
    )
  }

  return (
    <div className="relative w-full max-w-lg" ref={containerRef}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col"
        aria-label="search for organisation"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            name="myOrganisation"
            id="myInput"
            value={newItem}
            placeholder="Organisation"
            onChange={handleChange}
            aria-autocomplete="list"
            aria-label="search for organisation"
            aria-controls="myInputautocomplete-list"
            className="focus:ring-blue-500 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 h-5 w-5 cursor-pointer text-gray-500"
            viewBox="0 0 24 24"
            aria-label="Submit search"
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
          </svg>
          {showDropdown && orgNames.length > 0 && (
            <div
              id="myInputautocomplete-list"
              className="absolute top-10 z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg"
              role="listbox"
            >
              {orgNames.slice(0, 5).map((name) => (
                <button
                  type="button"
                  onClick={() => handleClick(name)}
                  key={name}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
