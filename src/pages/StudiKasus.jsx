import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

export default function StudiKasus() {
  return (
    <main className="pt-32 pb-24 bg-[var(--color-ink)] min-h-screen text-[var(--color-paper)]">
      <SEO 
        title="Studi Kasus & Filosofi" 
        description="Melihat bagaimana origindevv mengubah masalah bisnis kompleks menjadi antarmuka digital yang menghasilkan profit." 
        url="https://portofolio-busines.netlify.app/studi-kasus"
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display text-5xl md:text-7xl uppercase mb-8 leading-tight">Bukan Sekadar Estetika. Ini Rekayasa Konversi.</h1>
        <p className="font-sans text-xl text-[var(--color-fog)] leading-relaxed mb-16">
          Sebagian besar *agency* akan memberikan Anda website yang "terlihat bagus". Kami memberikan sistem mesin pencetak prospek. Setiap studi kasus di portofolio kami adalah dokumentasi nyata bagaimana struktur kode, psikologi antarmuka, dan performa bekerja dalam satu harmoni untuk satu tujuan: **Meningkatkan Metrik Bisnis Anda.**
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-20 border-t border-[var(--color-border-ink)] pt-16">
          <div className="group">
            <h3 className="font-mono text-[var(--color-signal)] text-sm tracking-widest uppercase mb-4 transition-colors group-hover:text-[var(--color-paper)]">[ 01. Anatomi Masalah ]</h3>
            <p className="font-sans text-[var(--color-fog)] leading-relaxed">
              Kami tidak langsung membuka aplikasi desain. Kami membedah operasional bisnis Anda. Siapa target spesifik Anda? Apa keraguan terbesar mereka sebelum membeli? Kami menggunakan data fundamental ini untuk merancang arsitektur informasi yang secara psikologis melucuti keberatan calon pelanggan Anda.
            </p>
          </div>
          <div className="group">
            <h3 className="font-mono text-[var(--color-signal)] text-sm tracking-widest uppercase mb-4 transition-colors group-hover:text-[var(--color-paper)]">[ 02. Eksekusi Brutal ]</h3>
            <p className="font-sans text-[var(--color-fog)] leading-relaxed">
              *Loading* lambat adalah pembunuh penjualan senyap. Kami membuang pendekatan *template builder* yang lamban. Kami memprogram dari nol menggunakan *stack* teknologi modern (React, Node.js) di mana setiap byte kode dioptimalkan untuk memangkas *bouncing rate* dan memberikan pengalaman seketika.
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-paper-off)] border border-[var(--color-border-ink)] p-8 md:p-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 text-[var(--color-ink)]">Berhenti Membaca Klaim Kami.</h2>
          <p className="font-sans text-lg text-[var(--color-ink-subtle)] mb-10 max-w-2xl mx-auto">
            Janji manis ada di mana-mana. Mari kita bicara tentang bukti nyata. Jelajahi arsip *Selected Works* kami dan lihat secara langsung masalah spesifik apa yang telah kami pecahkan untuk klien-klien sebelum Anda.
          </p>
          <Link to="/#work" className="inline-block bg-[var(--color-ink)] text-[var(--color-signal)] font-bold px-10 py-5 hover:bg-[#000] hover:scale-105 transition-all duration-300 shadow-xl">
            JELAJAHI ARSIP KARYA
          </Link>
        </div>
      </div>
    </main>
  )
}
