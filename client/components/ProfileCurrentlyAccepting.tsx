import { Types } from '../../models/modelTypes'

interface Props {
  typeData: Types[]
}

export default function CurrentlyAccepting({ typeData }: Props) {
  return (
    <div className="currentlyAccepting">
      <h2>Currently Accepting</h2>
      <ul>
        {typeData.map((type) => (
          <li key={type.id}>
            <p>{type.name}</p>
            {type.urgentlySeeking ? (
              <p>Urgently Seeking</p>
            ) : type.accepting ? (
              <p>Accepting</p>
            ) : (
              <p>Not Currently Accepting</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
