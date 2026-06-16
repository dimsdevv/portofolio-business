import { testimonials } from '../../data/testimonials'

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[var(--color-paper-off)] text-[var(--color-ink)]">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase mb-16">
          [ 05 — KATA KLIEN ]
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testi, i) => (
            <div 
              key={testi.id} 
              className={`flex flex-col relative ${i === 1 ? 'md:mt-16' : ''}`}
            >
              {/* Huge typographic quote mark */}
              <div className="absolute -top-12 -left-4 font-display text-[8rem] text-[var(--color-paper)] leading-none select-none pointer-events-none">
                "
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <p className="font-sans text-xl leading-relaxed font-medium mb-10">
                  {testi.quote}
                </p>
                <div className="text-right border-t border-[var(--color-border-paper)] pt-6">
                  <p className="font-mono text-sm font-semibold tracking-wider uppercase">{testi.author}</p>
                  <p className="font-mono text-[var(--color-fog)] text-xs mt-1">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
