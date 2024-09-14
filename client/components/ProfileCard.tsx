interface Props {
  image: string
  name: string
  contactEmail: string | null
  contactNumber: string | null
  location: string
  website?: string
}
export default function ProfileCard({
  image,
  name,
  contactNumber,
  contactEmail,
  location,
  website,
}: Props) {
  return (
    <div className="profile-image-card mx-auto px-8 py-4">
      <img className="image" src={image} alt={name} />
      <h2 className="heading-2 name">{name}</h2>
      <p className=" paragraph location ">{location}</p>
      <p className="paragraph contactEmail ">{contactEmail}</p>
      <p className="paragraph contactNumber ">{contactNumber}</p>
      <p className="paragraph website">{website}</p>
    </div>
  )
}
