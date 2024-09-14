import { useState } from 'react'
import { useAllDonationNames } from '../hooks/useTypes'

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
    setSelectedType(event.target.value)
    setfilter([...history, event.target.value])
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget
    setSelectedType(name)
    setfilter(history.filter((type) => type !== name))
  }

  return (
    <>
      <h1>You ready to filter???</h1>
      <label className="filterByType">
        <h2 className="heading-2">Filter By:</h2>
        <select value={selectedType} onChange={handleChange}>
          <option value="">Donation Type</option>
          {donationType.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      {history.map((filtered: string) => (
        <>
          <div>
            {filtered}
            <button name={filtered} onClick={handleDelete}>
              x
            </button>
          </div>
        </>
      ))}
    </>
  )
}
