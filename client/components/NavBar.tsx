import Nav from './NavLogin'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <Link to="/">
        <div className="flex items-center bg-lightTeal">
          <img
            src={'/images/iconLogo.png'}
            alt="logo for donateMate"
            className="logo"
          />

          <h1 className="heading-1 caveat-bold -translate-y-1/8 ml-1 text-textBlue">
            DonateMate
          </h1>
        </div>
      </Link>
      <div className="flex items-center justify-end space-x-2 bg-lightTeal">
        <Nav />
      </div>
    </>
  )
}
