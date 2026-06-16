import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Accordion({ id, number, title, description, price }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-[var(--color-border-paper)] py-6 group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-start md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-6">
          {number && <span className="font-mono text-[var(--color-fog)] uppercase text-sm">{number}</span>}
          <h3 className="font-display text-xl md:text-2xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-signal-dim)] transition-colors duration-300">
            {title}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--color-ink)]"
          >
            ↓
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-0 md:pl-12">
              <p className="font-sans text-[var(--color-fog)] leading-relaxed max-w-2xl mb-3">
                {description}
              </p>
              {price && (
                <p className="font-mono text-[var(--color-signal-dim)] text-sm font-medium">
                  {price}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
