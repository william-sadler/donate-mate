import { useTypesById } from '../hooks/useTypes'

interface Props {
  id: number
}

export default function CardTypes({ id }: Props) {
  const { data, isLoading, isError, error } = useTypesById(id)

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <ul className="card-tags">
      {data?.map((type) => (
        <li
          key={type.id}
          className="paragraph border-blue-300 bg-blue-100 text-blue-800 rounded-lg border px-3 py-1 text-sm font-medium"
        >
          {type.name}
        </li>
      ))}
    </ul>
  )
}
