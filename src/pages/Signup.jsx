import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { api } from '../lib/api'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.signup(formData)
      if (response.access_token) {
        localStorage.setItem('accessToken', response.access_token)
        localStorage.setItem('refreshToken', response.refresh_token)
        navigate('/dashboard')
      } else {
        setError('Signup failed. Please try again.')
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <Link to="/" className="text-2xl font-bold tracking-tight">UptimePilot</Link>
        <nav className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            Documentation
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            Support
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-400">Start monitoring your systems today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">USERNAME</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
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
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-center gap-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">99.9%</div>
            <div className="text-xs text-gray-500">UPTIME</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">&lt;50ms</div>
            <div className="text-xs text-gray-500">LATENCY</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
