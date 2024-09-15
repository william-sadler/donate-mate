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
        <div className="card-title">{name}</div>
        <CardTypes id={orgId} />
        <div className="card-location">{location}</div>
      </div>
    </div>
  )
}
