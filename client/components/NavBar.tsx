import Nav from './NavLogin'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <Link to="/">
        <div className="flex items-center">
          <img
            src={'/images/iconLogo.png'}
            alt="logo for donateMate"
            className="logo"
          />
          <div>
            <h1 className="heading-1-caveat caveat-bold -translate-y-1/5 ml-1 text-textBlue">
              DonateMate
            </h1>
            <h2 className="caveat-semi text-2xl text-textBlue">
              Donate Smart, Support Local
            </h2>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end space-x-2">
        <Nav />
      </div>
    </>
  )
}
