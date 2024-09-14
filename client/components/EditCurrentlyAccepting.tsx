import { useState } from 'react'
import { useAllDonationNames } from '../hooks/useTypes'
import { Types } from '../../models/modelTypes'

interface Props {
  orgId: number
  form: Types[] | []
  deleted: Types[] | []
  handleUpdate: (typeData: Types[], deletedData?: Types[]) => void
}

export default function EditCurrentlyAccepting({
  orgId,
  form,
  deleted,
  handleUpdate,
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
    if (!form.find((type) => type.name === event.target.value)) {
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
        handleUpdate(
          form.map((type) => {
            if (type.name === id) {
              return {
                ...type,
                accepting: !updatedType.accepting,
                urgentlySeeking:
                  updatedType.accepting === false
                    ? updatedType.urgentlySeeking
                    : false,
                date: `${new Date().getTime()}`,
              }
            }
            return type
          }),
        )
        break
      case 'urgentlySeeking':
        handleUpdate(
          form.map((type) => {
            if (type.name === id) {
              return {
                ...type,
                accepting: updatedType.accepting,
                urgentlySeeking: updatedType.accepting
                  ? !updatedType.urgentlySeeking
                  : false,
                date: `${new Date().getTime()}`,
              }
            }
            return type
          }),
        )
        break
    }
  }

  const handleClick = async (name: string) => {
    handleUpdate(
      [...form.filter((type) => type.name !== name)],
      [...deleted, ...form.filter((type) => type.name === name)],
    )
  }

  return (
    <>
      <label className="mb-4 block">
        <p className="text-sm font-medium text-gray-900">Donation Types:</p>
        <select
          value={selectedType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
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
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">Donations</div>
          <div className="flex items-center space-x-2">Status</div>
        </div>
        {form.map((type, i) => (
          <div key={i} className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{type.name}</p>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="accepting"
                id={type.name}
                checked={type.accepting}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <span
                className={`relative inline-flex cursor-pointer items-center border-slate-500 ${
                  type.accepting ? 'bg-green-500' : 'bg-gray-300'
                } h-6 w-12 rounded-full transition-colors duration-200 ease-in-out`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full border-slate-500 bg-slate-100 transition-transform ${
                    type.accepting ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></span>
              </span>
              <span className="text-sm font-medium text-gray-900">
                {type.accepting ? 'Currently Accepting' : 'Currently Full'}
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="urgentlySeeking"
                id={type.name}
                checked={type.urgentlySeeking}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <span
                className={`h-4 w-4 rounded-full ${
                  type.urgentlySeeking
                    ? 'bg-white-600 border-red-600'
                    : 'border-gray-300'
                } border-4`}
              ></span>
              <span className="text-sm font-medium text-gray-900">
                {type.urgentlySeeking ? 'Urgently' : 'Seeking'}
              </span>
            </label>
            <button
              type="button"
              name="delete"
              onClick={() => handleClick(type.name)}
              className="text-red-500 transition duration-200 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
