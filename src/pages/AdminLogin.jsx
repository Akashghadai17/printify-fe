import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  if (sessionStorage.getItem('adminToken')) navigate('/admin')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) return setMsg(data.message)
      sessionStorage.setItem('adminToken', data.token)
      navigate('/admin')
    } catch { setMsg('Server error. Please try again.') }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <i className="fas fa-shield-alt text-primary text-4xl"></i>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">StudentPrint Dashboard</p>
        </div>
        {msg && <div className="mb-4 p-3 rounded-lg text-sm text-center bg-red-100 text-red-700">{msg}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" required placeholder="admin" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <div className="relative">
            <input type={show ? 'text' : 'password'} required placeholder="••••••••" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
              <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            <i className="fas fa-sign-in-alt mr-2"></i>Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          <a href="/" className="hover:text-primary"><i className="fas fa-arrow-left mr-1"></i>Back to Site</a>
        </p>
      </div>
    </div>
  )
}
