import { OrganisationData } from '../../models/modelOrganisations'

interface Props {
  form: OrganisationData
  orgName: string
  orgContactNumber: string
  orgContactEmail: string
  orgLocation: string
  orgWebsite: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
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
  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200">
      <img
        className="h-32 w-full rounded-t-lg object-cover"
        src={form.image}
        alt={form.name}
      />

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
            <div className="relative">
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
            <div className="relative">
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
            <div className="relative">
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
            <div className="relative">
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
            <div className="relative">
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
    </div>
  )
}
