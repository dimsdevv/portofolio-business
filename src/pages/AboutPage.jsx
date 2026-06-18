import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
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
      description: "Kami tidak bekerja hit-and-run. Kami menjadi mitra teknologi yang membantu Anda beradaptasi, tumbuh, dan memelihara aset digital Anda."
    }
  ]

  return (
    <main className="bg-[var(--color-ink)] min-h-screen">
      <Helmet>
        <title>Tentang Kami · origindevv</title>
        <meta name="description" content="origindevv adalah studio pengembangan web yang percaya pada kualitas, performa tinggi, dan desain kustom. Kenali filosofi dan cara kerja kami." />
      </Helmet>

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
              {/* Abstrak visual / placeholder citra studio */}
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

      {/* Stats - Reused aesthetic from AboutSection */}
      <section className="py-20 bg-[var(--color-signal)] text-[var(--color-ink)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--color-ink)]/20">
            {[
              { num: "12+", label: "Klien Puas" },
              { num: "99%", label: "Skor Performa" },
              { num: "3+", label: "Tahun Pengalaman" },
              { num: "100%", label: "Kode Kustom" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl font-bold mb-2">{stat.num}</div>
                <div className="font-mono text-xs tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
