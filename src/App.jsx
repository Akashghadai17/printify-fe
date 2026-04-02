import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Order from './pages/Order'
import Packages from './pages/Packages'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Home />
            <Order />
            <Packages />
            <About />
            <Contact />
          </>
        } />
      </Routes>
  )
}
