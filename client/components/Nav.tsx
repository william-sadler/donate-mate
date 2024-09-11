import { useAuth0 } from "@auth0/auth0-react";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

function Nav() {


  const handleSignOut =() => {
    console.log('sign out')
    logout()
  }

  const handleSignIn = () => 
}