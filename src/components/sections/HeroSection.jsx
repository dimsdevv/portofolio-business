import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
import LiveClock from '../ui/LiveClock'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])

  // Mouse trail state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    // Get mouse coordinates relative to the section
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <section 
      className="min-h-[100svh] pt-[120px] pb-20 px-6 flex flex-col justify-center relative overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Mouse Trail Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 40%)`
        }}
      />

      <div className="container mx-auto">
        {/* Top Label */}
        <div className="mb-12 relative z-10">
          <LiveClock />
        </div>

        {/* Main Heading */}
        <motion.h1 
          className="font-display text-[var(--text-display)] text-[var(--color-paper)] leading-[0.95] tracking-tight max-w-5xl relative z-10 uppercase"
          style={{ y }}
        >
          <AnimatedText text="Kami membangun website yang menghasilkan. " />
          <motion.span 
            className="italic text-[var(--color-signal)] inline-block"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            profit.
          </motion.span>
        </motion.h1>

        {/* Editorial Sub-copy (positioned right) */}
        <motion.div 
          className="mt-12 md:mt-8 md:flex md:justify-end max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="font-sans text-[var(--color-paper)] text-lg md:text-xl leading-relaxed max-w-sm">
            origindevv merancang pengalaman digital untuk brand yang menolak tampil biasa saja. Cepat, tangguh, dan didesain untuk menghasilkan penjualan.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 flex flex-col sm:flex-row sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <MagneticButton 
            to="/#work" 
            className="inline-flex justify-center items-center bg-[var(--color-signal)] text-[var(--color-ink)] px-8 py-4 font-semibold text-lg hover:bg-[#000] hover:text-[var(--color-signal)] transition-colors rounded-sm w-full sm:w-auto"
          >
            Lihat Karya Kami
          </MagneticButton>
          <span className="font-mono text-[var(--color-fog)] text-sm text-center sm:text-left">
            atau gulir untuk menjelajah ↓
          </span>
        </motion.div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute right-6 bottom-24 origin-bottom-right -rotate-90 hidden lg:block">
        <span className="font-mono text-[var(--color-fog)] text-[0.65rem] tracking-[0.2em]">
          PORTFOLIO · 2024–2025 ·
        </span>
      </div>
    </section>
  )
}
