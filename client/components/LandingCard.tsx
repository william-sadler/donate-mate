import CardTypes from './CardTypes'
import CardUrgentlyStatus from './CardUrgentlyStatus'

interface Props {
  name: string
  src: string
  alt: string
  orgId: number
}

export default function LandingCard({ name, src, alt, orgId }: Props) {
  const isUrgent = CardUrgentlyStatus({ id: orgId })

  return (
    <div className="landing-card">
      <img className="image" src={src} alt={alt} />
      <div className="name">
        {name}
        {isUrgent && (
          <div className="red-cycle">
            <div className="circle"></div>
          </div>
        )}
      </div>
      <CardTypes id={orgId} />
    </div>
  )
}
