import { Types } from '../../models/modelTypes'

interface Props {
  typeData: Types[]
}

export default function CurrentlyAccepting({ typeData }: Props) {
  return (
    <div className="currentlyAccepting">
      <h2 className="heading-4">Currently Accepting</h2>
      <ul>
        {typeData.map((type) => (
          <li key={type.id}>
            <p className="paragraph">{type.name}</p>
            {type.urgentlySeeking ? (
              <p className="paragraph">Urgently Seeking</p>
            ) : type.accepting ? (
              <p className="paragraph">Accepting</p>
            ) : (
              <p className="paragraph">Not Currently Accepting</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
