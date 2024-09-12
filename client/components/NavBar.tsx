import Nav from './NavLogin'
import iconLogo from '../../public/images/iconLogo.png'
export default function NavBar() {
  return (
    <>
      <div className="bg-lightTeal flex items-center">
        <img src={iconLogo} alt="logo for donateMate" className="logo" />

        <h1 className="heading-1 caveat-bold -translate-y-1/8 ml-1">
          DonateMate
        </h1>
      </div>
      <div className="bg-lightTeal flex items-center justify-end space-x-2">
        <Nav />
      </div>
    </>
  )
}
