import CardTypes from './CardTypes'
import CardUrgentlyStatus from './CardUrgentlyStatus'

interface Props {
  name: string
  image: string
  orgId: number
}

export default function LandingCard({ name, image, orgId }: Props) {
  return (
<<<<<<< HEAD
    <div className="image">
      <img className="image" src={src} alt={alt} />
      <div className="name-container">
        <div className="name">{name}</div>
        <CardUrgentlyStatus id={orgId} />
      </div>
||||||| 4daab19
    <div className="image-card">
      <CardUrgentlyStatus id={orgId} />
      <img className="image" src={src} alt={alt} />
      <div className="name">{name}</div>
=======
    <div className="image-card">
      <CardUrgentlyStatus id={orgId} />
      <img className="image" src={image} alt={name} />
      <div className="name">{name}</div>
>>>>>>> 9cd36c88f85ef878dd36383428de3aa46bebd41c
      <CardTypes id={orgId} />
    </div>
  )
}
