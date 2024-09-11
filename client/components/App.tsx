import { useFruits } from '../hooks/useFruits.ts'
import LandingPage from './LandingPage.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline"> Just the bare bones </h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
      <div>
        <LandingPage />{' '}
      </div>
    </>
  )
}

export default App
