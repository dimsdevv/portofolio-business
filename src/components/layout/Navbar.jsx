import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'h-16 bg-[var(--color-ink)]/90 backdrop-blur-md border-b border-[var(--color-border-ink)] py-0' 
          : 'h-24 bg-transparent border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="font-display font-semibold text-2xl text-[var(--color-paper)] tracking-tight">
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
        
        {/* Right: CTA */}
        <div className="flex-shrink-0">
          <a 
            href="#contact" 
            className="group flex items-center gap-2 border border-[var(--color-signal)] text-[var(--color-signal)] px-5 py-2.5 hover:bg-[var(--color-signal)] hover:text-[var(--color-ink)] transition-colors font-medium rounded-sm"
          >
            <span>Mulai Proyek Anda</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
