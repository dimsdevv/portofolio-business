export default function ProcessSection() {
  const steps = [
    { num: "01", label: "BRIEF & DISKUSI", desc: "Memahami visi, target audiens, dan tujuan bisnis Anda.", time: "1-2 HARI" },
    { num: "02", label: "WIREFRAME", desc: "Merancang arsitektur informasi dan flow pengguna.", time: "3-5 HARI" },
    { num: "03", label: "DESAIN", desc: "Menerapkan identitas visual dan eksplorasi desain.", time: "1-2 MINGGU" },
    { num: "04", label: "PENGEMBANGAN", desc: "Konversi desain ke dalam kode yang bersih dan responsif.", time: "2-4 MINGGU" },
    { num: "05", label: "PELUNCURAN", desc: "Pengujian, optimasi SEO, dan peluncuran final.", time: "1-3 HARI" }
  ]

  return (
    <section id="process" className="py-32 bg-[var(--color-ink)] overflow-hidden">
      <div className="container mx-auto px-6 mb-24">
        <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase">
          [ 03 — CARA KERJA ]
        </h2>
      </div>

      <div className="w-full overflow-x-auto pb-12 hide-scrollbar">
        <div className="flex px-6 md:px-12 xl:px-24 w-max lg:w-full lg:justify-between">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start group relative w-72 lg:w-auto shrink-0 pr-12 lg:pr-0">
              
              {/* Line connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[60%] w-full h-[1px] bg-[var(--color-border-ink)] z-0"></div>
              )}
              
              <div className="flex flex-col relative z-10">
                <span className="font-mono text-[var(--color-fog)] text-xs tracking-widest uppercase mb-4">
                  {step.label}
                </span>
                
                <div className="relative mb-6">
                  <span className="font-display text-[6rem] leading-none text-[var(--color-paper)] opacity-10 font-bold -ml-2">
                    {step.num}
                  </span>
                </div>
                
                <div className="max-w-[200px]">
                  <p className="font-sans text-[var(--color-fog)] text-sm mb-4">
                    {step.desc}
                  </p>
                  <span className="font-mono text-[var(--color-signal)] text-xs tracking-wider">
                    {step.time}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
