import { useState, useEffect } from 'react'

/**
 * Custom hook to detect mobile viewport.
 * Uses matchMedia for efficient, real-time breakpoint detection.
 * @param {number} breakpoint — max-width in px (default 768)
 * @returns {boolean} true if viewport <= breakpoint
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e) => setIsMobile(e.matches)

    // Set initial value
    setIsMobile(mq.matches)

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}
