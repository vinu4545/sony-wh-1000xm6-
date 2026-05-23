# Development Setup Guide

## Project Architecture

This Sony WH-1000XM6 scrollytelling page is built with a modular, performance-first architecture:

```
┌─────────────────────────────────────────────┐
│         Canvas Image Sequence Layer          │
│  (Fixed, scroll-driven frame playback)       │
└─────────────────────────────────────────────┘
              ↑
┌─────────────────────────────────────────────┐
│      Scroll-Triggered Text Overlays          │
│   (Fade in/out based on scroll %)            │
└─────────────────────────────────────────────┘
              ↑
┌─────────────────────────────────────────────┐
│        Fixed Navigation (Navbar)             │
│  (Glass effect, fades in on scroll)          │
└─────────────────────────────────────────────┘
```

## Component Breakdown

### Navbar.tsx
**Purpose**: Apple-style fixed navigation bar
**Features**:
- Transparent at top, fades in after scroll
- Contains product name, nav links, CTA button
- Glassmorphism effect with backdrop blur
- Responsive design (hidden on mobile, visible at md breakpoint)

**Usage**:
```tsx
<Navbar />
```

**Customization**:
- Edit nav links array: `['Overview', 'Technology', 'Noise Cancelling', 'Specs', 'Buy']`
- Change fade-in threshold: `setIsScrolled(window.scrollY > 50)`

