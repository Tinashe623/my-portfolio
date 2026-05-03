import { useEffect, useState } from 'react'

export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(true)

  useEffect(() => {
    if (!ref.current) return
    if (!window.IntersectionObserver) {
      setIsIntersecting(true)
      return
    }

    const element = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return { isIntersecting }
}
