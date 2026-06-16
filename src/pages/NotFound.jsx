import { Helmet } from 'react-helmet-async'
import MagneticButton from '../components/ui/MagneticButton'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-ink)] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      <Helmet>
        <title>404: Jalan Buntu · origindevv</title>
      </Helmet>

      {/* Big Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="font-display text-[30vw] text-[var(--color-paper)] whitespace-nowrap">404</h1>
      </div>

      <div className="relative z-10 max-w-2xl">
        <h2 className="font-mono text-[var(--color-signal)] text-sm tracking-[0.2em] uppercase mb-6">[ JALAN BUNTU ]</h2>
        <h1 className="font-display text-5xl md:text-7xl uppercase text-[var(--color-paper)] mb-8 leading-tight">Sistem Gagal Menemukan Target.</h1>
        <p className="font-sans text-xl text-[var(--color-fog)] leading-relaxed mb-12">
          Halaman yang Anda cari sudah tidak ada atau URL-nya salah. Mungkin nasibnya sama seperti website yang tidak dioptimasi: Hilang ditelan mesin pencari. Mari kembali ke rute yang benar.
        </p>

        <MagneticButton to="/" className="inline-block bg-[var(--color-paper)] text-[var(--color-ink)] px-8 py-4 font-bold uppercase tracking-wider hover:bg-[var(--color-signal)] transition-colors shadow-2xl">
          KEMBALI KE BERANDA
        </MagneticButton>
      </div>
    </main>
  )
}
