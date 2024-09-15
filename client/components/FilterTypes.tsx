import { useState } from 'react'
import { useAllDonationNames } from '../hooks/useTypes'
import FilterTag from './FilterTag'

interface Props {
  setfilter: (types: string[]) => void
  history: string[]
}
export default function FilterTypes({ setfilter, history }: Props) {
  const [selectedType, setSelectedType] = useState('')

  const {
    data: donationType = [],
    isPending: typesPending,
    isError: typesError,
    error: typesFetchError,
  } = useAllDonationNames()

  if (typesPending)
    return (
      <section className="mx-auto max-w-3xl p-6">
        <h2 className="heading-2 mb-4">Ready to donate?</h2>
        <label className="mb-6 block">
          <h2 className="mb-2 text-xl font-semibold">Filter By:</h2>
          <select
            defaultValue={selectedType}
            className="focus:ring-blue-500 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2"
          >
            <option>Donation Type</option>
            {donationType.map((type) => (
              <option key={type?.id} value={type?.name}>
                Loading...
              </option>
            ))}
          </select>
        </label>
      </section>
    )
  if (typesError) {
    return <span>Error fetching filter names: {typesFetchError.message}</span>
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const duplicateCheck = history.find((type) => type === event.target.value)
    setSelectedType(event.target.value)
    if (!duplicateCheck) {
      setfilter([...history, event.target.value])
    }
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget
    setSelectedType(name)
    setfilter(history.filter((type) => type !== name))
  }

  return (
    <section className="mx-auto max-w-3xl p-6">
      <h2 className="heading-2-caveat mb-4">Ready to donate?</h2>
      <label className="mb-6 block">
        <h3 className="heading-4 mb-2 font-semibold">Filter By:</h3>
        <select
          value={selectedType}
          onChange={handleChange}
          className="focus:ring-blue-500 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2"
        >
          <option>Donation Type</option>
          {donationType.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      {history.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {history.map((filtered, i) => (
            <FilterTag key={i} filtered={filtered} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
