import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Box } from '@chakra-ui/react'

const ParticleNetwork = () => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const isVisibleRef = useRef(true)
  const containerRef = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(true)

  // Intersection observer for visibility detection
  useEffect(() => {
    if (!containerRef.current) return
    if (!window.IntersectionObserver) {
      setIsIntersecting(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, { rootMargin: '50px', threshold: 0.1 })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const setupCanvas = useCallback((canvas) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    return { width: rect.width, height: rect.height }
  }, [])

  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = setupCanvas(canvas)
    
    const mobile = isMobile()
    const particleCount = Math.min(
      mobile ? 15 : 30,
      Math.floor((width * height) / (mobile ? 40000 : 20000))
    )
    const connectionDistance = mobile ? 80 : 120

    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (mobile ? 0.15 : 0.25),
        vy: (Math.random() - 0.5) * (mobile ? 0.15 : 0.25),
        radius: Math.max(0.5, 0.8 + Math.random() * 0.8),
      })
    }

    let lastTime = 0
    const throttleMs = mobile ? 32 : 16

    const animate = (timestamp) => {
      if (!isVisibleRef.current || !isIntersecting) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (timestamp - lastTime < throttleMs) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = timestamp

      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        if (particles.length <= 35) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p2.x - p.x
            const dy = p2.y - p.y
            const distSq = dx * dx + dy * dy

            if (distSq < connectionDistance * connectionDistance) {
              const opacity = (1 - distSq / (connectionDistance * connectionDistance)) * 0.12
              ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }

        ctx.fillStyle = 'rgba(129, 140, 248, 0.55)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    isVisibleRef.current = true
    animationFrameRef.current = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas(canvas)
    })
    resizeObserver.observe(canvas)

    return () => {
      isVisibleRef.current = false
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [setupCanvas, isMobile, isIntersecting])

  return (
    <Box
      ref={containerRef}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      pointerEvents="none"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </Box>
  )
}

export default ParticleNetwork
