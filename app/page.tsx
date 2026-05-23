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

      {/* Canvas Image Sequence - The core scrollytelling interaction */}
      <CanvasImageSequence
        frameCount={128}
        framePath={getFramePath}
        onFrameChange={setCurrentFrame}
      />

      {/* Scroll Container - Maintains scroll height for interaction */}
      <div className="relative z-30 bg-sony-dark">
        {/* Hero / Intro Section (0-15% scroll) */}
        <div className="h-screen flex items-center justify-center pointer-events-none" />

        <ScrollText startPercent={0} endPercent={15} side="center">
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

        {/* Engineering Reveal Section (15-40% scroll) */}
        <div className="h-screen flex items-center justify-start pointer-events-none" />

        <ScrollText startPercent={15} endPercent={40} side="left">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Precision-<br />engineered for<br />silence.
            </h2>
            <div className="space-y-4 text-white/60">
              <motion.p 
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Every component is tuned for balance, power, and comfort—hour after hour.
              </motion.p>
            </div>
          </motion.div>
        </ScrollText>

        {/* Noise Cancelling Section (40-65% scroll) */}
        <div className="h-screen flex items-center justify-end pointer-events-none" />

        <ScrollText startPercent={40} endPercent={65} side="right">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Adaptive noise<br />cancelling,<br />redefined.
            </h2>
            <div className="space-y-3 text-white/60">
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg">Multi-microphone array listens in every direction.</span>
              </motion.p>
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg">Real-time noise analysis adapts to your environment.</span>
              </motion.p>
              <motion.p 
                className="flex items-start gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-sony-cyan text-lg mt-1 flex-shrink-0">→</span>
                <span className="text-base sm:text-lg">Your music stays pure—planes, trains, and crowds fade away.</span>
              </motion.p>
            </div>
          </motion.div>
        </ScrollText>

        {/* Sound & Upscaling Section (65-85% scroll) */}
        <div className="h-screen flex items-center justify-center pointer-events-none" />

        <ScrollText startPercent={65} endPercent={85} side="center">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
              Immersive, lifelike sound.
            </h2>
            <div className="space-y-4 text-white/60 max-w-xl mx-auto">
              <motion.p 
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                High-performance drivers unlock detail, depth, and texture in every track.
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
              </motion.p>
            </div>
          </motion.div>
        </ScrollText>

        {/* Reassembly & CTA Section (85-100% scroll) */}
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
                Experience WH-1000XM6
              </PrimaryButton>
              <SecondaryButton onClick={() => alert('Specs coming soon!')}>
                See full specs
              </SecondaryButton>
            </div>

            <motion.p 
              className="text-sm text-white/40 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Engineered for airports, offices, and everything in between.
            </motion.p>
          </motion.div>
        </div>

        {/* Footer breathing room */}
        <div className="h-32 bg-sony-dark" />
      </div>
    </main>
  )
}
