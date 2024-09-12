import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'

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
        redirectUrl: `${window.location.origin}/register`,
      },
    })
  }

  return (
    <>
      <IfAuthenticated>
        {user && <p> Signed in as: {user?.name}</p>}
        <button
          className="primary_button bg-blue hover:bg-darkerTeal flex items-center space-x-4
           rounded px-4 py-2 transition duration-300"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button
          className="primary_button bg-blue hover:bg-darkerTeal flex items-center space-x-4 rounded px-4 py-2 transition duration-300"
          onClick={handleSignIn}
        >
          Login
        </button>
      </IfNotAuthenticated>
    </>
  )
}

export default Nav
