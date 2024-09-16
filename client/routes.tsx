import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import OrgProfilePage from './pages/OrgProfilePage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import AddProfilePage from './pages/AddProfilePage.tsx'
import LoginRedirect from './pages/LoginRedirect.tsx'
import EditProfilePage from './pages/EditProfilePage.tsx'
import UserProfilePage from './pages/UserProfilePage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<LandingPage />} />
    <Route path="/register" element={<LoginRedirect />} />
    <Route path="/org/:id" element={<OrgProfilePage />} />
    <Route path="/org/signup" element={<AddProfilePage />} />
    <Route path="/org/edit/:id" element={<EditProfilePage />} />
    <Route path="/user/profile" element={<UserProfilePage />} />
  </Route>,
)
