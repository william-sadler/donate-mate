import CardTypes from './CardTypes'
import CardUrgentlyStatus from './CardUrgentlyStatus'

interface Props {
  name: string
  image: string
  orgId: number
  location: string
}

export default function LandingCard({ name, image, orgId, location }: Props) {
  return (
    <div className="image-card">
      <CardUrgentlyStatus id={orgId} />
      <img className="image" src={image} alt={name} />
      <div className="card-content">
        <div className="card-title heading-2-caveat">{name}</div>
        <CardTypes id={orgId} />
        <div className="card-location heading-4">{location}</div>
      </div>
    </div>
  )
}
