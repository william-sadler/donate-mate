import { useTypes } from '../hooks/useTypes'

interface Props {
  id: number
}

export default function CarUrgentlyStatus({ id }: Props) {
  const { data, isPending, isError, error } = useTypes(id)

  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    data.find((type) => type.urgentlySeeking) && (
      <div className="red-cycle">
        <div className="circle"></div>
      </div>
    )
  )
}
