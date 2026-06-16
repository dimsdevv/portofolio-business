import { motion } from 'framer-motion'

export default function AnimatedText({ text, className }) {
  // Handle empty text
  if (!text) return null;
  
  // Split by spaces, keeping newlines or other formatting if necessary
  // Or handle line breaks explicitly if passed as part of text
  const words = text.split(' ')
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
