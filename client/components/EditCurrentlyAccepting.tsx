import { useState } from 'react'
import { useAllDonationNames } from '../hooks/useTypes'
import { Types } from '../../models/modelTypes'

interface Props {
  form: Types[]
  handleUpdate: () => void
}

export default function EditCurrentlyAccepting({ form }: Props) {
  const [selectedType, setSelectedType] = useState<string>('')

  const {
    data: DonationNames = [],
    isPending: namesPending,
    isError: namesError,
    error: namesFetchError,
  } = useAllDonationNames()

  if (namesPending)
    return (
      <label className="stats">
        <p>Donation Types:</p>
        <select value={selectedType} disabled>
          {DonationNames.map((donation) => (
            <option key={donation.id} value={donation.name}>
              Loading...
            </option>
          ))}
        </select>
      </label>
    )
  if (namesError) {
    return <span>Error fetching nature names: {namesFetchError.message}</span>
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value)
  }

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
  }

  const handleClick = async () => {}

  return (
    <>
      <label>
        <p>Donation Types:</p>
        <select value={selectedType} onChange={handleChange}>
          <option value="" disabled>
            Select a Type
          </option>
          {DonationNames.map((donation) => (
            <option key={donation.id} value={donation.name}>
              {donation.name}
            </option>
          ))}
        </select>
      </label>
      {form.map((type) => (
        <div key={type.id}>
          <label className="switch">
            {type.name}:
            <input
              type="checkbox"
              name="accepting"
              checked={type.accepting}
              onChange={handleCheckboxChange}
            />
            <span className="slider"></span>
          </label>
          <label>
            <input
              type="checkbox"
              name="urgentlySeeking"
              checked={type.urgentlySeeking}
              onChange={handleCheckboxChange}
            />
            {type.urgentlySeeking}
          </label>
          <button onClick={handleClick}>Delete</button>
        </div>
      ))}
    </>
  )
}
