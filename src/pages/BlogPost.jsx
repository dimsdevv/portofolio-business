import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import SEO from '../components/SEO'
import { blogPosts } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  // Simple Markdown Renderer
  const renderContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim()
      if (trimmed === '') return null;
      
      // Check for headings
      if (trimmed.startsWith('### ')) {
        return <h3 key={index} className="font-display text-2xl md:text-3xl uppercase mt-12 mb-6 text-[var(--color-paper)]">{trimmed.replace('### ', '')}</h3>
      }
      
      // Check for lists
      if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter(item => item.trim().startsWith('- ') || item.trim().match(/^\d+\./));
        return (
          <ul key={index} className="list-none space-y-4 my-6 pl-4 border-l-2 border-[var(--color-signal)]">
            {items.map((item, i) => {
               let text = item.replace(/^-\s/, '').replace(/^\d+\.\s/, '');
               text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-paper)] font-bold">$1</strong>');
               text = text.replace(/\*(.*?)\*/g, '<em class="text-[var(--color-paper)] italic">$1</em>');
               text = text.replace(/`(.*?)`/g, '<code class="bg-[var(--color-ink-muted)] text-[var(--color-signal)] px-1 py-0.5 font-mono text-sm border border-[var(--color-border-ink)]">$1</code>');
               return <li key={i} dangerouslySetInnerHTML={{ __html: text }} className="font-sans text-lg text-[var(--color-fog)] leading-relaxed" />
            })}
          </ul>
        )
      }

      // Bold, Italic, Code text replacement for normal paragraphs
      let html = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-paper)] font-bold">$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em class="text-[var(--color-paper)] italic">$1</em>');
      html = html.replace(/`(.*?)`/g, '<code class="bg-[var(--color-ink-muted)] text-[var(--color-signal)] px-2 py-0.5 font-mono text-sm border border-[var(--color-border-ink)]">$1</code>');

      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: html }} className="font-sans text-lg md:text-xl text-[var(--color-fog)] leading-relaxed mb-8" />
      )
    })
  }

  return (
    <main className="pt-32 pb-24 bg-[var(--color-ink)] min-h-screen text-[var(--color-paper)]">
      <SEO 
        title={`${post.title} | Origindevv Jurnal`}
        description={post.excerpt}
        url={`https://portofolio-busines.netlify.app/blog/${post.slug}`}
      />

      <article className="container mx-auto px-6 max-w-4xl">
        
        {/* Back Link */}
        <div className="mb-12 md:mb-16">
          <Link to="/blog" className="inline-block border-b border-transparent hover:border-[var(--color-signal)] text-[var(--color-fog)] hover:text-[var(--color-signal)] font-mono text-sm uppercase transition-colors duration-300">
            ← Kembali ke Jurnal
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-16 md:mb-20 pb-16 border-b border-[var(--color-border-ink)]">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="font-mono text-xs md:text-sm text-[var(--color-signal)] border border-[var(--color-signal)] px-3 py-1 uppercase tracking-widest bg-[var(--color-signal)]/5">
              {post.category}
            </span>
            <span className="font-mono text-xs md:text-sm text-[var(--color-fog)]">
              {post.date}
            </span>
            <span className="font-mono text-xs md:text-sm text-[var(--color-fog)]">
              // {post.readTime}
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-tight mb-8">
            {post.title}
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-[var(--color-fog)] leading-relaxed border-l-4 border-[var(--color-border-ink)] pl-6">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <div className="max-w-3xl">
          {renderContent(post.content)}
        </div>

        {/* Article Footer & CTA */}
        <footer className="mt-24 pt-16 border-t border-[var(--color-border-ink)]">
          <div className="bg-[var(--color-ink-muted)] border border-[var(--color-border-ink)] p-8 md:p-12 text-center">
            <h3 className="font-display text-2xl md:text-3xl uppercase mb-4 text-[var(--color-paper)]">Butuh Eksekusi Teknis Untuk Bisnis Anda?</h3>
            <p className="font-sans text-[var(--color-fog)] mb-8 max-w-xl mx-auto">
              Teori tidak akan menghasilkan konversi jika tidak dieksekusi dengan kode yang presisi. Konsultasikan kebutuhan arsitektur web Anda bersama kami.
            </p>
            <Link 
              to="/panduan-harga" 
              className="bg-[var(--color-signal)] text-[var(--color-ink)] px-8 py-4 font-mono font-bold uppercase tracking-widest hover:bg-white transition-colors inline-block"
            >
              KONSULTASI SEKARANG
            </Link>
          </div>
        </footer>

      </article>
    </main>
  )
}
