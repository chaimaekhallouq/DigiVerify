import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { NAVIGATION } from '../../utils/navigation'
import { ROLE_HOME } from '../../utils/constants'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="dv-app">
      <Sidebar
        items={NAVIGATION[user.role] || []}
        homePath={ROLE_HOME[user.role]}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dv-app__main">
        <Topbar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <main className="dv-app__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout