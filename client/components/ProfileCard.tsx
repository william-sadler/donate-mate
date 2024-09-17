interface Props {
  image: string
  name: string
  location: string
  contactEmail: string | null
  contactNumber: string | null
  website?: string
  orgType: string
}
export default function ProfileCard({
  image,
  name,
  contactNumber,
  contactEmail,
  location,
  website,
  orgType,
}: Props) {
  return (
    <div className="profile-image-card teal-shadow ml-0 border border-darkerTeal border-opacity-25 px-4 py-2">
      <img className="image" src={image} alt={name + 'Logo or Store Front'} />
      <h2 className="heading-2-caveat name">{name}</h2>
      <h3 className="heading-4-italic">{orgType}</h3>
      <p className=" paragraph location">{location}</p>
      <p className="paragraph contactEmail ">{contactEmail}</p>
      <p className="paragraph contactNumber ">{contactNumber}</p>
      <p className="paragraph website">{website}</p>
    </div>
  )
}
