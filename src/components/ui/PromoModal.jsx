import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

export default function PromoModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('promo-modal-dismissed')
    if (!isDismissed) {
      // Delay showing for 2.5 seconds to let the user see the hero section first
      const timer = setTimeout(() => setIsVisible(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('promo-modal-dismissed', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[var(--color-ink)]/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-lg bg-[var(--color-paper)] text-[var(--color-ink)] p-8 md:p-10 border border-[var(--color-border-paper)] shadow-2xl overflow-hidden group"
          >
            {/* Accent styling */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-signal)]"></div>
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-[var(--color-ink-subtle)] hover:text-[var(--color-signal)] hover:bg-[var(--color-ink)]/5 transition-colors rounded-full"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="inline-block border border-[var(--color-signal)] text-[var(--color-signal)] font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4 font-bold bg-[var(--color-signal)]/10">
                Promo Eksklusif
              </span>
              <h2 className="font-display text-3xl md:text-4xl uppercase leading-tight mb-4">
                Founding Partners.
              </h2>
              <p className="font-sans text-lg text-[var(--color-ink-subtle)] leading-relaxed">
                Jadilah salah satu dari <strong className="text-[var(--color-ink)] font-bold">5 klien pertama</strong> kami dan dapatkan benefit premium secara gratis:
              </p>
            </div>

            <ul className="space-y-3 mb-8 font-sans">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-signal)] mt-1">✦</span>
                <span className="text-[var(--color-ink-subtle)]"><strong>1 Tahun Maintenance</strong> & Dukungan Teknis Penuh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-signal)] mt-1">✦</span>
                <span className="text-[var(--color-ink-subtle)]"><strong>Setup SEO Basic</strong> untuk visibilitas di Google</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/panduan-harga" 
                onClick={handleClose}
                className="inline-flex items-center justify-center bg-[var(--color-signal)] text-[var(--color-ink)] font-bold px-6 py-3 hover:opacity-90 transition-opacity uppercase tracking-wide text-sm"
              >
                Lihat Paket Harga
              </Link>
              <a 
                href="https://wa.me/6289654297309?text=Halo%20origindevv,%20saya%20tertarik%20dengan%20Promo%20Founding%20Partners" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleClose}
                className="inline-flex items-center justify-center border border-[var(--color-ink)] text-[var(--color-ink)] font-bold px-6 py-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors uppercase tracking-wide text-sm"
              >
                Klaim Promo
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
