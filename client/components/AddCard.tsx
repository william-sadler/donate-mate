import { OrganisationData } from '../../models/modelOrganisations'

interface Props {
  form: OrganisationData
  orgName: string
  orgContactDetails: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AddCard({
  form,
  handleChange,
  orgName,
  orgContactDetails,
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
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="orgAddress"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <div className="mt-2">
            <div className="relative">
              <input
                type="text"
                name="orgAddress"
                id="orgAddress"
                className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value=""
                placeholder="Address"
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <label
            htmlFor="orgContactDetails"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Contact Details
          </label>
          <div className="mt-2">
            <div className="relative">
              <input
                type="text"
                name="orgContactDetails"
                id="orgContactDetails"
                className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={orgContactDetails}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Website Link */}
        <div>
          <label
            htmlFor="orgWebsiteLink"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Website Link
          </label>
          <div className="mt-2">
            <div className="relative">
              <input
                type="text"
                name="orgWebsiteLink"
                id="orgWebsiteLink"
                className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value=""
                placeholder="Website Link"
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
