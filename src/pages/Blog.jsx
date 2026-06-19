import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { blogPosts } from '../data/blog'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))]

  // Filter posts
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  // Split into featured (first) and rest (if showing All)
  const featuredPost = activeCategory === 'All' ? filteredPosts[0] : null
  const gridPosts = activeCategory === 'All' ? filteredPosts.slice(1) : filteredPosts

  return (
    <main className="pt-32 pb-24 bg-[var(--color-ink)] min-h-screen text-[var(--color-paper)]">
      <SEO 
        title="Sinyal Digital | Jurnal Origindevv" 
        description="Pembedahan mendalam tentang arsitektur web, psikologi UI/UX, dan eksperimen konversi tingkat agensi." 
        url="https://portofolio-busines.netlify.app/blog"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-6 leading-tight">Sinyal Digital.</h1>
          <p className="font-sans text-xl text-[var(--color-fog)] leading-relaxed max-w-2xl">
            Jurnal rekayasa digital. Pembedahan mendalam tentang arsitektur kode, psikologi antarmuka, dan optimasi konversi tingkat agensi. Artikel murahan tidak mendapat tempat di sini.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-mono text-sm uppercase tracking-wider py-2 px-6 border transition-all duration-300 ${
                activeCategory === category
                  ? 'border-[var(--color-signal)] bg-[var(--color-signal)]/10 text-[var(--color-signal)]'
                  : 'border-[var(--color-border-ink)] text-[var(--color-fog)] hover:border-[var(--color-fog)]'
              }`}
            >
              [ {category} ]
            </button>
          ))}
        </div>

        {/* Featured Post (Only show on 'All') */}
        {featuredPost && (
          <div className="mb-16 md:mb-24">
            <Link 
              to={`/blog/${featuredPost.slug}`} 
              className="block group border border-[var(--color-border-ink)] hover:border-[var(--color-signal)] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-signal)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex flex-col md:flex-row">
                <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs text-[var(--color-signal)] border border-[var(--color-signal)] px-3 py-1 uppercase tracking-widest">
                      {featuredPost.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-fog)]">
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 group-hover:text-[var(--color-signal)] transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="font-sans text-lg text-[var(--color-fog)] mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="font-mono text-sm uppercase tracking-widest text-[var(--color-paper)] flex items-center gap-2">
                    BACA SELENGKAPNYA <span className="text-[var(--color-signal)] transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
                <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-[var(--color-border-ink)] bg-[var(--color-ink-muted)] flex items-center justify-center p-8">
                  {/* Decorative placeholder for image */}
                  <div className="w-full aspect-square md:aspect-auto md:h-full border border-dashed border-[var(--color-border-ink)] flex items-center justify-center text-[var(--color-fog)] font-mono text-sm opacity-50">
                    [ IMG_TRANSMISSION ]
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {gridPosts.map(post => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group border border-[var(--color-border-ink)] hover:border-[var(--color-signal)] p-8 flex flex-col transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-signal)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="font-mono text-xs text-[var(--color-signal)] uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="font-mono text-xs text-[var(--color-fog)]">
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-display text-2xl uppercase mb-4 group-hover:text-[var(--color-signal)] transition-colors duration-300 relative z-10">
                {post.title}
              </h3>
              <p className="font-sans text-[var(--color-fog)] mb-8 leading-relaxed flex-grow relative z-10">
                {post.excerpt}
              </p>
              <div className="font-mono text-sm uppercase tracking-widest text-[var(--color-paper)] flex items-center gap-2 mt-auto relative z-10">
                BACA <span className="text-[var(--color-signal)] transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="border border-[var(--color-signal)] p-10 md:p-16 text-center bg-[var(--color-signal)]/5 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-6">Siap Menerapkan Arsitektur Ini?</h2>
            <p className="font-sans text-lg text-[var(--color-fog)] mb-10">
              Teori tidak akan menghasilkan konversi jika tidak dieksekusi dengan kode yang presisi. Mari bicarakan teknis proyek Anda.
            </p>
            <Link 
              to="/panduan-harga" 
              className="bg-[var(--color-signal)] text-[var(--color-ink)] px-8 py-4 font-mono font-bold uppercase tracking-widest hover:bg-white transition-colors inline-block"
            >
              LIHAT PANDUAN HARGA
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
