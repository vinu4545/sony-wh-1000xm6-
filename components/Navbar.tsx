'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: isScrolled ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="container-max h-16 flex items-center justify-between">
        {/* Logo / Product Name */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            WH-1000XM6
          </Link>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Overview', 'Technology', 'Noise Cancelling', 'Specs', 'Buy'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right CTA Button */}
        <div className="flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary text-xs sm:text-sm"
          >
            Experience WH-1000XM6
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
