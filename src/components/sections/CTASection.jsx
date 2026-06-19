import { useState } from 'react';
import InquiryModal from '../ui/InquiryModal';

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="bg-[var(--color-signal)] py-32 md:py-48 text-[var(--color-ink)] text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="font-display text-[var(--text-heading)] lg:text-7xl leading-none tracking-tight mb-6">
            Siap membangun website<br/>yang berdampak nyata?
          </h2>
          
          <p className="font-sans text-xl opacity-70 mb-12 max-w-md mx-auto">
            Ceritakan project Anda. Kami akan membalas dalam 24 jam.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 bg-[var(--color-ink)] text-[var(--color-signal)] hover:bg-[#000] px-8 py-4 font-semibold text-lg transition-colors rounded-sm mb-16"
          >
            <span>Mulai Diskusi Sekarang</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 font-mono text-sm tracking-wider">
            <a href="mailto:dmscmail0@gmail.com" className="hover:opacity-60 transition-opacity flex items-center gap-2">
              <span>✉</span> dmscmail0@gmail.com
            </a>
            <span className="hidden md:block opacity-30">|</span>
            <a href="https://wa.me/6289654297309" className="hover:opacity-60 transition-opacity flex items-center gap-2">
              <span>📱</span> 089654297309
            </a>
          </div>
        </div>
      </section>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
