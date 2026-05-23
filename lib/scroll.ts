// Scroll progress utility functions
export function getScrollProgress(): number {
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight - windowHeight
  const scrolled = window.scrollY
  return docHeight > 0 ? (scrolled / docHeight) * 100 : 0
}

export function getElementScrollProgress(element: Element): { start: number; current: number; end: number } {
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight - windowHeight
  
  const rect = element.getBoundingClientRect()
  const elementTop = window.scrollY + rect.top
  const elementBottom = elementTop + rect.height
  
  const startPercent = (elementTop / (docHeight + windowHeight)) * 100
  const endPercent = (elementBottom / (docHeight + windowHeight)) * 100
  const currentPercent = getScrollProgress()
  
  return {
    start: Math.max(0, startPercent),
    current: currentPercent,
    end: Math.min(100, endPercent),
  }
}

export function mapScrollToValue(
  scrollPercent: number,
  startPercent: number,
  endPercent: number,
  startValue: number,
  endValue: number
): number {
  const range = endPercent - startPercent
  if (range === 0) return startValue
  
  const progress = Math.max(0, Math.min(1, (scrollPercent - startPercent) / range))
  return startValue + (endValue - startValue) * progress
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
