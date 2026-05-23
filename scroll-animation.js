/* ============================================================================
   Scroll-Driven Frame Animation - JavaScript
   ============================================================================ */

class ScrollFrameAnimation {
    constructor(config = {}) {
        // Configuration
        this.config = {
            frameFolder: config.frameFolder || '/frames',
            frameCount: config.frameCount || 128,
            framePattern: config.framePattern || 'frame_XXX.png', // XXX = 000-127
            canvasId: config.canvasId || 'frameCanvas',
            scrollContainerId: config.scrollContainerId || 'animation-section',
            loadingScreenId: config.loadingScreenId || 'loadingScreen',
            ...config
        };

        // Canvas setup
        this.canvas = document.getElementById(this.config.canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        // Frame storage
        this.frames = [];
        this.currentFrameIndex = 0;
        this.frameImages = [];
        
        // State
        this.isLoaded = false;
        this.isAnimating = false;
        this.scrollProgress = 0;
        
        // Performance
        this.animationFrameId = null;
        this.lastFrameIndex = -1;
        
        // Event listeners
        this.onScroll = this.handleScroll.bind(this);
        this.onResize = this.handleResize.bind(this);
        
        this.init();
    }

    /**
     * Initialize the animation system
     */
    async init() {
        console.log('Initializing scroll frame animation...');
        
        try {
            // Setup canvas
            this.resizeCanvas();
            window.addEventListener('resize', this.onResize);
            
            // Preload all frames
            await this.preloadFrames();
            
            // Show canvas and hide loading screen
            this.showAnimation();
            
            // Start animation loop
            this.startAnimationLoop();
            
            // Setup scroll handler
            window.addEventListener('scroll', this.onScroll, { passive: true });
            
            console.log('✓ Animation system ready');
        } catch (error) {
            console.error('✗ Animation initialization failed:', error);
            this.showError(error.message);
        }
    }

    /**
     * Preload all PNG frames
     */
    async preloadFrames() {
        console.log(`Preloading ${this.config.frameCount} frames...`);
        
        return new Promise((resolve, reject) => {
            let loadedCount = 0;
            this.frameImages = new Array(this.config.frameCount);
            
            const updateProgress = () => {
                loadedCount++;
                const progress = Math.round((loadedCount / this.config.frameCount) * 100);
                this.updateLoadingProgress(progress);
                
                if (loadedCount === this.config.frameCount) {
                    console.log('✓ All frames preloaded');
                    resolve();
                }
            };

            for (let i = 0; i < this.config.frameCount; i++) {
                const img = new Image();
                const paddedIndex = String(i).padStart(3, '0');
                const framePath = `${this.config.frameFolder}/frame_${paddedIndex}.png`;
                
                img.onload = () => {
                    this.frameImages[i] = img;
                    updateProgress();
                };
                
                img.onerror = () => {
                    console.warn(`⚠ Failed to load frame ${i}: ${framePath}`);
                    this.frameImages[i] = null;
                    updateProgress();
                };
                
                img.src = framePath;
            }

            // Timeout failsafe (in case some images fail)
            setTimeout(() => {
                if (loadedCount === this.config.frameCount) {
                    resolve();
                }
            }, 30000);
        });
    }

    /**
     * Update loading progress bar
     */
    updateLoadingProgress(percent) {
        const progressFill = document.getElementById('progressFill');
        const loadingPercent = document.getElementById('loadingPercent');
        
        if (progressFill) {
            progressFill.style.width = percent + '%';
        }
        if (loadingPercent) {
            loadingPercent.textContent = percent;
        }
    }

    /**
     * Show animation and hide loading screen
     */
    showAnimation() {
        this.isLoaded = true;
        const loadingScreen = document.getElementById(this.config.loadingScreenId);
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.textContent = `Error: ${message}`;
            loadingText.style.color = '#ff0000';
        }
    }

    /**
     * Resize canvas to match viewport while maintaining aspect ratio
     */
    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set canvas size with DPR scaling
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        // Scale context to account for DPR
        this.ctx.scale(dpr, dpr);
        
        // Set display size (CSS)
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    /**
     * Handle window resize
     */
    handleResize() {
        this.resizeCanvas();
        // Redraw current frame
        if (this.isLoaded) {
            this.drawFrame(this.currentFrameIndex);
        }
    }

