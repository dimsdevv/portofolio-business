import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import CTASection from '../components/sections/CTASection'
import TestimonialsSection from '../components/sections/TestimonialsSection'

export default function AboutPage() {
  const principles = [
    {
      title: "Tanpa Template",
      description: "Kami tidak mendaur ulang desain atau kode. Setiap karya dibuat khusus untuk memecahkan masalah unik bisnis Anda dan menonjol dari kompetitor."
    },
    {
      title: "Performa adalah Fitur",
      description: "Desain yang indah tidak berguna jika lambat. Kami terobsesi dengan kecepatan, optimasi gambar, dan skor Web Vitals yang sempurna."
    },
    {
      title: "Komunikasi Transparan",
      description: "Tidak ada istilah teknis yang membingungkan untuk menutupi kekurangan. Kami berdiskusi dengan jelas, jujur, dan selalu menempatkan tujuan bisnis Anda di depan."
    },
    {
      title: "Kemitraan Jangka Panjang",
      description: "Kami tidak sekadar menyerahkan website lalu menghilang. Kami memantau performa, memberikan masukan, dan bertindak sebagai partner digital Anda."
    }
  ];

  const processes = [
    { step: "01", title: "Discovery", desc: "Menganalisis kebutuhan bisnis, target audiens, dan tujuan utama dari website Anda." },
    { step: "02", title: "Design", desc: "Membuat wireframe dan desain UI/UX interaktif menggunakan Figma untuk persetujuan Anda." },
    { step: "03", title: "Development", desc: "Menerjemahkan desain menjadi baris kode yang bersih, cepat, dan responsif." },
    { step: "04", title: "Launch", desc: "Melakukan pengujian ketat, optimasi SEO, dan peluncuran produk ke server produksi." }
  ];

  const techStack = [
    { category: "Frontend", tools: ["React.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Next.js"] },
    { category: "Backend", tools: ["Node.js", "Express", "PostgreSQL", "MySQL", "Prisma ORM"] },
    { category: "DevOps & Cloud", tools: ["Vercel", "Docker", "GitHub Actions", "Google Cloud", "Netlify", "Azure"] },
    { category: "Design & UX", tools: ["Figma", "SEO Optimization", "Responsive Design", "Web Performance"] }
  ];

  return (
    <main className="bg-[var(--color-ink)] min-h-screen">
      <SEO 
        title="Tentang Kami" 
        description="origindevv adalah studio pengembangan web yang percaya pada kualitas, performa tinggi, dan desain kustom. Kenali filosofi dan cara kerja kami." 
        url="https://portofolio-busines.netlify.app/tentang-kami"
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="font-mono text-[var(--color-signal)] text-sm tracking-[0.12em] uppercase mb-8">
                [ TENTANG STUDIO KAMI ]
              </h1>
              <h2 className="font-display text-5xl md:text-6xl text-[var(--color-paper)] leading-tight mb-8">
                Membangun Standar Baru<br /> <span className="italic text-[var(--color-signal)]">Pengalaman Digital.</span>
              </h2>
              <div className="font-sans text-[var(--color-fog)] text-lg space-y-6 leading-relaxed">
                <p>
                  Kami memulai origindevv karena kami lelah melihat bisnis yang memiliki produk hebat, tapi gagal bersaing karena website mereka terlihat murahan, lambat, dan membosankan.
                </p>
                <p>
                  Kami percaya bahwa website Anda harus menjadi representasi terbaik dari kualitas kerja Anda. Itulah mengapa kami merancang, merakit, dan mengoptimalkan setiap baris kode dengan teliti.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-1/2 w-full aspect-square md:aspect-[4/3] bg-[var(--color-paper)] relative rounded-sm overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[var(--color-signal)]/10 flex items-center justify-center p-12">
                <div className="w-full h-full border border-[var(--color-ink)]/10 rounded-full animate-[spin_40s_linear_infinite] relative flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border border-[var(--color-ink)]/20 rounded-full absolute" />
                  <div className="w-1/3 h-1/3 border border-[var(--color-signal)]/30 rounded-full absolute bg-[var(--color-signal)]/5" />
                  <span className="font-display text-4xl text-[var(--color-ink)] opacity-20">origindevv</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 bg-[var(--color-signal)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight">
              "Kami menolak membuat website yang lambat. Setiap piksel dan baris kode dirancang untuk membawa hasil nyata bagi bisnis Anda."
            </h2>
            <div className="mt-12 w-24 h-1 bg-[var(--color-ink)] mx-auto opacity-20"></div>
          </motion.div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-24 bg-[var(--color-paper)]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-4xl text-[var(--color-ink)] mb-6">Prinsip Kerja Kami</h2>
            <p className="font-sans text-[var(--color-ink-subtle)] text-lg">
              Empat pilar utama yang mendasari setiap keputusan desain dan baris kode yang kami hasilkan untuk klien kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {principles.map((principle, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-t border-[var(--color-ink)]/20 pt-8"
              >
                <div className="font-mono text-[var(--color-signal)] text-sm mb-4">0{index + 1}</div>
                <h3 className="font-display text-2xl text-[var(--color-ink)] mb-4">{principle.title}</h3>
                <p className="font-sans text-[var(--color-ink-subtle)] leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Process Section */}
      <section className="py-24 bg-[var(--color-ink)] border-t border-[var(--color-paper)]/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-mono text-[var(--color-signal)] text-sm tracking-[0.12em] uppercase mb-4">
              [ WORKFLOW ]
            </h2>
            <h3 className="font-display text-4xl md:text-5xl text-[var(--color-paper)]">
              Proses Pengerjaan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((proc, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--color-paper)]/5 p-8 rounded-sm hover:bg-[var(--color-paper)]/10 transition-colors border border-[var(--color-paper)]/10"
              >
                <div className="font-display text-5xl text-[var(--color-signal)] opacity-50 mb-6">{proc.step}</div>
                <h4 className="font-display text-2xl text-[var(--color-paper)] mb-4">{proc.title}</h4>
                <p className="font-sans text-[var(--color-fog)] leading-relaxed">{proc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-[var(--color-paper)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display text-4xl text-[var(--color-ink)] mb-6">Teknologi yang Kami Gunakan</h2>
            <p className="font-sans text-[var(--color-ink-subtle)] text-lg">
              Kami menggunakan teknologi modern standar industri untuk memastikan website Anda cepat, aman, dan mudah dikembangkan di masa depan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {techStack.map((stack, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-l-2 border-[var(--color-signal)] pl-6"
              >
                <h3 className="font-mono tracking-widest text-[var(--color-ink)] uppercase mb-6">{stack.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {stack.tools.map((tool, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] font-sans text-sm rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
