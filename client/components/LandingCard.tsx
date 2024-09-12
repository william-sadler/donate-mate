import CardTypes from './CardTypes'
import CardUrgentlyStatus from './CardUrgentlyStatus'

interface Props {
  name: string
  src: string
  alt: string
  orgId: number
}

export default function LandingCard({ name, src, alt, orgId }: Props) {
  return (
    <div className="image-card">
      <div>
        <CardUrgentlyStatus id={orgId} />
      </div>
      <img className="image" src={src} alt={alt} />
      <div className="name">{name}</div>
      <CardTypes id={orgId} />
    </div>
  )
}
