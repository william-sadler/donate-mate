import { useState } from 'react'
import { useAllDonationNames } from '../hooks/useTypes'

interface Props {
  history: string[]
  setFilter: (types: string[]) => void
}

export default function FilterTypes({ history, setFilter }: Props) {
  const [selectedType, setSelectedType] = useState('')
  const {
    data: donationType = [],
    isPending,
    isError,
    error: typesFetchError,
  } = useAllDonationNames()

  if (isPending) {
    return (
      <section className="mx-0 max-w-3xl pl-0">
        <label className="mb-6 block">
          <h2 className="mb-2 text-xl font-semibold">Filter By:</h2>
          <select
            defaultValue={selectedType}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Donation Type
            </option>
            {donationType.map((type) => (
              <option key={type?.id} value={type?.name}>
                Loading...
              </option>
            ))}
          </select>
        </label>
      </section>
    )
  }

  if (isError) {
    return <span>Error fetching filter names: {typesFetchError.message}</span>
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value
    const duplicateCheck = history.find((type) => type === newType)
    if (duplicateCheck) {
      return setFilter(history)
    }
    setFilter([...history, newType])
    setSelectedType(newType)
  }

  return (
    <section className="mx-0 max-w-3xl pl-0">
      <label className="mb-6 block">
        <select
          value={selectedType}
          onChange={handleChange}
          className="block max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Donation Type
          </option>
          {donationType.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}
