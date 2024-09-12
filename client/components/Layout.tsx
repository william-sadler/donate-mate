import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <>
      {/* <header className="navbar bg-accent-bg grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-16 px-16 py-4"> */}
      <header className="bg-lightTeal flex items-center justify-between px-4 py-2">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
