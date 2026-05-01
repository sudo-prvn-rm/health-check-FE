import { Link } from 'react-router-dom'
import { Activity, Globe, Bell, ArrowRight, CheckCircle } from 'lucide-react'

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold tracking-tight">UptimePilot</div>
        <nav className="flex items-center gap-6">
          <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Monitoring that actually sleeps when you do.
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Experience automated reliability with developer-first tooling. No more 3 AM wake-up calls for false positives. Just clean data and calm nights.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            to="/signup"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
          <button className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-900 transition-colors">
            View Docs
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Uptime Monitoring */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Activity className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Uptime Monitoring</h3>
            <p className="text-gray-400 text-sm mb-4">
              Real-time monitoring with 99.9% uptime guarantee. Track your services 24/7 with precision.
            </p>
            <div className="h-24 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
              <div className="flex items-end gap-1 h-16">
                {[40, 60, 45, 80, 55, 70, 65, 90, 75, 85, 80, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-blue-500 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Global Latency */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Globe className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Latency</h3>
            <p className="text-gray-400 text-sm mb-4">
              Monitor response times across multiple regions worldwide. Optimize performance globally.
            </p>
            <div className="h-24 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
              <div className="relative w-full h-full p-4">
                <div className="absolute inset-4 opacity-30">
                  <div className="w-full h-full border border-green-500/30 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full" />
                  <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Instant Alerts */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Bell className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get notified immediately when issues arise. Configure alerts via email, Slack, or webhooks.
            </p>
            <div className="h-24 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="text-green-400" size={14} />
                  <span className="text-gray-400">API Endpoint Up</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="text-green-400" size={14} />
                  <span className="text-gray-400">Database Connected</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="text-green-400" size={14} />
                  <span className="text-gray-400">CDN Cached</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-8 py-8 flex items-center justify-between">
          <div className="text-lg font-semibold">UptimePilot</div>
          <p className="text-sm text-gray-500">© 2024 UptimePilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
