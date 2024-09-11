interface Props {
  name: string
  src: string
  alt: string
}

export default function LandingCard({ name, src, alt }: Props) {
  return (
    <div className="image-card">
      <img className="image" src={src} alt={alt} />
      <div className="name">{name}</div>
    </div>
  )
}
