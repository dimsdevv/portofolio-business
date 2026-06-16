import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Only show custom cursor if device has a fine pointer (like a mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    const moveCursor = (e) => {
      if (!cursorRef.current) return
      setIsVisible(true)
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
    }
    
    const handleHoverIn = () => setIsHovering(true)
    const handleHoverOut = () => setIsHovering(false)
    
    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Set up MutationObserver to attach listeners to dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
        // Remove first to avoid duplicates
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
        
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    })
    
    observer.observe(document.body, { childList: true, subtree: true })
    
    // Initial attach
    document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [])
  
  if (!isVisible) return null
  
  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] rounded-full bg-[var(--color-signal)] mix-blend-difference transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
        isHovering ? 'w-12 h-12' : 'w-3 h-3'
      }`}
      style={{ top: 0, left: 0 }}
    />
  )
}
