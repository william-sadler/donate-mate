import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
import OrgProfilePage from './pages/OrgProfilePage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/org/:id" element={<OrgProfilePage />} />
  </Route>,
)