### CanvasImageSequence.tsx
**Purpose**: Hardware-accelerated image sequence playback
**Features**:
- Preloads all 128 frames before rendering
- Maps scroll position to frame index (0-127)
- Scales frames to fit viewport with DPR compensation
- Maintains background color (#050505) for seamless blending

**Props**:
```tsx
interface CanvasImageSequenceProps {
  frameCount: number              // Total frames (128)
  framePath: (index: number) => string  // Frame path generator
  onFrameChange?: (frameIndex: number) => void  // Callback
  scrollYProgress?: any           // Optional scroll progress object
}
```

**Key Implementation Details**:
1. Image preloading happens on mount
2. Scroll listener calculates frame index via viewport intersection
3. Canvas drawing optimized with DPR scaling
4. Frame is centered and scaled to fill viewport

### ScrollText.tsx
**Purpose**: Scroll-triggered text overlays
**Features**:
- Appears/disappears based on scroll percentage
- Supports left/center/right alignment
- Spring animation for smooth transitions
- Y offset animation for depth

**Props**:
```tsx
interface ScrollTextProps {
  startPercent: number    // 0-100: when fade starts
  endPercent: number      // 0-100: when fade ends
  side: 'left' | 'center' | 'right'  // Text alignment
  children: React.ReactNode
  className?: string      // Additional Tailwind classes
}
```

**Scroll Percentage Mapping**:
- 0-15%: Hero intro
- 15-40%: Engineering reveal
- 40-65%: Noise cancelling
- 65-85%: Sound & upscaling
- 85-100%: Reassembly & CTA

### ui.tsx
**Purpose**: Reusable UI components with premium styling
**Components**:
- `PrimaryButton`: Gradient CTA with hover glow
- `SecondaryButton`: Border-based button with hover effects
- `FeatureCard`: Card component with gradient on hover
- `HeroSection`: Container with ambient gradient background

## Styling System

### Tailwind Configuration (tailwind.config.ts)
Custom colors and tokens:
```ts
colors: {
  'sony-dark': '#050505',      // Main background
  'sony-darker': '#0A0A0C',    // Section backgrounds
  'sony-blue': '#0050FF',      // Primary accent
  'sony-cyan': '#00D6FF',      // Secondary accent
}
```

### CSS Classes (globals.css)
Special utility classes:
- `.glass`: Glassmorphism effect
- `.glow`, `.glow-sm`, `.glow-lg`: Cyan glow effects
- `.gradient-text`: Text gradient effect
- `.ambient-gradient`: Radial gradient background
- `.btn`, `.btn-primary`, `.btn-secondary`: Button styles

## Scroll-Linked Animation System

### How Scroll Progress Works

1. **Global Scroll Percentage**:
   ```
   scrollPercent = (scrollY / (docHeight - windowHeight)) * 100
   ```

2. **Frame Mapping**:
   ```
   frameIndex = scrollPercent * (frameCount - 1)
   ```

3. **Text Overlay Visibility**:
   ```
   opacity = interpolate(scrollPercent, startPercent, endPercent)
   ```

### Easing Functions (lib/scroll.ts)

```ts
easeInOutCubic(t)  // Smooth acceleration/deceleration
easeOutExpo(t)     // Quick fade out
```

## Performance Optimization

### Image Preloading Strategy
```tsx
useEffect(() => {
  const images = Array(frameCount).fill(null);
  // Load all images in parallel
  Promise.all(preloadPromises).then(() => setIsLoaded(true));
}, [frameCount])
```

### Canvas Rendering Optimization
```tsx
// High DPI scaling for retina displays
ctx.scale(dpr, dpr);

// Single clear operation
ctx.fillStyle = '#050505';
ctx.fillRect(0, 0, width, height);

// Draw image with calculated dimensions
ctx.drawImage(image, x, y, drawWidth, drawHeight);
```

### GPU Acceleration
- Transform and opacity animations use CSS transforms
- Canvas rendering offloaded to GPU
- No layout recalculations during scroll

## Customization Guide

### Change Section Copy
Edit `app/page.tsx`:
```tsx
<ScrollText startPercent={0} endPercent={15} side="center">
  <h1>Your Custom Headline</h1>
  <p>Your custom body text</p>
</ScrollText>
```

### Adjust Scroll Triggers
Modify `startPercent` and `endPercent` values:
```tsx
// Show from 20% to 50% scroll
<ScrollText startPercent={20} endPercent={50} side="left">
  {children}
</ScrollText>
```

### Change Frame Count
1. Update `frameCount` in `app/page.tsx`
2. Ensure frames follow naming: `frame_000.png` through `frame_XXX.png`
3. Update image dimensions if needed

### Modify Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  'sony-blue': '#0050FF',    // Change blue
  'sony-cyan': '#00D6FF',    // Change cyan
  'sony-dark': '#050505',    // Change background
}
```

## Troubleshooting

### Frames Not Loading
1. Check browser console for 404 errors
2. Verify frame filenames: `frame_000.png`, `frame_001.png`, etc.
3. Confirm frames exist in `public/frames/`
4. Check image CORS settings if loading from CDN

### Scroll Animation Janky
1. Check DevTools Performance tab
2. Reduce frame preloading threshold if needed
3. Disable unused Framer Motion features
4. Profile canvas rendering with DevTools

### Text Overlays Not Appearing
1. Verify scroll document height > viewport height
2. Check `startPercent` and `endPercent` values
3. Confirm `.pointer-events-none` isn't blocking interaction
4. Inspect element opacity in DevTools

### Canvas Background Mismatch
1. Ensure image sequence background is `#050505`
2. Verify `canvas.style.backgroundColor` is set
3. Check for CSS background overrides
4. Use eyedropper tool to match exact hex value

## Build & Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables (if needed)
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Vercel Deployment
```bash
vercel --prod
```

### Docker Build
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Browser DevTools Tips

### Inspect Canvas Rendering
```js
// In console
const canvas = document.querySelector('canvas');
console.log(canvas.width, canvas.height);  // Check dimensions
console.log(canvas.getContext('2d'));      // Verify context
```

### Monitor Scroll Performance
```js
// Measure scroll handler performance
performance.mark('scroll-start');
// ... scroll action
performance.mark('scroll-end');
performance.measure('scroll', 'scroll-start', 'scroll-end');
console.log(performance.getEntriesByName('scroll')[0].duration);
```

### Verify Frame Preloading
```js
// Check if images are preloaded
Array.from(document.querySelectorAll('img')).map(img => ({
  src: img.src,
  complete: img.complete
}));
```

## References

- **Next.js 14 Docs**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Scroll Events**: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
