import { useTypesById } from '../hooks/useTypes'

interface Props {
  id: number
}

export default function CarUrgentlyStatus({ id }: Props) {
  const { data, isPending, isError, error } = useTypesById(id)

  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    data.find((type) => type.urgentlySeeking) && (
      <div className="circle-container">
        <div className="circle heading-3"></div>
      </div>
    )
  )
}
