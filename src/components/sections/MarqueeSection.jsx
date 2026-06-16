export default function MarqueeSection() {
  const text = "DESAIN RESPONSIF · REACT · NEXT.JS · OPTIMASI PERFORMA · TAILWIND CSS · INTEGRASI CMS · E-COMMERCE · SIAP SEO · "
  
  // Create a long enough string so the marquee looks continuous
  const marqueeText = text.repeat(4)

  return (
    <div className="bg-[var(--color-signal)] h-12 flex items-center overflow-hidden border-y border-[var(--color-ink)]">
      <div className="whitespace-nowrap flex group cursor-default">
        <div className="animate-marquee font-mono text-[var(--color-ink)] text-xs font-semibold tracking-widest uppercase group-hover:[animation-play-state:paused]">
          {marqueeText}
        </div>
        <div className="animate-marquee font-mono text-[var(--color-ink)] text-xs font-semibold tracking-widest uppercase group-hover:[animation-play-state:paused] absolute top-0" style={{ transform: 'translateX(100%)' }}>
          {marqueeText}
        </div>
      </div>
    </div>
  )
}
