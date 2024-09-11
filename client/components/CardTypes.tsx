import { useTypes } from '../hooks/useTypes'

import { Types } from '../../models/modelTypes'

interface Props {
  id: number
}

export default function CardTypes({ id }: Props) {
  const { data, isLoading, isError, error } = useTypes(id)

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <ul>
        {data?.map((type: Types) => (
          <li key={type.id}>
            <h2>{type.name}</h2>
          </li>
        ))}
      </ul>
    </>
  )
}
