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
    // isPending: typesPending,
    // isError: typesError,
    // error: typesFetchError,
  } = useAllDonationNames()

  console.log(donationType)

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
      <h1 className="mb-4 text-2xl font-bold">You ready to filter???</h1>
      <label className="mb-6 block">
        <h2 className="mb-2 text-xl font-semibold">Filter By:</h2>
        <select
          value={selectedType}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Donation Type</option>
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
