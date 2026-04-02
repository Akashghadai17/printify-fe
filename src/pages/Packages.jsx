import { useNavigate } from 'react-router-dom'

const PLANS = [
  { name: 'Monthly', icon: 'fa-calendar-day', pages: '500 pages/month', rate: '₹1.5/page', save: '25%' },
  { name: 'Quarterly', icon: 'fa-calendar-alt', pages: '1500 pages/3 months', rate: '₹1.2/page', save: '40%' },
  { name: 'Half-Yearly', icon: 'fa-calendar-week', pages: '3000 pages/6 months', rate: '₹1/page', save: '50%' },
  { name: 'Yearly', icon: 'fa-calendar', pages: '6000 pages/year', rate: '₹0.8/page', save: '60%', featured: true },
]

export default function Packages() {
  const navigate = useNavigate()

  async function subscribe(plan) {
    const token = localStorage.getItem('token')
    if (!token) { alert('Please login first.'); navigate('/login'); return }
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ plan })
    })
    const data = await res.json()
    alert(data.message)
  }

  return (
    <section id="packages" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">Our Packages</h2>
        <p className="text-center text-lg mb-10 text-gray-600 dark:text-gray-300">Save more with our subscription packages!</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map(p => (
            <div key={p.name} className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${p.featured ? 'border-2 border-secondary' : ''}`}>
              <i className={`fas ${p.icon} text-secondary text-3xl mb-4`}></i>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{p.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{p.pages} at {p.rate}</p>
              <p className="text-green-600 font-bold">Save {p.save} vs per-page</p>
              <button onClick={() => subscribe(p.name)} className="mt-4 w-full bg-secondary text-white py-2 rounded hover:bg-green-700 transition">
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
