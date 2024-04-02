import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './components/protected-route'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import NotFoundPage from './pages/not-found'
import RegisterPage from './pages/register'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <RegisterPage to="/login" />
}

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register'  element={<RegisterAndLogout />} />
        <Route path='/logout'  element={<Logout />} />
        <Route path='*'  element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}