import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import mapIndonesia from '../../assets/map-indonesia.png'

export default function ServiceAreaSection() {
  const cities = [
    "Jakarta", "Bandung", "Surabaya", "Medan", 
    "Bali", "Makassar", "Yogyakarta", "Semarang", 
    "Palembang", "Balikpapan", "Cirebon", "Jambi"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="py-32 bg-[var(--color-paper)] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20">
          <div className="max-w-2xl lg:w-1/2">
            <h2 className="font-mono text-[var(--color-signal)] text-sm tracking-[0.12em] uppercase mb-8">
              [ AREA LAYANAN ]
            </h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight mb-6">
              Melayani Bisnis di<br /> Seluruh Nusantara.
            </h3>
            <p className="font-sans text-[var(--color-ink)]/70 text-lg md:text-xl max-w-xl">
              Jarak bukan halangan. Kami telah dipercaya membantu berbagai brand dari kota-kota besar di Indonesia untuk bertransformasi dan mendominasi pasar digital.
            </p>
          </div>
          
          <div className="hidden lg:block lg:w-1/2 flex justify-end">
            <img 
              src={mapIndonesia} 
              alt="Peta Area Layanan Indonesia" 
              loading="lazy"
              className="w-[120%] max-w-none h-auto object-contain opacity-90 -mr-12"
            />
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 md:gap-y-12 gap-x-6 border-t border-[var(--color-ink)]/10 pt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cities.map((city, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-center gap-3 group cursor-default">
              <MapPin className="w-5 h-5 text-[var(--color-ink)]/40 group-hover:text-[var(--color-signal)] transition-colors duration-300" />
              <span className="font-display text-2xl md:text-3xl text-[var(--color-ink)] group-hover:text-[var(--color-signal)] transition-colors duration-300">
                {city}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] bg-[var(--color-signal)]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
