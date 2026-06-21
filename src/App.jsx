import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import FloatingContact from './components/ui/FloatingContact'
import PromoModal from './components/ui/PromoModal'

// Lazy loaded pages
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Admin = lazy(() => import('./pages/Admin'))
const PricingGuide = lazy(() => import('./pages/PricingGuide'))
const StudiKasus = lazy(() => import('./pages/StudiKasus'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Simple fallback loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-ink)]">
    <div className="w-8 h-8 border-2 border-[var(--color-signal)] border-t-transparent rounded-full animate-spin"></div>
  </div>
)


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
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/layanan" element={<ServicesPage />} />
              <Route path="/tentang-kami" element={<AboutPage />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/mengapa-kami" element={<WhyUs />} />
              <Route path="/panduan-harga" element={<PricingGuide />} />
              <Route path="/studi-kasus" element={<StudiKasus />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/kebijakan-privasi" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <FloatingContact />
      <PromoModal />
      <Footer />
    </>
  )
}

export default App
