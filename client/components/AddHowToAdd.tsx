import { OrganisationData } from '../../models/modelOrganisations'

interface Props {
  form: OrganisationData
  orgHowToAdd: string
  handleChange: () => void
}

export default function AddHowToAdd({
  form,
  orgHowToAdd,
  handleChange,
}: Props) {
  return (
    <>
      <input
        type="text"
        name="orgHowToAdd"
        id="orgInput"
        value={orgHowToAdd}
        placeholder={form.method}
        onChange={handleChange}
        aria-autocomplete="list"
      />
    </>
  )
}
