import { Types } from '../../models/modelTypes'

interface Props {
  typeData: Types[]
}

export default function CurrentlyAccepting({ typeData }: Props) {
  return (
    <div className="currentlyAccepting border-yellow yellow-shadow shadow-xlg container mt-10 border p-4">
      <h2 className="heading-4 p-2 pb-3">How you can help us:</h2>
      <ul className="grid grid-cols-1 gap-4">
        {typeData.map((type) => (
          <li
            key={type.id}
            className={`paragraph flex items-center justify-between rounded border p-4 shadow-sm ${
              type.urgentlySeeking
                ? 'border-red-600 bg-red-100 bg-opacity-90'
                : type.accepting
                  ? 'border-green-600 bg-green-100'
                  : 'border-gray-600 bg-gray-100'
            }`}
          >
            <p>{type.name}</p>
            {type.urgentlySeeking ? (
              <p className="paragraph border-red-600">Urgently Seeking</p>
            ) : type.accepting ? (
              <p className="paragraph text-green-600">Accepting</p>
            ) : (
              <p className="paragraph text-gray-500">Not Currently Accepting</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
