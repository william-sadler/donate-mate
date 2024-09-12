import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import OrgProfilePage from './pages/OrgProfilePage.tsx'
import LandingPage from './pages/LandingPage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<LandingPage />} />
    <Route path="/org/:id" element={<OrgProfilePage />} />
  </Route>,
)
