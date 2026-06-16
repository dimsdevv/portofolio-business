import { MessageSquare } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function FloatingContact() {
  const whatsappUrl = "https://wa.me/6289654297309?text=Halo%20origindevv,%20saya%20punya%20proyek%20ambisius%20yang%20ingin%20didiskusikan."
  
  return (
    <div className="fixed bottom-8 right-8 z-[99] group">
      {/* Tooltip on hover */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-[var(--color-ink)] border border-[var(--color-border-ink)] text-[var(--color-paper)] font-mono text-xs px-4 py-2 pointer-events-none hidden md:block shadow-2xl">
        KONSULTASI GRATIS
      </div>
      
      {/* Brutalist-lite floating button */}
      <MagneticButton 
        href={whatsappUrl} 
        className="flex items-center justify-center w-16 h-16 bg-[var(--color-signal)] text-[var(--color-ink)] shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 border-2 border-[var(--color-ink)]"
      >
        <MessageSquare size={28} strokeWidth={1.5} />
      </MagneticButton>
    </div>
  )
}
