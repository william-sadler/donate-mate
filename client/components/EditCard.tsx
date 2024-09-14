import { Organisation } from '../../models/modelOrganisations'

interface Props {
  form: Organisation
  orgName: string
  orgContactDetails: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function EditCard({
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
