import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
      document.body.style.overflow = 'auto'
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
          <a href="#work" className="hover:text-[var(--color-paper)] transition-colors">Karya</a>
          <span className="text-[var(--color-border-ink)]">·</span>
          <a href="#services" className="hover:text-[var(--color-paper)] transition-colors">Layanan</a>
          <span className="text-[var(--color-border-ink)]">·</span>
          <a href="#process" className="hover:text-[var(--color-paper)] transition-colors">Proses</a>
          <span className="text-[var(--color-border-ink)]">·</span>
          <a href="#contact" className="hover:text-[var(--color-paper)] transition-colors">Kontak</a>
        </div>
        
        {/* Right: CTA & Mobile Menu Button */}
        <div className="flex items-center gap-4 z-50">
          <a 
            href="#contact" 
            className="hidden md:flex group items-center gap-2 border border-[var(--color-signal)] text-[var(--color-signal)] px-5 py-2.5 hover:bg-[var(--color-signal)] hover:text-[var(--color-ink)] transition-colors font-medium rounded-sm"
          >
            <span>Mulai Proyek Anda</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
          
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
        className={`fixed inset-0 bg-[var(--color-ink)] z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <a href="#work" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] hover:text-[var(--color-signal)] transition-colors">Karya</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] hover:text-[var(--color-signal)] transition-colors">Layanan</a>
        <a href="#process" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] hover:text-[var(--color-signal)] transition-colors">Proses</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl text-[var(--color-paper)] hover:text-[var(--color-signal)] transition-colors">Kontak</a>
        
        <a 
          href="#contact" 
          onClick={() => setMobileMenuOpen(false)} 
          className="mt-8 border border-[var(--color-signal)] text-[var(--color-signal)] px-8 py-4 font-medium rounded-sm active:bg-[var(--color-signal)] active:text-[var(--color-ink)] transition-colors"
        >
          Mulai Proyek Anda
        </a>
      </div>
    </nav>
  )
}
