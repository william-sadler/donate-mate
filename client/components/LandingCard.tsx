import CardTypes from './CardTypes'
import CardUrgentlyStatus from './CardUrgentlyStatus'

interface Props {
  name: string
  image: string
  orgId: number
}

export default function LandingCard({ name, image, orgId }: Props) {
  return (
    <div className="image-card">
      <CardUrgentlyStatus id={orgId} />
      <img className="image" src={image} alt={name} />
      <div className="name">{name}</div>
      <CardTypes id={orgId} />
    </div>
  )
}
