import { Link } from 'react-router-dom'
import LandingCard from '../components/LandingCard'
import { useAllOrganisations } from '../hooks/useOrganisations'

export default function LandingPage() {
  const { data, isPending, isError, error } = useAllOrganisations()

  if (isPending) return <p>Yoo hold up brother!</p>
  if (isError) return <p>Naa bao, it aint working: {error.message}</p>
  console.log(data)
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">DonateMate</h1>
      <div className="image-grid">
        {data.map((organisation, i) => (
          <Link to={`/org/${organisation.id}`} key={i}>
            <LandingCard
              name={organisation.name}
              image={organisation.image}
              orgId={organisation.id}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
