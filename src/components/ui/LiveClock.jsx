import { useState, useEffect } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      // Setup waktu berdasar zona WIB
      const date = new Date()
      const formatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      setTime(formatter.format(date).replace(/\./g, ':'))
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Mencegah hydration mismatch jika dirender di server,
  // tapi untuk aplikasi Vite murni ini aman. Kita beri fallback 00:00:00.
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 font-mono text-xs md:text-sm text-[var(--color-fog)] uppercase tracking-widest border border-[var(--color-border-ink)] py-2 px-4 bg-[var(--color-paper-off)]/5 backdrop-blur-sm relative z-20 inline-flex shadow-sm">
      <div className="flex items-center gap-2">
        <span className="opacity-60">WAKTU LOKAL:</span>
        <span className="text-[var(--color-paper)] font-bold">{time || '00:00:00'} WIB</span>
        <span className="opacity-60 hidden sm:inline">(CIREBON)</span>
      </div>
      <div className="hidden sm:block w-px h-4 bg-[var(--color-border-ink)]"></div>
      <div className="flex items-center gap-2">
        <span className="opacity-60">STATUS:</span>
        <span className="flex items-center gap-2 text-[var(--color-paper)] font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--color-signal)] animate-pulse-slow"></span>
          TERSEDIA (2 SLOT)
        </span>
      </div>
    </div>
  )
}
