import { OrganisationData } from '../../models/modelOrganisations'

interface Props {
  form: OrganisationData
  orgAbout: string
  handleChange: () => void
}

export default function AddAbout({ form, orgAbout, handleChange }: Props) {
  return (
    <>
      <input
        type="text"
        name="orgAbout"
        id="orgInput"
        value={orgAbout}
        placeholder={form.about}
        onChange={handleChange}
        aria-autocomplete="list"
      />
    </>
  )
}
