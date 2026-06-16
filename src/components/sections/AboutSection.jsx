export default function AboutSection() {
  return (
    <section className="py-32 bg-[var(--color-ink)] border-t border-[var(--color-border-ink)]">
      <div className="container mx-auto px-6">
        <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase mb-16">
          [ 04 — TENTANG KAMI ]
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          
          {/* Left Column - Editorial Text */}
          <div>
            <h3 className="font-display text-[var(--text-heading)] text-[var(--color-paper)] leading-tight tracking-tight mb-8">
              Kami bukan sekadar agensi.
            </h3>
            <div className="font-sans text-[var(--color-fog)] text-lg leading-relaxed max-w-lg space-y-6">
              <p>
                origindevv adalah studio kecil yang percaya bahwa website terbaik lahir dari kolaborasi yang dekat, bukan proses produksi massal.
              </p>
              <p>
                Kami bekerja dengan klien terpilih — yang menghargai kualitas, kecepatan, dan detail yang berbicara sendiri. Kami menolak untuk menjadi mesin pabrik yang menghasilkan website template yang membosankan.
              </p>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-6">
              {[
                "Kami menulis kode yang bisa dibaca manusia",
                "Desain kami berakhir setelah klien puas, bukan setelah deadline",
                "Tidak ada template yang dijual kembali ke klien lain",
                "Setiap proyek diperlakukan seperti proyek pertama kami"
              ].map((val, i) => (
                <li key={i} className="flex items-start gap-4 font-sans text-[var(--color-paper)] text-lg md:text-xl">
                  <span className="text-[var(--color-signal)] shrink-0 mt-1">→</span>
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-between gap-12 pt-16 border-t border-[var(--color-border-ink)]">
          {[
            { num: "12", label: "Proyek Selesai" },
            { num: "3", label: "Klien Aktif" },
            { num: "100%", label: "Retensi Klien" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-5xl md:text-6xl text-[var(--color-paper)] mb-2 font-medium">
                [ {stat.num} ]
              </div>
              <div className="font-mono text-[var(--color-fog)] text-sm tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
