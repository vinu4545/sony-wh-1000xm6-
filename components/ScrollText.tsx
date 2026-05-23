'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ScrollTextProps {
  startPercent: number // 0-100
  endPercent: number // 0-100
  side: 'left' | 'center' | 'right'
  children: React.ReactNode
  className?: string
}

export function ScrollText({
  startPercent,
  endPercent,
  side,
  children,
  className = '',
}: ScrollTextProps) {
  const [opacity, setOpacity] = useState(0)
  const [offsetY, setOffsetY] = useState(20)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress as percentage of page
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const scrollPercent = (scrolled / docHeight) * 100

      // Calculate opacity based on scroll position
      if (scrollPercent < startPercent) {
        setOpacity(0)
        setOffsetY(20)
      } else if (scrollPercent > endPercent) {
        setOpacity(0)
        setOffsetY(-20)
      } else {
        // Fade in between start and end
        const fadeRange = Math.min(10, (endPercent - startPercent) / 4)
        if (scrollPercent < startPercent + fadeRange) {
          const progress = (scrollPercent - startPercent) / fadeRange
          setOpacity(progress)
          setOffsetY(20 - progress * 20)
        } else if (scrollPercent > endPercent - fadeRange) {
          const progress = (endPercent - scrollPercent) / fadeRange
          setOpacity(progress)
          setOffsetY(-progress * 20)
        } else {
          setOpacity(1)
          setOffsetY(0)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [startPercent, endPercent])

  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[side]

  const paddingClass = {
    left: 'pl-8 lg:pl-16 pr-4 lg:pr-8',
    center: 'px-4 lg:px-8',
    right: 'pl-4 lg:pl-8 pr-8 lg:pr-16',
  }[side]

  return (
    <motion.div
      style={{
        opacity,
        y: offsetY,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`pointer-events-none fixed z-20 left-0 right-0 top-1/2 -translate-y-1/2 ${paddingClass} ${alignmentClass} ${className}`}
    >
      {children}
    </motion.div>
  )
}
