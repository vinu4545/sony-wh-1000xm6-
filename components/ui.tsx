'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function NavbarLink({ children, href }: { children: React.ReactNode; href: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-sm text-white/60 hover:text-white transition-colors duration-300"
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sony-blue to-sony-cyan"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}

export function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-2.5 text-sm font-medium text-white rounded-lg overflow-hidden group"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sony-blue to-sony-cyan"
        animate={{ opacity: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-lg bg-gradient-to-r from-sony-blue to-sony-cyan opacity-0"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Text */}
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  )
}

export function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative px-6 py-2.5 text-sm font-medium text-white transition-all duration-300"
    >
      {/* Border with gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-white/20"
        animate={{
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Text */}
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  )
}

export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"
    />
  )
}

export function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-sony-cyan/30 transition-all duration-300"
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-sony-blue/10 to-sony-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ zIndex: -1 }}
      />
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-sony-blue/5 to-transparent" />
      </div>
      {children}
    </motion.div>
  )
}
