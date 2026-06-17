import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import AnimatedText from '../components/ui/AnimatedText'
import MagneticButton from '../components/ui/MagneticButton'
import { Zap, Layout, Search, Smartphone, Shield, CheckCircle2, XCircle } from 'lucide-react'
import FAQSection from '../components/sections/FAQSection'

export default function WhyUs() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Kecepatan yang Menghasilkan Penjualan",
      description: "Website lambat membunuh konversi. Kami menggunakan teknologi modern (React & arsitektur Serverless) agar website Anda memuat dalam hitungan milidetik. Pengunjung senang, Google pun senang."
    },
    {
      icon: <Layout className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Desain Kelas Dunia & Estetika Premium",
      description: "Tinggalkan desain template yang membosankan. Kami merancang antarmuka (UI/UX) khusus yang menonjolkan karakter brand Anda, membangun kepercayaan instan pada detik pertama pengunjung melihatnya."
    },
    {
      icon: <Search className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Optimalisasi SEO Bawaan",
      description: "Website bagus tidak ada gunanya jika tidak bisa ditemukan. Struktur kode kami dirancang agar sangat ramah terhadap mesin pencari (SEO-friendly), membantu bisnis Anda mendominasi halaman pertama Google."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Responsif & Sempurna di Semua Perangkat",
      description: "Lebih dari 70% lalu lintas web berasal dari smartphone. Kami memastikan website Anda terlihat dan berfungsi sama sempurnanya di layar HP kecil maupun monitor 4K."
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-signal)]" />,
      title: "Keamanan & Skalabilitas",
      description: "Data Anda dan pelanggan aman bersama kami. Infrastruktur cloud yang kami bangun mampu menangani lonjakan pengunjung kapan pun bisnis Anda viral, tanpa khawatir server down."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <main className="bg-[var(--color-ink)] min-h-screen text-[var(--color-paper)]">
      <Helmet>
        <title>Mengapa Memilih Kami? · origindevv</title>
        <meta name="description" content="Ketahui keuntungan dan benefit membuat website bersama origindevv. Website super cepat, desain premium, dan ramah SEO untuk meningkatkan profit Anda." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 border-b border-[var(--color-border-ink)]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Website Bukan Sekadar Kartu Nama Digital. Ini <span className="text-[var(--color-signal)] italic">Mesin Penghasil Profit</span> Anda.
          </motion.h1>
          <motion.p 
            className="font-sans text-lg md:text-xl text-[var(--color-fog)] leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Di origindevv, kami tidak hanya mendesain tampilan yang indah. Kami membangun ekosistem digital yang cepat, tangguh, dan dirancang khusus untuk mengubah pengunjung menjadi pelanggan setia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton 
              href="/#contact" 
              className="inline-flex justify-center items-center bg-[var(--color-signal)] text-[var(--color-ink)] px-8 py-4 font-semibold text-lg hover:bg-[var(--color-paper)] transition-colors rounded-sm"
            >
              Mulai Proyek Anda
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Core Benefits Grid */}
      <section className="py-24 px-6 border-b border-[var(--color-border-ink)]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-mono text-[var(--color-fog)] uppercase text-sm tracking-widest mb-4">Benefit Anda</h2>
            <h3 className="font-display text-3xl md:text-5xl">Apa yang Membedakan Kami?</h3>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-[var(--color-ink-muted)] border border-[var(--color-border-ink)] p-8 hover:border-[var(--color-border-paper)] transition-colors duration-300 rounded-sm"
                variants={itemVariants}
              >
                <div className="mb-6 p-4 bg-[var(--color-ink)] inline-block rounded-full border border-[var(--color-border-ink)]">
                  {benefit.icon}
                </div>
                <h4 className="font-display text-xl md:text-2xl mb-4 leading-tight">{benefit.title}</h4>
                <p className="font-sans text-[var(--color-fog)] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
            
            {/* CTA Card in Grid */}
            <motion.div 
              className="bg-[var(--color-signal)] text-[var(--color-ink)] p-8 rounded-sm flex flex-col justify-center items-center text-center"
              variants={itemVariants}
            >
              <h4 className="font-display text-2xl mb-4">Ingin Hasil yang Sama?</h4>
              <p className="font-sans mb-8">Berhenti membuang peluang dengan website yang tidak bekerja maksimal.</p>
              <a href="/#contact" className="border border-[var(--color-ink)] px-6 py-3 font-semibold hover:bg-[var(--color-ink)] hover:text-[var(--color-signal)] transition-colors rounded-sm">
                Konsultasi Gratis
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 border-b border-[var(--color-border-ink)]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-mono text-[var(--color-fog)] uppercase text-sm tracking-widest mb-4">Perbandingan</h2>
            <h3 className="font-display text-3xl md:text-5xl">Mengapa Memilih Kami?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* The Old Way */}
            <motion.div 
              className="p-8 border border-[var(--color-border-ink)] bg-[var(--color-ink)] rounded-sm opacity-60"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 0.6, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="font-display text-2xl mb-6 text-[var(--color-fog)] flex items-center gap-3">
                <XCircle className="text-red-500" /> Agensi Tradisional
              </h4>
              <ul className="space-y-4 font-sans text-[var(--color-fog)]">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span> Menggunakan template pasaran yang lambat
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span> Desain kaku dan tidak mencerminkan brand Anda
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span> Kode membengkak dan buruk untuk SEO
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span> Lepas tangan setelah website diluncurkan
                </li>
              </ul>
            </motion.div>

            {/* The origindevv Way */}
            <motion.div 
              className="p-8 border border-[var(--color-signal)] bg-[var(--color-ink-muted)] rounded-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 bg-[var(--color-signal)] text-[var(--color-ink)] text-xs font-bold px-3 py-1 font-mono">
                ORIGINDEVV WAY
              </div>
              <h4 className="font-display text-2xl mb-6 flex items-center gap-3 text-[var(--color-paper)]">
                <CheckCircle2 className="text-[var(--color-signal)]" /> origindevv Studio
              </h4>
              <ul className="space-y-4 font-sans text-[var(--color-paper)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-signal)] mt-1">✓</span> Kode kustom modern (React) yang super cepat
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-signal)] mt-1">✓</span> UI/UX eksklusif, dibuat spesifik untuk brand Anda
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-signal)] mt-1">✓</span> Arsitektur yang dirancang murni untuk SEO & Konversi
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-signal)] mt-1">✓</span> Pemeliharaan, garansi, dan dukungan berkelanjutan
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        subtitle="[ KERAGUAN UMUM ]"
        faqsData={[
          {
            id: "01",
            question: "Kenapa harganya bisa lebih tinggi dari freelancer biasa?",
            answer: "Kami tidak menggunakan template WordPress murahan. Kami membangun ekosistem digital secara kustom dari nol dengan fokus pada kecepatan dan konversi. Ini adalah investasi bisnis yang dirancang untuk balik modal melalui penjualan yang dihasilkan."
          },
          {
            id: "02",
            question: "Apakah saya benar-benar membutuhkan website kustom?",
            answer: "Jika bisnis Anda baru mulai dan dana sangat terbatas, website template mungkin cukup. Namun, jika Anda ingin skala besar, menonjol dari kompetitor, dan membutuhkan performa maksimal untuk mendominasi Google, website kustom adalah keharusan."
          },
          {
            id: "03",
            question: "Saya sudah punya website, apakah bisa diperbaiki saja?",
            answer: "Kami biasanya membangun ulang dari awal untuk memastikan standar kualitas, keamanan, dan kecepatan kami terpenuhi. Namun, kami sangat terbuka untuk melakukan perombakan total (revamp) dengan memanfaatkan materi dari website lama Anda."
          }
        ]}
      />

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Abstract Glow Background */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-30">
          <div className="w-[800px] h-[800px] bg-[var(--color-signal)] rounded-full blur-[150px] mix-blend-screen opacity-20"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h2 
            className="font-display text-4xl md:text-6xl max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Siap Meningkatkan Level Bisnis Anda?
          </motion.h2>
          <motion.p 
            className="font-sans text-xl text-[var(--color-fog)] max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Berhenti membuang waktu dan biaya untuk website yang tidak memberikan hasil. Mari diskusikan visi Anda bersama kami.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MagneticButton 
              href="/#contact" 
              className="inline-flex justify-center items-center bg-[var(--color-paper)] text-[var(--color-ink)] px-10 py-5 font-bold text-lg hover:bg-[var(--color-signal)] transition-colors rounded-sm shadow-lg shadow-[var(--color-signal)]/10"
            >
              Konsultasi Gratis Sekarang
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
