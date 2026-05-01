import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, ArrowLeft, Save } from 'lucide-react'
import { api } from '../lib/api'

export default function Profile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
      return
    }

    // Fetch current user data
    api.me(token).then(data => {
      if (data.username) {
        setFormData({
          username: data.username || '',
          email: data.email || '',
          password: '',
        })
      }
    }).catch(() => {
      navigate('/login')
    })
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
      }
      
      // Only include password if it's provided
      if (formData.password) {
        updateData.password = formData.password
      }

      const response = await api.updateMe(token, updateData)
      if (response.username || response.email) {
        setSuccess('Profile updated successfully!')
        // Clear password field after successful update
        setFormData(prev => ({ ...prev, password: '' }))
      } else {
        setError('Update failed. Please try again.')
      }
    } catch (err) {
      // Parse error response from backend
      if (err.detail && Array.isArray(err.detail)) {
        const errorMessages = err.detail.map(e => e.msg).join(', ')
        setError(errorMessages)
      } else if (err.detail) {
        setError(err.detail)
      } else {
        setError('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="text-2xl font-bold tracking-tight">Profile</div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg hover:bg-[#1a1a1a] transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Update your profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">USERNAME</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
                placeholder="johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">NEW PASSWORD (OPTIONAL)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            {success && (
              <div className="text-green-400 text-sm">{success}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
              <Save size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
