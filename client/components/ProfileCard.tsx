interface Props {
  image: string
  name: string
  location: string
}
export default function ProfileCard({ image, name, location }: Props) {
  return (
    <div className="profile-image-card mx-auto px-8 py-4">
      <img className="image" src={image} alt={name} />
      <h2 className="heading-2 name">{name}</h2>
      <p className=" paragraph contactDetails">{location}</p>
    </div>
  )
}
