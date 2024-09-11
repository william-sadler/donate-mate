import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function Layout() {
  return (
    <>
      <header>
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
