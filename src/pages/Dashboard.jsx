import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Activity, Globe, Bell, CheckCircle, User } from 'lucide-react'
import { api } from '../lib/api'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
      return
    }

    // Fetch user data
    api.me(token).then(data => {
      if (data.username) {
        setUser(data)
      }
    }).catch(() => {
      navigate('/login')
    })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <div className="text-2xl font-bold tracking-tight">UptimePilot</div>
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Activity className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Uptime Monitoring</h3>
            <p className="text-gray-400 text-sm">Your services are being monitored 24/7</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Globe className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Latency</h3>
            <p className="text-gray-400 text-sm">Response times across all regions</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Bell className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-gray-400 text-sm">Configure your alert preferences</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-green-400" size={24} />
            <h2 className="text-xl font-semibold">System Status</h2>
          </div>
          <p className="text-gray-400 mb-4">All systems are operational. You're ready to start monitoring your services.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Connected to backend</span>
          </div>
        </div>
      </main>
    </div>
  )
}
