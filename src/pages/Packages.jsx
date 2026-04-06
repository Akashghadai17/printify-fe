import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PLANS = [
  {
    name: 'Monthly', icon: 'fa-calendar-day', pages: '500 pages/month', rate: '₹1.5/page', save: '25%',
    features: ['500 pages per month', 'B&W & Colour printing', 'Free delivery at gate', 'Soft & Spiral binding', 'Priority support']
  },
  {
    name: 'Quarterly', icon: 'fa-calendar-alt', pages: '1500 pages/3 months', rate: '₹1.2/page', save: '40%',
    features: ['1500 pages per quarter', 'B&W & Colour printing', 'Free delivery at gate', 'Soft & Spiral binding', 'Priority support', 'Rollover unused pages']
  },
  {
    name: 'Half-Yearly', icon: 'fa-calendar-week', pages: '3000 pages/6 months', rate: '₹1/page', save: '50%',
    features: ['3000 pages per 6 months', 'B&W & Colour printing', 'Free delivery at gate', 'Soft & Spiral binding', 'Priority support', 'Rollover unused pages', 'Dedicated account manager']
  },
  {
    name: 'Yearly', icon: 'fa-calendar', pages: '6000 pages/year', rate: '₹0.8/page', save: '60%', featured: true,
    features: ['6000 pages per year', 'B&W & Colour printing', 'Free delivery at gate', 'Soft & Spiral binding', 'Priority support', 'Rollover unused pages', 'Dedicated account manager', 'Express same-day delivery']
  },
]

const ALL_FEATURES = [
  { label: 'B&W & Colour printing', plans: [true, true, true, true] },
  { label: 'Free gate delivery', plans: [true, true, true, true] },
  { label: 'Soft & Spiral binding', plans: [true, true, true, true] },
  { label: 'Priority support', plans: [true, true, true, true] },
  { label: 'Rollover unused pages', plans: [false, true, true, true] },
  { label: 'Dedicated account manager', plans: [false, false, true, true] },
  { label: 'Express same-day delivery', plans: [false, false, false, true] },
]

const API = import.meta.env.VITE_API_URL || 'https://prinify-be.onrender.com'

export default function Packages() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')

  async function subscribe(plan) {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    const res = await fetch(`${API}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ plan })
    })
    const data = await res.json()
    if (res.ok) setSuccess(plan)
    else setError(data.message)
  }

  if (success) return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-2xl text-green-600"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Subscribed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-1">You are now on the <span className="font-semibold text-primary">{success}</span> plan.</p>
        <p className="text-gray-400 text-sm mb-8">Enjoy discounted printing rates on every order.</p>
        <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) || navigate('/')}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          Go to Home
        </button>
      </div>
    </section>
  )

  return (
    <section id="packages" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">Our Packages</h2>
        <p className="text-center text-lg mb-10 text-gray-600 dark:text-gray-300">Save more with our subscription packages!</p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-500 text-sm text-center rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PLANS.map(p => (
            <div key={p.name} className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col ${p.featured ? 'border-2 border-secondary ring-2 ring-green-200' : ''}`}>
              {p.featured && <span className="self-start mb-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">⭐ Best Value</span>}
              <i className={`fas ${p.icon} text-secondary text-3xl mb-3`}></i>
              <h3 className="text-xl font-bold mb-1 dark:text-white">{p.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{p.pages}</p>
              <p className="text-2xl font-extrabold text-primary mb-1">{p.rate}</p>
              <p className="text-green-600 font-semibold text-sm mb-4">Save {p.save} vs per-page</p>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <i className="fas fa-check-circle text-green-500 text-xs"></i>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => subscribe(p.name)} className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Feature Comparison</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-semibold">Feature</th>
                {PLANS.map(p => (
                  <th key={p.name} className={`px-4 py-4 text-center font-bold ${p.featured ? 'text-secondary' : 'text-gray-700 dark:text-gray-200'}`}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ALL_FEATURES.map(row => (
                <tr key={row.label} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{row.label}</td>
                  {row.plans.map((has, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {has
                        ? <i className="fas fa-check-circle text-green-500"></i>
                        : <i className="fas fa-times-circle text-gray-300 dark:text-gray-600"></i>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
