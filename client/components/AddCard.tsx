import { OrganisationData } from '../../models/modelOrganisations'

interface Props {
  form: OrganisationData
  orgName: string
  orgContactDetails: string
  handleChange: () => void
}

export default function AddCard({
  form,
  orgName,
  orgContactDetails,
  handleChange,
}: Props) {
  return (
    <>
      <img className="image" src={form.image} alt={form.name} />
      <input
        type="text"
        name="orgName"
        id="orgInput"
        value={orgName}
        placeholder={form.name}
        onChange={handleChange}
        aria-autocomplete="list"
      />
      <input
        type="text"
        name="orgAddress"
        id="orgInput"
        value={''}
        placeholder=""
        aria-autocomplete="list"
        disabled
      />
      <input
        type="text"
        name="orgContactDetails"
        id="orgInput"
        value={orgContactDetails}
        placeholder={form.contactDetails}
        onChange={handleChange}
        aria-autocomplete="list"
      />
      <input
        type="text"
        name="orgWebsiteLink"
        id="orgInput"
        value=""
        placeholder=""
        aria-autocomplete="list"
        disabled
      />
    </>
  )
}
