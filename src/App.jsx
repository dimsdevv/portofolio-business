import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Admin from './pages/Admin'

// Helper component to scroll to anchor links on route change
function ScrollToAnchor() {
  const { hash } = useLocation()
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [hash])
  
  return null
}

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollToAnchor />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
