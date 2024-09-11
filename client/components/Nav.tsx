import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { useUsers } from '../hooks/useUsers.ts'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()
  const { data: user } = useUsers()

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
        <button onClick={handleSignOut}>Log out</button>
        {user && <p> Signed in as: {user?.name}</p>}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleSignIn}>Login</button>
      </IfNotAuthenticated>
    </>
  )
}

export default Nav
