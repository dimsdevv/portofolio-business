import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import CTASection from '../components/sections/CTASection'
import FAQSection from '../components/sections/FAQSection'
import { Shield, Target, Zap } from 'lucide-react'

export default function ServicesPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Berfokus pada Konversi",
      description: "Desain yang tidak hanya cantik, tetapi juga dioptimalkan untuk mengubah pengunjung menjadi pembeli."
    },
    {
      icon: <Zap className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Performa Maksimal",
      description: "Kecepatan muat (loading) di atas rata-rata berkat kode bersih tanpa template usang."
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Dukungan Penuh",
      description: "Kami tidak lari setelah proyek selesai. Tim kami siap membantu memastikan website Anda terus berjalan lancar."
    }
  ]

  const serviceFaqs = [
    {
      question: "Bagaimana cara kerja pembayaran?",
      answer: "Kami menggunakan sistem termin: 50% di muka sebagai tanda jadi, dan 50% pelunasan setelah proyek selesai dan siap diluncurkan."
    },
    {
      question: "Apakah harga masih bisa dinegosiasikan?",
      answer: "Harga yang tercantum adalah harga awal estimasi. Total investasi akan disesuaikan dengan kompleksitas fitur dan kebutuhan khusus bisnis Anda."
    },
    {
      question: "Apakah saya perlu menyediakan domain & hosting?",
      answer: "Tidak perlu repot. Harga paket utama kami umumnya belum termasuk domain & hosting khusus, namun kami akan membantu proses pemilihan, pembelian, hingga setup tanpa biaya setup tambahan."
    },
    {
      question: "Berapa lama waktu pengerjaan?",
      answer: "Waktu pengerjaan sangat bervariasi. Landing page bisa memakan waktu 1-2 minggu, sementara E-commerce kustom mungkin membutuhkan 4-8 minggu tergantung kompleksitas."
    }
  ]

  return (
    <main className="bg-[var(--color-ink)] min-h-screen">
      <SEO 
        title="Layanan Pembuatan Website" 
        description="Layanan jasa pembuatan website profesional, mulai dari Company Profile, E-Commerce, hingga Landing Page berkinerja tinggi." 
        url="https://portofolio-busines.netlify.app/layanan"
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 border-b border-[var(--color-border-ink)]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-mono text-[var(--color-signal)] text-sm tracking-[0.12em] uppercase mb-8">
              [ LAYANAN & KEAHLIAN ]
            </h1>
            <h2 className="font-display text-5xl md:text-7xl text-[var(--color-paper)] leading-tight mb-8">
              Solusi Digital yang<br /> <span className="italic text-[var(--color-signal)]">Mempercepat</span> Pertumbuhan.
            </h2>
            <p className="font-sans text-[var(--color-fog)] text-xl max-w-2xl leading-relaxed">
              Kami tidak sekadar membuat website. Kami membangun aset digital yang bekerja 24/7 untuk meningkatkan kredibilitas dan penjualan bisnis Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-[var(--color-ink)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-6">{val.icon}</div>
                <h3 className="font-display text-2xl text-[var(--color-paper)] mb-4">{val.title}</h3>
                <p className="font-sans text-[var(--color-fog)] leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Services List - Reused from Home */}
      <ServicesSection />

      {/* Process / How We Work */}
      <ProcessSection />

      {/* FAQs specific to Services */}
      <FAQSection 
        faqsData={serviceFaqs} 
        title="Pertanyaan Seputar Layanan" 
        subtitle="[ FAQ LAYANAN ]" 
      />

      <CTASection />
    </main>
  )
}
