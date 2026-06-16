import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-24 bg-[var(--color-ink)] min-h-screen text-[var(--color-paper)]">
      <Helmet>
        <title>Kebijakan Privasi · origindevv</title>
        <meta name="description" content="Transparansi mutlak tentang bagaimana kami melindungi data bisnis Anda." />
      </Helmet>

      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="font-display text-5xl md:text-7xl uppercase mb-12">Privasi Anda. Tanpa Omong Kosong Hukum.</h1>
        
        <div className="space-y-12 font-sans text-lg text-[var(--color-fog)] leading-relaxed">
          <section>
            <h2 className="font-display text-3xl uppercase text-[var(--color-paper)] mb-4">Perlindungan Data Absolut.</h2>
            <p>
              Kami membenci penjual data *spam* sama seperti Anda. Setiap potongan informasi yang Anda kirimkan kepada origindevv—mulai dari alamat email, kontak telepon, hingga cetak biru finansial proyek Anda—diperlakukan sebagai rahasia tingkat tinggi. Kami tidak memanen, menjual, menyewakan, atau mendistribusikan data internal bisnis Anda kepada pihak ketiga mana pun. Titik.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl uppercase text-[var(--color-paper)] mb-4">Hanya Melacak yang Penting.</h2>
            <p>
              Tidak ada *cookie* pelacak agresif yang mengikuti Anda setelah Anda menutup halaman ini. Sistem kami murni mengumpulkan analitik esensial tingkat server dan rekaman komunikasi eksplisit untuk mengoptimalkan cara kami melayani Anda. 
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl uppercase text-[var(--color-paper)] mb-4">Kerahasiaan Proyek Secara Default (NDA).</h2>
            <p>
              Sebagai agensi arsitektur digital profesional, kami meletakkan integritas di atas segalanya. Kode sumber, strategi rilis, dan logika bisnis yang Anda konsultasikan dengan kami dijamin keamanannya. Bahkan sebelum dokumen *Non-Disclosure Agreement* formal ditandatangani, seluruh staf origindevv beroperasi di bawah sumpah kerahasiaan mutlak.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl uppercase text-[var(--color-paper)] mb-4">Infrastruktur Keamanan.</h2>
            <p>
              Kode Anda disimpan di repositori privat. *Database* kami tidak diekspos secara sembarangan, dijamin oleh ORM modern (Prisma) yang menghilangkan sebagian besar serangan *SQL injection*, dan API yang diamankan menggunakan protokol *Bearer Token* dan arsitektur *Express.js* yang dirancang secara profesional.
            </p>
          </section>
        </div>

        <div className="mt-20 border-t border-[var(--color-border-ink)] pt-12 flex items-center justify-between">
          <p className="font-mono text-sm uppercase tracking-widest text-[var(--color-ink-subtle)]">
            TERAKHIR DIPERBARUI: HARI INI
          </p>
          <Link to="/" className="inline-block border-b-2 border-[var(--color-signal)] text-[var(--color-paper)] font-mono text-sm uppercase pb-1 hover:text-[var(--color-signal)] transition-colors">
            ← KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </main>
  )
}
