import { Organisation } from '../../models/modelOrganisations'

interface Props {
  form: Organisation
  orgAbout: string
  handleChange: () => void
}

export default function EditAbout({ form, orgAbout, handleChange }: Props) {
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
