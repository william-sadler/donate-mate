import CardTypes from './CardTypes'
import CardUrgentlyStatus from './CardUrgentlyStatus'

interface Props {
  name: string
  image: string
  orgId: number
  location: string
  orgTypes: string
}

export default function LandingCard({
  name,
  image,
  orgId,
  location,
  orgTypes,
}: Props) {
  return (
    <div className="m-auto flex h-full w-60 transform cursor-pointer flex-col overflow-hidden overflow-hidden rounded-lg shadow-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl md:w-80">
      <img src={image} alt={name} className="h-40 w-full object-cover" />
      <div className="max-h-50 w-full bg-white p-4">
        <p className="text-md font-medium text-indigo-500">
          {orgTypes || 'Organisation'}
        </p>
        <p className="mb-2 text-xl font-medium text-gray-800">{name}</p>
        <p className="text-md font-light text-gray-400">{location}</p>
        <div className="mt-4 flex flex-wrap items-center justify-start">
          <CardTypes id={orgId} />
        </div>
        <CardUrgentlyStatus id={orgId} />
      </div>
    </div>
  )
}
