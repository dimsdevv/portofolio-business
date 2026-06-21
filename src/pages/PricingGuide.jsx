import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectEstimator from '../components/calculator/ProjectEstimator'

export default function PricingGuide() {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/services`)
      .then(res => res.json())
      .then(data => {
        setServices(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching services:', err)
        setIsLoading(false)
      })
  }, [])

  return (
    <main className="pt-32 pb-24 bg-[var(--color-ink)] min-h-screen text-[var(--color-paper)]">
      <SEO 
        title="Panduan Harga & Investasi" 
        description="Ketahui alasan mengapa investasi pada kualitas website origindevv memberikan ROI yang nyata bagi bisnis Anda." 
        url="https://portofolio-busines.netlify.app/panduan-harga"
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display text-5xl md:text-7xl uppercase mb-8">Investasi Digital Anda.</h1>
        <p className="font-sans text-xl text-[var(--color-fog)] leading-relaxed mb-16">
          Website murahan akan terus-menerus merugikan bisnis Anda—melalui konversi yang hilang, pengunjung yang frustrasi, dan citra merek yang hancur. Kami tidak bersaing menawarkan harga termurah, kami bersaing memberikan **Return on Investment (ROI) tertinggi**.
        </p>

        {/* Promo Banner inside Pricing Guide */}
        <div className="mb-16 border border-[var(--color-signal)] bg-[var(--color-signal)]/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="bg-[var(--color-signal)] text-[var(--color-ink)] text-xs font-bold px-2 py-1 uppercase tracking-widest">
                Eksklusif
              </span>
              <h3 className="font-display text-2xl uppercase text-[var(--color-paper)]">Founding Partners Promo</h3>
            </div>
            <p className="font-sans text-[var(--color-fog)] mt-2 leading-relaxed">
              Dalam rangka peluncuran origindevv, khusus untuk <strong className="text-[var(--color-paper)]">5 klien pertama</strong> di paket manapun, Anda berhak mendapatkan: <br className="hidden md:block"/>
              <span className="text-[var(--color-signal)] font-bold">1 Tahun Bebas Biaya VIP Maintenance + Layanan Setup SEO Spesialis</span> secara <strong className="text-[var(--color-paper)]">GRATIS</strong>. <br/>
              *Fokus saja pada bisnis Anda. Website Anda akan kami jaga agar selalu aman, cepat, dan siap bersaing di Google.*
            </p>
          </div>
          <a 
            href="https://wa.me/6289654297309?text=Halo%20origindevv,%20saya%20tertarik%20dengan%20Promo%20Founding%20Partners" 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 bg-[var(--color-signal)] text-[var(--color-ink)] px-6 py-4 font-bold uppercase tracking-wide hover:opacity-90 transition-opacity text-sm text-center w-full md:w-auto"
          >
            Klaim Sekarang
          </a>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <div className="text-[var(--color-fog)] font-mono text-sm uppercase">Memuat layanan...</div>
          ) : services.length > 0 ? (
            services.map((svc, index) => (
              <div key={svc.id} className="border border-[var(--color-border-ink)] p-8 md:p-10 hover:bg-[var(--color-paper-off)] hover:text-[var(--color-ink)] transition-colors group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                  <div>
                    <span className="font-mono text-[var(--color-signal)] text-sm mb-2 block">/ {String(index + 1).padStart(2, '0')}</span>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="font-display text-3xl uppercase">{svc.name}</h2>
                      <span className="border border-[var(--color-signal)] text-[var(--color-signal)] text-[10px] font-bold px-2 py-1 uppercase tracking-widest whitespace-nowrap">
                        Promo Berlaku
                      </span>
                    </div>
                  </div>
                  <div className="bg-[var(--color-signal)] text-[var(--color-ink)] px-6 py-3 font-mono font-bold tracking-tight">
                    {svc.price}
                  </div>
                </div>
                <div className="font-sans text-lg group-hover:text-[var(--color-ink-subtle)] text-[var(--color-fog)] transition-colors leading-relaxed mb-6 space-y-2">
                  {svc.description.split('\n').map((line, idx) => {
                    if (line.trim().startsWith('-')) {
                      return (
                        <div key={idx} className="flex items-start gap-3 ml-2">
                          <span className="text-[var(--color-signal)] mt-1.5 text-sm">✦</span>
                          <span>{line.replace(/^-/, '').trim()}</span>
                        </div>
                      )
                    }
                    return <p key={idx} className={line.trim() === '' ? 'h-2' : ''}>{line}</p>
                  })}
                </div>
                
                {/* Guarantee Badge */}
                {svc.guarantee && (
                  <div className="inline-flex items-center gap-3 border border-[var(--color-border-ink)] group-hover:border-[var(--color-signal)] px-4 py-2 transition-all duration-300">
                    <svg className="w-5 h-5 text-[var(--color-fog)] group-hover:text-[var(--color-signal)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span className="font-sans text-sm text-[var(--color-fog)] group-hover:text-[var(--color-ink-subtle)] transition-colors duration-300">
                      {svc.guarantee}
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-[var(--color-fog)] font-mono text-sm uppercase">Tidak ada layanan yang tersedia.</div>
          )}
        </div>

        {/* Add-On Section */}
        <div className="mt-16 border border-[var(--color-border-ink)] p-8 md:p-10 relative overflow-hidden group hover:bg-[var(--color-paper-off)] transition-colors">
          <h2 className="font-display text-3xl uppercase mb-8 text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">Add-On Opsional</h2>
          <div className="flex flex-col space-y-4 font-sans text-lg">
            <div className="flex justify-between items-center border-b border-[var(--color-border-ink)] group-hover:border-[var(--color-border-paper)] pb-4">
              <span className="font-bold text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">Domain & Hosting 1 Tahun</span>
              <span className="font-mono text-[var(--color-signal)]">Mulai Rp 500.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border-ink)] group-hover:border-[var(--color-border-paper)] pb-4">
              <span className="font-bold text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">Maintenance Bulanan</span>
              <span className="font-mono text-[var(--color-signal)]">Mulai Rp 1.000.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border-ink)] group-hover:border-[var(--color-border-paper)] pb-4">
              <span className="font-bold text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">Tambah Halaman</span>
              <span className="font-mono text-[var(--color-signal)]">Rp 300.000 / Halaman</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border-ink)] group-hover:border-[var(--color-border-paper)] pb-4">
              <span className="font-bold text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">Optimasi SEO Basic</span>
              <span className="font-mono text-[var(--color-signal)]">Rp 1.500.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border-ink)] group-hover:border-[var(--color-border-paper)] pb-4">
              <span className="font-bold text-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors">Revisi Tambahan</span>
              <span className="font-mono text-[var(--color-signal)]">Mulai Rp 200.000 / Revisi</span>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <ProjectEstimator />
        </div>

        {/* Origindevv Standard Section */}
        <div className="mt-24 border border-[var(--color-border-ink)] p-8 md:p-12 relative overflow-hidden group">
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-signal)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h3 className="font-display text-3xl md:text-4xl uppercase mb-8 relative z-10">Origindevv Standard.</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div>
              <div className="text-[var(--color-signal)] font-mono text-xl mb-3">01</div>
              <h4 className="font-sans font-bold text-lg mb-2">100% Kepemilikan Kode</h4>
              <p className="font-sans text-[var(--color-fog)]">Tanpa vendor lock-in. Semua source code dan aset digital sepenuhnya menjadi hak milik bisnis Anda.</p>
            </div>
            <div>
              <div className="text-[var(--color-signal)] font-mono text-xl mb-3">02</div>
              <h4 className="font-sans font-bold text-lg mb-2">Desain Kustom Eksklusif</h4>
              <p className="font-sans text-[var(--color-fog)]">Kami tidak mendaur ulang template. Setiap piksel dirancang khusus untuk merepresentasikan identitas brand Anda.</p>
            </div>
            <div>
              <div className="text-[var(--color-signal)] font-mono text-xl mb-3">03</div>
              <h4 className="font-sans font-bold text-lg mb-2">Transparansi Biaya</h4>
              <p className="font-sans text-[var(--color-fog)]">Tidak ada biaya tersembunyi. Investasi yang Anda bayarkan sesuai dengan nilai dan fitur yang Anda dapatkan di awal.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-[var(--color-border-ink)] pt-16">
          <h3 className="font-display text-4xl md:text-5xl uppercase mb-6 leading-tight">Berhenti Membakar Uang untuk Template Kosong.</h3>
          <p className="font-sans text-lg text-[var(--color-fog)] mb-10 max-w-2xl leading-relaxed">
            Berhenti menebak-nebak apa yang salah dengan performa digital Anda. Mari jadwalkan sesi konsultasi tanpa komitmen. Kami akan menganalisis kebutuhan spesifik bisnis Anda dan merancang arsitektur digital yang secara eksklusif didesain untuk menghasilkan profit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/6289654297309" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[var(--color-signal)] text-[var(--color-ink)] font-bold px-8 py-4 hover:opacity-90 transition-opacity">
              DISKUSIKAN KEBUTUHAN ANDA
            </a>
            <Link to="/#work" className="inline-flex items-center justify-center border border-[var(--color-border-ink)] text-[var(--color-paper)] font-bold px-8 py-4 hover:border-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-all">
              LIHAT BUKTI KARYA KAMI
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
