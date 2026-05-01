import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { api } from '../lib/api'

export default function Login() {
  const [formData, setFormData] = useState({
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
      const response = await api.login(formData)
      if (response.access_token) {
        localStorage.setItem('accessToken', response.access_token)
        localStorage.setItem('refreshToken', response.refresh_token)
        navigate('/dashboard')
      } else {
        setError('Login failed. Please check your credentials.')
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
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-400">Monitor your systems with precision.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">PASSWORD</label>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Forgot?
                </a>
              </div>
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
              {loading ? 'Signing in...' : 'Sign in to account'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:underline">
              Sign up for free
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
            <div className="text-2xl font-bold text-blue-400">ULTRA FAST</div>
            <div className="text-xs text-gray-500">PERFORMANCE</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
