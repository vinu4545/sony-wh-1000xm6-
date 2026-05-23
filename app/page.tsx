'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { CanvasImageSequence } from '@/components/CanvasImageSequence'
import { ScrollText } from '@/components/ScrollText'
import { PrimaryButton, SecondaryButton, FeatureCard } from '@/components/ui'

export default function Home() {
  const [currentFrame, setCurrentFrame] = useState(0)

  // Frame path function - update this to match your image naming
  const getFramePath = (index: number) => {
    return `/frames/frame_${String(index).padStart(3, '0')}.png`
  }

  return (
    <main className="relative bg-sony-dark overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Canvas Image Sequence - Slowed down for smooth viewing */}
      <CanvasImageSequence
        frameCount={128}
        framePath={getFramePath}
        onFrameChange={setCurrentFrame}
      />

      {/* Scroll Container - Extended height for slower animation */}
      <div className="relative z-30 bg-sony-dark">
        
        {/* Hero / Intro Section - Extended for smooth intro */}
        <div className="h-screen flex items-center justify-center pointer-events-none" />

        <ScrollText startPercent={0} endPercent={10} side="center">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl font-bold mb-4 tracking-tight leading-tight">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Sony WH‑1000XM6
              </motion.span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-light mb-6">
              Silence, perfected.
            </p>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl">
              Flagship wireless noise cancelling, re‑engineered for a world that never stops.
            </p>
          </motion.div>
        </ScrollText>

        {/* OVERVIEW SECTION - Extended height for slower animation */}
        <div className="h-[150vh] flex items-center justify-start pointer-events-none" />

        <ScrollText startPercent={10} endPercent={40} side="left">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-2 tracking-tight text-sony-cyan">
              Overview
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Engineered for<br />perfection.
            </h3>
            <div className="space-y-4 text-white/60">
              <motion.p 
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                The WH-1000XM6 represents the pinnacle of wireless audio engineering. Every detail has been meticulously crafted to deliver an uncompromising listening experience.
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Premium materials, precision engineering, and decades of audio expertise converge to create something extraordinary.
              </motion.p>
            </div>
          </motion.div>
        </ScrollText>

        {/* TECHNOLOGY SECTION - Extended height for slower animation */}
        <div className="h-[150vh] flex items-center justify-end pointer-events-none" />

        <ScrollText startPercent={40} endPercent={70} side="right">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-2 tracking-tight text-sony-cyan">
              Technology
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Advanced noise<br />cancellation.
            </h3>
            <div className="space-y-3 text-white/60">
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg"><strong>Dual noise sensor technology</strong> with adaptive processing</span>
              </motion.p>
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg"><strong>AI-powered sound optimization</strong> that learns your preferences</span>
              </motion.p>
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg"><strong>30-hour battery life</strong> with quick charging</span>
              </motion.p>
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg"><strong>Premium sound</strong> with LDAC support</span>
              </motion.p>
            </div>
          </motion.div>
        </ScrollText>

        {/* Call to Action Section */}
        <div className="h-screen flex flex-col items-center justify-center pointer-events-auto relative z-40">
          <motion.div 
            className="text-center space-y-8 max-w-2xl px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight leading-tight">
                Hear everything.<br />Feel nothing else.
              </h2>
              <p className="text-xl text-white/70 font-light mb-2">
                WH‑1000XM6. Designed for focus, crafted for comfort.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <PrimaryButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Experience Now
              </PrimaryButton>
              <SecondaryButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Learn More
              </SecondaryButton>
            </div>

            <motion.p 
              className="text-sm text-white/40 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Premium wireless audio. Now perfected.
            </motion.p>
          </motion.div>
        </div>

        {/* Footer breathing room */}
        <div className="h-32 bg-sony-dark" />
      </div>
    </main>
  )
}
