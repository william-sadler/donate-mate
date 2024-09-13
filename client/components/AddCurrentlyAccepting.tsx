import { useState } from 'react'
import { useAllDonationNames } from '../hooks/useTypes'
import { Types } from '../../models/modelTypes'

interface Props {
  orgId: number
  form: Types[] | []
  orgDonationTypes: Types[]
  handleUpdate: (typeData: Types[]) => void
  handleDelete: (typeData: Types[]) => void
}

export default function AddCurrentlyAccepting({
  orgId,
  form,
  orgDonationTypes,
  handleUpdate,
  handleDelete,
}: Props) {
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
    handleUpdate([
      ...form,
      {
        id: 0,
        name: event.target.value,
        accepting: true,
        urgentlySeeking: false,
        organisationId: orgId,
        date: `${new Date().getTime()}`,
      },
    ])
  }

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, id } = event.target
    const updatedType = form.find((type) => type.name === id)
    if (updatedType === undefined) {
      return
    }
    switch (name) {
      case 'accepting':
        handleUpdate([
          ...form.filter((type) => type.name === id),
          {
            id: updatedType.id,
            name: updatedType.name,
            accepting: !updatedType.accepting,
            urgentlySeeking: updatedType.accepting
              ? updatedType.urgentlySeeking
              : false,
            organisationId: orgId,
            date: `${new Date().getTime()}`,
          },
        ])
        break
      case 'urgentlySeeking':
        handleUpdate([
          ...form.filter((type) => type.name === id),
          {
            id: updatedType.id,
            name: updatedType.name,
            accepting: updatedType.accepting,
            urgentlySeeking: updatedType.accepting
              ? !updatedType.urgentlySeeking
              : false,
            organisationId: orgId,
            date: `${new Date().getTime()}`,
          },
        ])
        break
    }
  }

  const handleClick = async (name: string) => {
    handleUpdate([...form.filter((type) => type.name === name)])
    handleDelete([...form.filter((type) => type.name !== name)])
  }

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
      {(!form ? orgDonationTypes : form).map((type) => (
        <div key={type.id}>
          <label className="switch">
            {type.name}:
            <input
              type="checkbox"
              name="accepting"
              id={type.name}
              checked={type.accepting}
              onChange={handleCheckboxChange}
            />
            <span className="slider"></span>
          </label>
          <label>
            <input
              type="checkbox"
              name="urgentlySeeking"
              id={type.name}
              checked={type.urgentlySeeking}
              onChange={handleCheckboxChange}
            />
            {type.urgentlySeeking}
          </label>
          <button onClick={() => handleClick(type.name)}>Delete</button>
        </div>
      ))}
    </>
  )
}
