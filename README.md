# Sony WH-1000XM6 Scrollytelling Landing Page

## Overview

An Awwwards-level, cinematic scrollytelling landing page for Sony WH-1000XM6 flagship noise-cancelling headphones. This premium web experience features a scroll-linked image sequence animation where the headphones disassemble into a floating technical diagram and then reassemble—synchronized with editorial copywriting and storytelling beats.

**Live Interaction**: As users scroll, a 128-frame high-resolution image sequence plays across a full-screen canvas, creating a seamless, immersive product reveal that feels like a cinematic hardware unboxing.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom utilities
- **Animation**: Framer Motion for scroll-linked transitions
- **Rendering**: HTML5 Canvas for optimized image-sequence playback
- **Image Format**: PNG sequence (128 frames, optimized for performance)

## Features

### Core Interaction
- **Sticky Canvas Playback**: Full-screen canvas pinned during scroll with scroll-linked frame index mapping
- **Image Sequence Control**: 128-frame animation synchronized to scroll position (0–100%)
- **Hardware Acceleration**: Optimized canvas rendering with DPR scaling for crisp visuals on high-density displays

### Visual Design
- **Apple-Level Aesthetics**: Ultra-minimal, cinematic, luxury tech aesthetic
- **Deep Black Theme**: `#050505` background perfectly matched to image sequence for seamless edge blending
- **Premium Color Palette**:
  - Primary accent: Sony blue `#0050FF`
  - Secondary accent: Electric cyan `#00D6FF`
  - Subtle gradients for depth without visual noise
- **Typography**: Inter / SF Pro Display with tight tracking, large scale, strong hierarchy
- **Glassmorphism Navbar**: Translucent, blurred navbar that fades in on scroll

### Storytelling Structure (Scroll-Driven)
1. **Hero (0–15%)**: Fully assembled WH-1000XM6 with cinematic rim lighting
2. **Engineering Reveal (15–40%)**: Components begin to separate, internal structure revealed
3. **Noise Cancelling (40–65%)**: Multi-microphone array and processing highlighted
4. **Sound & Upscaling (65–85%)**: Drivers, acoustic chambers emphasized with premium copy
5. **Reassembly & CTA (85–100%)**: Graceful reassembly, final hero pose, strong call-to-action

## Installation & Setup

### Prerequisites
- Node.js 18+ (includes npm)
- ImageMagick (for frame conversion; automatically installed if needed)

### Quick Start

```bash
# Clone the repository
cd sony-wh-1000xm6

# Install dependencies
npm install

# Convert GIF frames to PNG (if needed)
node convert-frames.js

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
sony-wh-1000xm6/
├── app/
│   ├── layout.tsx          # Root layout with font & metadata
│   ├── page.tsx            # Main scrollytelling page
│   └── globals.css         # Global styles & utilities
├── components/
│   ├── Navbar.tsx          # Apple-style fixed navigation
│   ├── CanvasImageSequence.tsx  # Canvas frame player
│   └── ScrollText.tsx       # Scroll-triggered text overlays
├── lib/
│   └── [utilities]         # Helper functions
├── public/
│   └── frames/             # PNG image sequence (128 frames)
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── convert-frames.js       # GIF → PNG batch converter
└── package.json
```

## Key Components

### `CanvasImageSequence.tsx`
- Preloads all 128 image frames
- Maps scroll position to frame index (0–127)
- Renders frames to canvas with DPR scaling
- Maintains seamless background color (#050505)

### `ScrollText.tsx`
- Scroll-triggered text overlays (left/center/right)
- Fade in/out based on scroll percentage ranges
- Smooth spring animations for elegant transitions
- Fixed positioning above canvas

### `Navbar.tsx`
- Ultra-minimal product navigation
- Glassmorphic background with backdrop blur
- Fades in after scroll (at 50px threshold)
- Contains: logo, center nav links, right CTA button

## Customization

### Update Copy & Sections
Edit [app/page.tsx](app/page.tsx) to modify:
- Headline text
- Body copy for each section
- Section scroll triggers (startPercent/endPercent in `<ScrollText>`)
- CTA button text and actions

### Adjust Colors
Edit [tailwind.config.ts](tailwind.config.ts):
```ts
colors: {
  'sony-dark': '#050505',
  'sony-darker': '#0A0A0C',
  'sony-blue': '#0050FF',
  'sony-cyan': '#00D6FF',
}
```

### Modify Frame Count
If you have a different number of frames:
1. Update `frameCount` in [app/page.tsx](app/page.tsx)
2. Ensure frames are named consistently: `frame_000.png`, `frame_001.png`, etc.

### Custom Image Sequence
Replace PNG frames in `public/frames/`:
1. Export your sequence as PNGs: `frame_000.png` → `frame_127.png`
2. Ensure background color matches `#050505` for seamless blending
3. Canvas will automatically scale and center frames

## Performance Optimization

- **Canvas Rendering**: Optimized with DPR scaling for retina displays
- **Image Preloading**: All frames preloaded on page mount for smooth playback
- **CSS Hardware Acceleration**: Transform/opacity animations use GPU
- **Lazy Text Overlays**: Only rendered when visible in viewport

## Browser Support

- Chrome/Edge: ✓ Full support
- Firefox: ✓ Full support
- Safari: ✓ Full support (iOS 15+)
- Mobile: Optimized for touch scrolling

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel
vercel
```

### Other Platforms

```bash
npm run build
npm start
```

Deploy the output to any Node.js hosting (Netlify, Heroku, AWS, etc.)

## Troubleshooting

### Frames Not Loading
- Verify PNG files exist in `public/frames/`
- Check browser console for image load errors
- Ensure filenames match the pattern: `frame_000.png`, `frame_001.png`, etc.

### Canvas Not Rendering
- Check if JavaScript is enabled
- Verify canvas element is visible (check DevTools Inspector)
- Confirm background color matches image sequence

### Frame Conversion Failed
```bash
# Reinstall ImageMagick
sudo apt-get install imagemagick

# Run conversion again
node convert-frames.js
```

## Credits & References

- **Design Inspiration**: Apple product pages, Sony official site
- **Animation Library**: Framer Motion v10
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS v3
- **Asset Generation**: ImageMagick for batch processing

## License

© 2026 Sony. All rights reserved.

---

**Need Help?** Check the component files for inline documentation and examples.
