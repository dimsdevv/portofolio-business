import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { optimizeCloudinaryUrl } from '../../utils/cloudinary'

export default function WorkSection() {
  const [projects, setProjects] = useState([])
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Fetch projects from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/projects?featured=true`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to fetch projects:', err))
  }, [])

  // Track mouse position relative to viewport for the floating image
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use clientX/Y so it works even when scrolling
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="work" className="py-32 bg-[var(--color-ink)] relative" ref={containerRef}>
      <div className="container mx-auto px-6 mb-16">
        <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase">
          [ 01 — KARYA TERPILIH ]
        </h2>
      </div>

      <div className="w-full border-t border-[var(--color-border-ink)]">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.slug}`}
            className="group block border-b border-[var(--color-border-ink)] transition-colors duration-500 hover:bg-[var(--color-paper)] relative"
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="container mx-auto px-6 py-10 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Left Side: Number & Name */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 lg:gap-32 w-full md:w-auto">
                <span className="font-mono text-[var(--color-fog)] text-sm group-hover:text-[var(--color-ink-subtle)] transition-colors">
                  {project.number}
                </span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">
                  {project.name}
                </h3>
              </div>

              {/* Right Side: Category, Year, Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto border-t md:border-none border-[var(--color-border-ink)] group-hover:border-[var(--color-border-paper)] transition-colors pt-4 md:pt-0">
                <div className="flex flex-col md:flex-row gap-2 md:gap-12">
                  <span className="font-mono text-[var(--color-fog)] text-sm group-hover:text-[var(--color-ink-subtle)] transition-colors">
                    {project.category}
                  </span>
                  <span className="font-mono text-[var(--color-fog)] text-sm group-hover:text-[var(--color-ink-subtle)] transition-colors hidden md:block">
                    {project.year}
                  </span>
                </div>
                <div className="transform group-hover:translate-x-4 transition-transform duration-300 text-[var(--color-paper)] group-hover:text-[var(--color-ink)]">
                  →
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>

      <div className="container mx-auto px-6 mt-16 flex justify-end">
        <Link to="/#work" className="font-mono text-[var(--color-paper)] text-sm uppercase hover:text-[var(--color-signal)] transition-colors border-l-2 border-[var(--color-signal)] pl-4 py-1">
          Lihat Semua Proyek →
        </Link>
      </div>

      {/* Floating Media (Desktop Only) */}
      <div 
        className="fixed pointer-events-none z-40 hidden md:block w-[400px] aspect-[4/3] rounded-sm overflow-hidden"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          opacity: hoveredProject ? 1 : 0,
          visibility: hoveredProject ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
      >
        {projects.map(p => (
          <div key={p.id} className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${hoveredProject?.id === p.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {p.hoverVideo && p.hoverVideo.match(/\.(mp4|webm)$/i) ? (
              <video 
                src={p.hoverVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={optimizeCloudinaryUrl(p.hoverVideo || p.thumbnail)} 
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
