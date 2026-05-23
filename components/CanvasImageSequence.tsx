'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CanvasImageSequenceProps {
  frameCount: number
  framePath: (index: number) => string
  onFrameChange?: (frameIndex: number) => void
  scrollYProgress?: any
}

export function CanvasImageSequence({
  frameCount,
  framePath,
  onFrameChange,
  scrollYProgress,
}: CanvasImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null))
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)

  // Preload all images
  useEffect(() => {
    let loadedCount = 0

    const preloadImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
          imagesRef.current[index] = img
          loadedCount++
          if (loadedCount === frameCount) {
            setIsLoaded(true)
          }
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === frameCount) {
            setIsLoaded(true)
          }
          resolve()
        }
        img.src = framePath(index)
      })
    }

    const loadAll = async () => {
      const promises = Array.from({ length: frameCount }, (_, i) => preloadImage(i))
      await Promise.all(promises)
    }

    loadAll()
  }, [frameCount, framePath])

  // Handle scroll and frame rendering
  useEffect(() => {
    const handleScroll = () => {
      if (!canvasRef.current || !isLoaded) return

      const canvas = canvasRef.current
      const container = containerRef.current
      if (!container) return

      // Get scroll progress (0-1) relative to this section
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const windowHeight = window.innerHeight

      // Calculate scroll progress: 0 when container top is at window bottom, 1 when container bottom is at window top
      let scrollProgress = (windowHeight - containerTop) / (windowHeight + containerHeight)
      scrollProgress = Math.max(0, Math.min(1, scrollProgress))

      // Map scroll progress to frame index with slower progression (2.5x slower)
      const frameIndex = Math.floor(scrollProgress * (frameCount - 1) * 0.4)
      setCurrentFrame(frameIndex)
      onFrameChange?.(frameIndex)

      // Draw current frame
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const image = imagesRef.current[frameIndex]
      if (!image) return

      // Set canvas size to match window
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      ctx.scale(dpr, dpr)

      // Clear canvas
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Calculate image position and scale to fit in viewport
      const imgAspect = image.width / image.height
      const viewportAspect = window.innerWidth / window.innerHeight

      let drawWidth = window.innerWidth
      let drawHeight = window.innerHeight

      if (imgAspect > viewportAspect) {
        drawWidth = window.innerHeight * imgAspect
        drawHeight = window.innerHeight
      } else {
        drawWidth = window.innerWidth
        drawHeight = window.innerWidth / imgAspect
      }

      const x = (window.innerWidth - drawWidth) / 2
      const y = (window.innerHeight - drawHeight) / 2

      // Draw image
      ctx.drawImage(image, x, y, drawWidth, drawHeight)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isLoaded, frameCount, onFrameChange])

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen"
        style={{ zIndex: 0, background: '#050505' }}
      />
    </div>
  )
}
