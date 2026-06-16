import Accordion from '../ui/Accordion'

export default function FAQSection() {
  const faqs = [
    {
      id: "01",
      question: "Berapa lama proses pembuatan website?",
      answer: "Waktu pengerjaan bervariasi dari 2 hingga 8 minggu tergantung pada kompleksitas proyek. Landing page biasanya memakan waktu 2 minggu, sementara e-commerce custom bisa memakan waktu hingga 8 minggu."
    },
    {
      id: "02",
      question: "Apakah saya perlu menyiapkan konten sendiri?",
      answer: "Ya, kami mengandalkan klien untuk materi teks dan brand asset dasar. Namun, jika Anda membutuhkan bantuan copywriting yang persis, kami memiliki layanan tambahan untuk itu."
    },
    {
      id: "03",
      question: "Teknologi apa yang digunakan?",
      answer: "Kami menggunakan stack modern (React, Next.js, Tailwind CSS) untuk memastikan performa tinggi, SEO terbaik, dan keamanan."
    },
    {
      id: "04",
      question: "Bagaimana proses revisi bekerja?",
      answer: "Setiap fase (wireframe, desain, development) memiliki 2 putaran revisi. Kami memastikan Anda puas di setiap tahap sebelum melanjutkan ke tahap berikutnya."
    },
    {
      id: "05",
      question: "Apakah ada garansi setelah website selesai?",
      answer: "Ya, kami memberikan garansi perbaikan bug selama 30 hari setelah peluncuran. Kami juga menawarkan paket maintenance bulanan untuk dukungan jangka panjang."
    }
  ]

  return (
    <section className="py-32 bg-[var(--color-ink)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-mono text-[var(--color-fog)] text-sm tracking-[0.12em] uppercase mb-16 text-center">
          [ 06 — PERTANYAAN UMUM ]
        </h2>

        <div className="border-b border-[var(--color-border-ink)]">
          {faqs.map((faq) => (
            <Accordion 
              key={faq.id}
              number={faq.id}
              title={faq.question}
              description={faq.answer}
              theme="dark"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
