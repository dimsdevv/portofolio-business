import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Admin from './pages/Admin'
import PricingGuide from './pages/PricingGuide'
import StudiKasus from './pages/StudiKasus'
import Blog from './pages/Blog'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'
import FloatingContact from './components/ui/FloatingContact'

// Helper component to handle scrolling on route change
function ScrollManager() {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  
  return null
}

function App() {
  const location = useLocation()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollManager />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/panduan-harga" element={<PricingGuide />} />
            <Route path="/studi-kasus" element={<StudiKasus />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/kebijakan-privasi" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <FloatingContact />
      <Footer />
    </>
  )
}

export default App
