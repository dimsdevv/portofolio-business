import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import ProjectEstimator from '../components/calculator/ProjectEstimator'

export default function PricingGuide() {
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

        <div className="space-y-8">
          {services.map((svc) => (
            <div key={svc.id} className="border border-[var(--color-border-ink)] p-8 md:p-10 hover:bg-[var(--color-paper-off)] hover:text-[var(--color-ink)] transition-colors group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                <div>
                  <span className="font-mono text-[var(--color-signal)] text-sm mb-2 block">/ {svc.id}</span>
                  <h2 className="font-display text-3xl uppercase">{svc.name}</h2>
                </div>
                <div className="bg-[var(--color-signal)] text-[var(--color-ink)] px-6 py-3 font-mono font-bold tracking-tight">
                  {svc.price}
                </div>
              </div>
              <p className="font-sans text-lg group-hover:text-[var(--color-ink-subtle)] text-[var(--color-fog)] transition-colors leading-relaxed">
                {svc.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <ProjectEstimator />
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