    /**
     * Calculate scroll progress (0-1)
     */
    calculateScrollProgress() {
        const scrollTop = window.scrollY;
        const animationSection = document.getElementById('animation-section');
        
        if (!animationSection) return 0;
        
        const sectionTop = animationSection.offsetTop;
        const sectionHeight = animationSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // When section top is at bottom of viewport, progress = 0
        // When section bottom is at top of viewport, progress = 1
        const scrollProgress = (scrollTop - sectionTop + windowHeight) / (windowHeight + sectionHeight);
        
        return Math.max(0, Math.min(1, scrollProgress));
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        if (!this.isLoaded) return;
        
        this.scrollProgress = this.calculateScrollProgress();
        
        // Map scroll progress to frame index
        const newFrameIndex = Math.floor(this.scrollProgress * (this.config.frameCount - 1));
        
        if (newFrameIndex !== this.lastFrameIndex) {
            this.currentFrameIndex = newFrameIndex;
            this.lastFrameIndex = newFrameIndex;
            
            // Update UI
            this.updateUI();
        }
        
        // Show navbar after scrolling
        this.updateNavbar();
    }

    /**
     * Start animation loop with requestAnimationFrame
     */
    startAnimationLoop() {
        const animate = () => {
            this.drawFrame(this.currentFrameIndex);
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * Draw a frame on the canvas
     */
    drawFrame(frameIndex) {
        if (!this.isLoaded || frameIndex >= this.frameImages.length) return;
        
        const image = this.frameImages[frameIndex];
        if (!image) return;

        const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);
        
        // Clear canvas with background color
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Calculate aspect ratios
        const imgAspect = image.width / image.height;
        const canvasAspect = canvasWidth / canvasHeight;
        
        let drawWidth, drawHeight, x, y;
        
        if (imgAspect > canvasAspect) {
            // Image is wider
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgAspect;
            x = (canvasWidth - drawWidth) / 2;
            y = 0;
        } else {
            // Image is taller
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgAspect;
            x = 0;
            y = (canvasHeight - drawHeight) / 2;
        }
        
        // Draw image
        this.ctx.drawImage(image, x, y, drawWidth, drawHeight);
    }

    /**
     * Update UI elements
     */
    updateUI() {
        // Update frame counter
        const currentFrameEl = document.getElementById('currentFrame');
        if (currentFrameEl) {
            currentFrameEl.textContent = this.currentFrameIndex + 1;
        }
        
        // Update scroll percentage
        const scrollPercentEl = document.getElementById('scrollPercent');
        if (scrollPercentEl) {
            scrollPercentEl.textContent = Math.round(this.scrollProgress * 100);
        }
        
        // Update scroll progress bar in navbar
        const scrollProgressBar = document.getElementById('scrollProgress');
        if (scrollProgressBar) {
            scrollProgressBar.style.width = (this.scrollProgress * 100) + '%';
        }
        
        // Update total frames
        const totalFramesEl = document.getElementById('totalFrames');
        if (totalFramesEl) {
            totalFramesEl.textContent = this.config.frameCount;
        }
    }

    /**
     * Update navbar visibility
     */
    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }

    /**
     * Get current frame index
     */
    getCurrentFrameIndex() {
        return this.currentFrameIndex;
    }

    /**
     * Get scroll progress (0-1)
     */
    getScrollProgress() {
        return this.scrollProgress;
    }

    /**
     * Cleanup
     */
    destroy() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

/* ============================================================================
   Initialize Animation on Page Load
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Create animation instance with configuration
    window.scrollAnimation = new ScrollFrameAnimation({
        frameFolder: '/frames',
        frameCount: 128,
        framePattern: 'frame_XXX.png',
        canvasId: 'frameCanvas',
        scrollContainerId: 'animation-section',
        loadingScreenId: 'loadingScreen'
    });

    // Log performance info
    console.log('📊 Animation Performance:');
    console.log('- Frame preloading: Parallel');
    console.log('- Rendering: Canvas API (GPU-accelerated)');
    console.log('- Animation loop: requestAnimationFrame');
    console.log('- Scroll handling: Optimized passive listener');
    console.log('- DPR scaling: Enabled for retina displays');
});

/* ============================================================================
   Cleanup on Page Unload
   ============================================================================ */

window.addEventListener('beforeunload', () => {
    if (window.scrollAnimation) {
        window.scrollAnimation.destroy();
    }
});

/* ============================================================================
   Keyboard Shortcuts (Optional)
   ============================================================================ */

document.addEventListener('keydown', (e) => {
    if (!window.scrollAnimation || !window.scrollAnimation.isLoaded) return;
    
    const frameCount = window.scrollAnimation.config.frameCount;
    const currentIndex = window.scrollAnimation.getCurrentFrameIndex();
    
    if (e.key === 'ArrowRight' && currentIndex < frameCount - 1) {
        // Jump to next frame
        const scrollProgress = (currentIndex + 1) / frameCount;
        const section = document.getElementById('animation-section');
        const targetScroll = (section.offsetTop - window.innerHeight) + (scrollProgress * (section.offsetHeight + window.innerHeight));
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        // Jump to previous frame
        const scrollProgress = Math.max(0, (currentIndex - 1) / frameCount);
        const section = document.getElementById('animation-section');
        const targetScroll = (section.offsetTop - window.innerHeight) + (scrollProgress * (section.offsetHeight + window.innerHeight));
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
});
