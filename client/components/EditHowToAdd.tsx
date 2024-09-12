import { Organisation } from '../../models/modelOrganisations'

interface Props {
  form: Organisation
  orgHowToAdd: string
  handleChange: () => void
}

export default function EditHowToAdd({
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
