import React, { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

const ParticleNetwork = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const particles = []
    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
    const connectionDistance = 140
    const Colors = {
      bg: '#0f172a',
      particle: '#6366f1',
      particleGlow: '#818cf8',
      line: 'rgba(99, 102, 241, 0.15)',
      lineClose: 'rgba(6, 182, 212, 0.25)',
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5 + Math.random() * 1.5,
      })
    }

    let animationFrame
    const animate = () => {
      ctx.fillStyle = Colors.bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        particles.forEach((p2, j) => {
          if (j <= i) return
          const dx = p2.x - p.x
          const dy = p2.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance
            ctx.strokeStyle =
              dist < 70
                ? `rgba(6, 182, 212, ${opacity * 0.3})`
                : `rgba(99, 102, 241, ${opacity * 0.12})`
            ctx.lineWidth = dist < 70 ? 1 : 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
        gradient.addColorStop(0, Colors.particleGlow)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = Colors.particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      pointerEvents="none"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 35%, #0f172a 70%, #134e4a 100%)',
      }}
    />
  )
}

export default ParticleNetwork
