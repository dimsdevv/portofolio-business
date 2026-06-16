import Accordion from '../ui/Accordion'
import { services } from '../../data/services'

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-[var(--color-paper-warm)]">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase mb-16">
          [ 02 — LAYANAN KAMI ]
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column - Sticky Heading */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <h3 className="font-display text-[var(--text-heading)] text-[var(--color-ink)] leading-[1.05] tracking-tight whitespace-pre-line mb-8">
                {"Dibuat untuk\nhasil nyata."}
              </h3>
              <p className="font-sans text-[var(--color-ink-subtle)] text-lg mb-8 max-w-sm leading-relaxed">
                Kami merancang arsitektur digital yang bekerja keras untuk bisnis Anda. Bukan sekadar estetika, tapi alat konversi yang tangguh.
              </p>
              <p className="font-serif italic text-[var(--color-fog)] text-xl">
                "Tanpa template. Tanpa jalan pintas."
              </p>
            </div>
          </div>

          {/* Right Column - Accordion List */}
          <div className="lg:col-span-7">
            <div className="border-b border-[var(--color-border-paper)]">
              {services.map((service) => (
                <Accordion 
                  key={service.id}
                  number={service.id}
                  title={service.name}
                  description={service.description}
                  price={service.price}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
