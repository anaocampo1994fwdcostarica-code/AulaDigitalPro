import { useState, useEffect } from 'react'
import { AppRoutes } from './routes/AppRoutes'

const STORAGE_KEY = 'adp_user'

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const handleLogin = (userData) => setUser(userData)
  const handleLogout = () => setUser(null)

  return <AppRoutes user={user} onLogin={handleLogin} onLogout={handleLogout} />
}