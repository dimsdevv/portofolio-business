import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0)
    
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/projects/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Project not found')
        return res.json()
      })
      .then(data => {
        setProject(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-ink)] flex items-center justify-center">
        <div className="font-mono text-[var(--color-signal)] text-sm tracking-widest animate-pulse">
          MEMUAT DATA...
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[var(--color-ink)] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl text-[var(--color-paper)] mb-4">Proyek Tidak Ditemukan</h1>
        <p className="font-sans text-[var(--color-fog)] mb-8">{error}</p>
        <Link to="/" className="text-[var(--color-signal)] border-b border-[var(--color-signal)] pb-1 font-mono uppercase text-sm hover:opacity-70 transition-opacity">
          Kembali ke Beranda
        </Link>
      </div>
    )
  }

  // Parse tags and gallery
  const tags = project.tags ? project.tags.split(',') : []
  const galleryImages = project.gallery ? project.gallery.split(',') : []

  return (
    <main className="bg-[var(--color-ink)] min-h-screen pt-32 pb-24">
      <Helmet>
        <title>{project.name} · origindevv</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.name} · origindevv`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.thumbnail} />
      </Helmet>

      {/* Header Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[var(--color-fog)] text-xs uppercase tracking-widest hover:text-[var(--color-paper)] transition-colors mb-12">
            <span>←</span> Kembali
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--color-border-ink)] pb-12">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[var(--color-paper)] leading-none tracking-tight uppercase max-w-4xl">
              {project.name}
            </h1>
            <div className="text-[var(--color-signal)] font-mono text-xl md:text-2xl">
              [ {project.number} ]
            </div>
          </div>
        </motion.div>
      </section>

      {/* Meta Information */}
      <section className="container mx-auto px-6 mb-24">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h4 className="font-mono text-[var(--color-fog)] text-xs uppercase tracking-widest mb-3">Kategori</h4>
            <p className="font-sans text-[var(--color-paper)] text-lg">{project.category}</p>
          </div>
          <div>
            <h4 className="font-mono text-[var(--color-fog)] text-xs uppercase tracking-widest mb-3">Tahun</h4>
            <p className="font-sans text-[var(--color-paper)] text-lg">{project.year}</p>
          </div>
          <div className="col-span-2">
            <h4 className="font-mono text-[var(--color-fog)] text-xs uppercase tracking-widest mb-3">Teknologi</h4>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span key={i} className="font-sans text-[var(--color-paper)] text-sm border border-[var(--color-border-ink)] px-3 py-1 rounded-sm">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
          {project.url && project.url !== '#' && (
            <div>
              <h4 className="font-mono text-[var(--color-fog)] text-xs uppercase tracking-widest mb-3">Tautan</h4>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-[var(--color-signal)] text-lg hover:underline transition-all">
                Kunjungi Live ↗
              </a>
            </div>
          )}
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="container mx-auto px-6 mb-32">
        <motion.div 
          className="w-full aspect-video md:aspect-[21/9] bg-[var(--color-paper-off)] overflow-hidden rounded-sm"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img 
            src={project.thumbnail} 
            alt={project.name}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </section>

      {/* Structured Content Section */}
      <section className="container mx-auto px-6 max-w-4xl mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-24">
            
            {/* Overview / General Content */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-paper)] mb-8 uppercase tracking-tight">
                Ringkasan
              </h2>
              <div className="font-sans text-lg md:text-xl text-[var(--color-fog)] leading-relaxed space-y-6">
                {project.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* The Challenge */}
            {project.challenge && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--color-paper)] mb-8 uppercase tracking-tight">
                  Tantangan
                </h2>
                <div className="font-sans text-lg md:text-xl text-[var(--color-fog)] leading-relaxed">
                  <p>{project.challenge}</p>
                </div>
              </div>
            )}

            {/* The Approach */}
            {project.approach && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--color-paper)] mb-8 uppercase tracking-tight">
                  Pendekatan Kami
                </h2>
                <div className="font-sans text-lg md:text-xl text-[var(--color-fog)] leading-relaxed border-l-2 border-[var(--color-signal)] pl-6">
                  <p>{project.approach}</p>
                </div>
              </div>
            )}

            {/* The Impact */}
            {project.impact && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--color-paper)] mb-8 uppercase tracking-tight">
                  Dampak & Hasil
                </h2>
                <div className="font-sans text-lg md:text-xl text-[var(--color-fog)] leading-relaxed">
                  <p>{project.impact}</p>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </section>

      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <section className="container mx-auto px-6 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase mb-16 text-center">
              [ Galeri Proyek ]
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((img, i) => (
                <div key={i} className="aspect-video bg-[var(--color-paper-off)] overflow-hidden rounded-sm">
                  <img src={img.trim()} alt={`${project.name} detail ${i+1}`} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Next Steps / CTA */}
      <section className="container mx-auto px-6 text-center border-t border-[var(--color-border-ink)] pt-24">
        <h3 className="font-mono text-[var(--color-fog)] text-sm uppercase tracking-widest mb-8">
          Tertarik dengan hasil seperti ini?
        </h3>
        <Link to="/#contact" className="inline-flex items-center gap-3 bg-[var(--color-signal)] text-[var(--color-ink)] px-8 py-4 font-semibold text-lg hover:bg-[var(--color-signal-dim)] transition-colors rounded-sm">
          Mulai Proyek Anda
        </Link>
      </section>
    </main>
  )
}
