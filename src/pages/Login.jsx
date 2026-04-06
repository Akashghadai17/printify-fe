import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'https://prinify-be.onrender.com'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/')
  }, [navigate])

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      })
      const data = await res.json()
      if (!res.ok) return setMsg({ text: data.message, type: 'error' })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = '/'
    } catch (err) {
      setMsg({ text: err.message || 'Server error. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    if (form.password.length < 6) return setMsg({ text: 'Password must be at least 6 characters', type: 'error' })
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) return setMsg({ text: data.message, type: 'error' })
      setForm({ name: '', email: '', password: '' })
      setMsg({ text: '✅ Account created successfully! You can now login.', type: 'success' })
      setTimeout(() => { setTab('login'); setMsg({ text: '', type: '' }) }, 2500)
    } catch (err) {
      setMsg({ text: err.message || 'Server error. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <i className="fas fa-print text-blue-600 text-3xl"></i>
            <h1 className="text-3xl font-bold text-blue-600">Printifyy</h1>
          </div>
          <p className="text-gray-500 text-sm">Smart printing for students</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: '⚡', title: 'Fast Delivery', desc: 'Same-day printing' },
            { icon: '💰', title: 'Affordable', desc: 'Subscription plans' },
            { icon: '📄', title: 'B&W & Colour', desc: 'All print types' },
            { icon: '📦', title: 'Binding', desc: 'Spiral & soft options' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{title}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setMsg({ text: '', type: '' }) }}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm capitalize transition ${
                  tab === t ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {/* Message */}
          {msg.text && (
            <div className={`mb-4 p-3 rounded-xl text-center text-sm font-medium ${
              msg.type === 'error'
                ? 'bg-red-50 text-red-500 border border-red-100'
                : 'bg-green-50 text-green-600 border border-green-100'
            }`}>
              {msg.type === 'error' ? '⚠️' : '✅'} {msg.text}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email</label>
                <input
                  type="email" name="email" required placeholder="you@example.com"
                  onChange={update} value={form.email}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Password</label>
                <input
                  type="password" name="password" required placeholder="••••••••"
                  onChange={update} value={form.password}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition text-sm"
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name</label>
                <input
                  type="text" name="name" required placeholder="John Doe"
                  onChange={update} value={form.name}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email</label>
                <input
                  type="email" name="email" required placeholder="you@example.com"
                  onChange={update} value={form.email}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Password</label>
                <input
                  type="password" name="password" required placeholder="Min. 6 characters"
                  onChange={update} value={form.password}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition text-sm"
              >
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>
            </form>
          )}

          <p className="text-center text-xs text-gray-400 mt-5">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setMsg({ text: '', type: '' }) }}
              className="text-blue-600 font-semibold hover:underline"
            >
              {tab === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}
