import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <>
      <header className="from-brightTeal flex items-center justify-between bg-gradient-to-b to-lightTeal px-4 py-2">
        <NavBar />
      </header>
      <main className="bg-light">
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
