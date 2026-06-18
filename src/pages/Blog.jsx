import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

export default function Blog() {
  return (
    <main className="pt-32 pb-24 bg-[var(--color-ink)] min-h-screen flex items-center justify-center text-[var(--color-paper)]">
      <SEO 
        title="Sinyal Digital (Blog)" 
        description="Jurnal dan wawasan teknis origindevv seputar arsitektur web dan rekayasa konversi." 
        url="https://portofolio-busines.netlify.app/blog"
      />

      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="font-mono text-[var(--color-signal)] text-sm tracking-[0.12em] uppercase mb-8">
          [ ARCHIVE : KOSONG ]
        </h2>
        <h1 className="font-display text-5xl md:text-7xl uppercase mb-8 leading-tight">Artikel Murahan Tidak Mendapat Tempat Di Sini.</h1>
        <p className="font-sans text-xl text-[var(--color-fog)] leading-relaxed mb-12">
          Kami sedang menyusun jurnal. Kami tidak akan membuang waktu Anda dengan artikel "5 Tips SEO" hasil salin rekat. Saat halaman ini aktif, bersiaplah untuk membaca pembedahan mendalam tentang arsitektur *codebase*, psikologi antarmuka pengguna, dan eksperimen konversi teknis level agensi.
        </p>
        
        <div className="font-mono text-[var(--color-fog)] border border-[var(--color-border-ink)] py-4 px-8 inline-block uppercase text-sm mb-16 tracking-widest bg-[var(--color-ink-muted)]">
          MENUNGGU TRANSMISI PERTAMA ...
        </div>

        <div className="mt-8">
          <Link to="/" className="inline-block border-b-2 border-[var(--color-signal)] text-[var(--color-paper)] font-mono text-sm uppercase pb-1 hover:text-[var(--color-signal)] transition-colors">
            ← KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </main>
  )
}
