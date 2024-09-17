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
    <div
      className="teal-shadow hover:teal-shadow m-auto flex h-full w-60 transform cursor-pointer flex-col overflow-hidden overflow-hidden rounded-lg border border-darkerTeal border-opacity-25
     shadow-lg transition-transform hover:scale-105 md:w-80"
    >
      <img
        src={image}
        alt={name + 'storefront or logo'}
        className="h-40 w-full object-cover"
      />
      <div className="max-h-50 w-full bg-white p-4">
        <p className="text-md font-medium text-cyan-700">
          {orgTypes || 'Organisation'}
        </p>
        <p className="mb-2 text-xl font-medium text-textBlue">{name}</p>

        <p className="text-md  text-textBlue">{location}</p>
        <div className="mt-4 flex flex-wrap items-center justify-start">
          <CardTypes id={orgId} />
        </div>
        <CardUrgentlyStatus id={orgId} />
      </div>
    </div>
  )
}
