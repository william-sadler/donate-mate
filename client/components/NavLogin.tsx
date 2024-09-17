import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { Link } from 'react-router-dom'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    console.log('sign out')
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
      },
    })
  }

  return (
    <>
      <IfAuthenticated>
        {user && (
          <Link to="/user/profile">
            <div className="raleway-light flex flex-col items-center">
              <img
                src={user.picture}
                alt="User Profile"
                className="mb-1 h-6 w-6 rounded-full"
              />
              <p> Welcome {user?.given_name}!</p>
              <p className="text-sm"> visit profile </p>
            </div>
          </Link>
        )}
        <button
          className="primary_button flex items-center space-x-4 rounded-full bg-blue
           transition duration-300 hover:bg-darkerTeal"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button
          className="primary_button flex items-center space-x-4 rounded-full bg-blue
           transition duration-300 hover:bg-darkerTeal"
          onClick={handleSignIn}
        >
          Login
        </button>
      </IfNotAuthenticated>
    </>
  )
}

export default Nav
