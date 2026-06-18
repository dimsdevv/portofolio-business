import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'h-16 bg-[var(--color-ink)]/90 backdrop-blur-md border-b border-[var(--color-border-ink)] py-0' 
          : 'h-24 bg-transparent border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0 z-50">
          <a href="/" onClick={() => setMobileMenuOpen(false)} className="font-display font-semibold text-2xl text-[var(--color-paper)] tracking-tight">
            origindevv<span className="text-[var(--color-signal)]">·</span>
          </a>
        </div>
        
        {/* Center: Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 font-mono text-[var(--color-fog)] text-sm uppercase tracking-widest">
          <Link to="/#work" className="hover:text-[var(--color-paper)] transition-colors">Karya</Link>
          <span className="text-[var(--color-border-ink)]">·</span>
          <Link to="/layanan" className="hover:text-[var(--color-paper)] transition-colors">Layanan</Link>
          <span className="text-[var(--color-border-ink)]">·</span>
          <Link to="/tentang-kami" className="hover:text-[var(--color-paper)] transition-colors">Tentang Kami</Link>
          <span className="text-[var(--color-border-ink)]">·</span>
          <Link to="/#contact" className="hover:text-[var(--color-paper)] transition-colors">Kontak</Link>
        </div>
        
        {/* Right: CTA & Mobile Menu Button */}
        <div className="flex items-center gap-4 z-50">
          <Link 
            to="/#contact" 
            className="hidden md:flex group items-center gap-2 border border-[var(--color-signal)] text-[var(--color-signal)] px-5 py-2.5 hover:bg-[var(--color-signal)] hover:text-[var(--color-ink)] transition-colors font-medium rounded-sm"
          >
            <span>Mulai Proyek Anda</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          <button 
            className="md:hidden text-[var(--color-paper)] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[var(--color-ink)] z-40 transition-opacity duration-300 ease-in-out md:hidden flex flex-col items-center pt-32 pb-8 gap-8 overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link to="/#work" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] active:text-[var(--color-signal)] transition-colors">Karya</Link>
        <Link to="/layanan" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] active:text-[var(--color-signal)] transition-colors">Layanan</Link>
        <Link to="/tentang-kami" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] active:text-[var(--color-signal)] transition-colors">Tentang Kami</Link>
        <Link to="/#contact" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] active:text-[var(--color-signal)] transition-colors">Kontak</Link>
        
        <Link 
          to="/#contact" 
          onClick={() => setMobileMenuOpen(false)} 
          className="mt-4 border border-[var(--color-signal)] text-[var(--color-signal)] px-8 py-4 font-medium rounded-sm active:bg-[var(--color-signal)] active:text-[var(--color-ink)] transition-colors"
        >
          Mulai Proyek Anda
        </Link>
      </div>
    </nav>
  )
}
