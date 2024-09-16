import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <header className="flex items-center justify-between bg-gradient-to-b from-brightTeal to-lightTeal px-4 py-2">
        <NavBar />
      </header>
      <main className="bg-light">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
