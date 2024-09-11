import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
import Nav from './components/Nav.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/users" element={<Nav />} />
  </Route>,
)
