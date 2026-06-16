import { useState } from 'react'

const techStack = [
  { name: 'React', description: 'Kecepatan maksimal & interaktivitas tanpa henti untuk frontend.' },
  { name: 'Node.js', description: 'Arsitektur backend yang tangguh untuk memproses data skala besar.' },
  { name: 'Tailwind', description: 'Desain responsif tanpa kompromi, di-styling hingga ke level atom.' },
  { name: 'Prisma', description: 'Database management presisi untuk keamanan & integritas data klien.' },
  { name: 'Vite', description: 'Build tool masa depan, memastikan loading aset seketika.' },
]

export default function TechStackSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="py-32 bg-[var(--color-paper-off)] border-t border-b border-[var(--color-border-ink)]">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:w-1/2">
          <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase mb-4">
            [ TECH STACK & CAPABILITIES ]
          </h2>
          <p className="font-sans text-lg text-[var(--color-ink-subtle)]">
            Kami tidak merakit template instan. Kami membangun infrastruktur digital dari nol menggunakan teknologi paling mutakhir di industri untuk memastikan performa ekstrem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 border-t border-[var(--color-border-ink)]">
          {techStack.map((tech, i) => (
            <div 
              key={tech.name}
              className={`border-b border-[var(--color-border-ink)] py-12 px-6 transition-colors duration-300 relative group cursor-crosshair ${
                hoveredIndex === i ? 'bg-[var(--color-signal)]' : 'hover:bg-[var(--color-ink)]'
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className={`font-display text-5xl md:text-7xl uppercase transition-colors duration-300 ${
                hoveredIndex === i ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)] group-hover:text-[var(--color-paper)]'
              }`}>
                {tech.name}
              </h3>
              
              <div className={`mt-6 font-mono text-sm md:text-base uppercase tracking-widest transition-all duration-300 transform ${
                hoveredIndex === i ? 'opacity-100 translate-y-0 text-[var(--color-ink)]' : 'opacity-0 translate-y-4 text-[var(--color-paper)] absolute'
              }`}>
                ↳ {tech.description}
              </div>
            </div>
          ))}
          <div className="hidden md:flex border-b border-[var(--color-border-ink)] py-12 px-6 bg-[var(--color-ink)] relative overflow-hidden items-end justify-end group">
             <span className="font-display text-[var(--color-paper)] text-6xl opacity-20 group-hover:opacity-100 group-hover:text-[var(--color-signal)] transition-all duration-500">
               + MORE
             </span>
          </div>
        </div>
      </div>
    </section>
  )
}
