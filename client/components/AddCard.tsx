import { useState, useCallback } from 'react'
import { OrganisationData } from '../../models/modelOrganisations'

interface Props {
  form: OrganisationData
  orgName: string
  orgContactNumber: string
  orgContactEmail: string
  orgLocation: string
  orgWebsite: string
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void
}

export default function AddCard({
  form,
  handleChange,
  orgName,
  orgContactNumber,
  orgContactEmail,
  orgLocation,
  orgWebsite,
}: Props) {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    form.image || '',
  )

  const handleImageChange = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) // Update the image preview
        // Create a new event to pass the file to the parent
        const newEvent = {
          target: {
            name: 'orgImage',
            value: file,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>
        handleChange(newEvent)
      }
      reader.readAsDataURL(file) // Read the image file
    },
    [handleChange],
  )

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageChange(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleImageChange(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200">
      <div className="group relative">
        <img
          className="h-36 w-full rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
          src={imagePreview as string}
          alt={form.name}
        />
        <input
          type="file"
          name="orgImage"
          id="imageUpload"
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          accept="image/*"
          onChange={handleFileInputChange}
          onClick={(e) => e.stopPropagation()}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-gray-500 bg-opacity-50 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-12 w-12 text-white"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
          </svg>
          <p className="text-white">Drag & Drop or Click to Upload</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Organisation Name */}
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="orgName"
          >
            Organisation Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="orgName"
              id="orgName"
              className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={orgName}
              placeholder="Organisation name"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="orgLocation"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="orgLocation"
              id="orgLocation"
              className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={orgLocation}
              placeholder="Address"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="orgContactNumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Contact Number
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="orgContactNumber"
              id="orgContactNumber"
              className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={orgContactNumber}
              placeholder="Contact Number"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact Email */}
        <div>
          <label
            htmlFor="orgContactEmail"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Contact Email
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="orgContactEmail"
              id="orgContactEmail"
              className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={orgContactEmail}
              placeholder="Contact Email"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Website Link */}
        <div>
          <label
            htmlFor="orgWebsite"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Website Link
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="orgWebsite"
              id="orgWebsite"
              className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={orgWebsite}
              placeholder="Website"
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
