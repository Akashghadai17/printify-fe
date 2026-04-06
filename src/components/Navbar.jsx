import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  function scrollTo(id) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <i className="fas fa-print text-primary text-2xl mr-2"></i>
            <span className="text-xl font-bold text-primary">Printifyy</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {['home','upload','packages','about','contact'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-gray-700 dark:text-gray-300 hover:text-primary capitalize">
                {id === 'upload' ? 'Upload & Order' : id}
              </button>
            ))}
            {user && <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Hi, {user.name.split(' ')[0]}</span>}
            <button onClick={toggle} className="text-gray-600 dark:text-yellow-400 text-xl hover:text-primary transition">
              <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            {user
              ? <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">Logout</button>
              : <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Login</Link>
            }
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggle} className="text-gray-600 dark:text-yellow-400 text-xl">
              <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 dark:text-gray-300">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 pt-2 pb-3 space-y-1">
          {['home','upload','packages','about','contact'].map(id => (
            <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-primary capitalize">
              {id === 'upload' ? 'Upload & Order' : id}
            </button>
          ))}
          {user
            ? <button onClick={logout} className="block w-full text-left py-2 text-red-500">Logout</button>
            : <Link to="/login" className="block py-2 text-primary font-semibold">Login</Link>
          }
        </div>
      )}
    </nav>
  )
}
