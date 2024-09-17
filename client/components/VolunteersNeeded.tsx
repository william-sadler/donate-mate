import { useOrganisationsById } from '../hooks/useOrganisations'

interface Props {
  id: number
}

export default function VolunteersNeeded({ id }: Props) {
  const { data, isPending, isError, error } = useOrganisationsById(id)

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  const isVolunteeringNeeded = data ? data.volunteeringNeeded : false

  return (
    <div className="volunteersNeeded">
      <div
        className="signalNeeded raleway-bold p-1"
        style={{
          backgroundColor: isVolunteeringNeeded ? '#2f7632' : 'white',
        }}
      >
        {isVolunteeringNeeded ? 'Volunteers Needed' : ''}
      </div>
    </div>
  )
}
