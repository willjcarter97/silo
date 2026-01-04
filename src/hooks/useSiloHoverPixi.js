import { useEffect, useRef } from 'react';
import { Application, Sprite, Texture, Filter, GlProgram } from 'pixi.js';
import vertex from '../shaders/siloHover.vertex';
import fragment from '../shaders/SiloDisplacement.fragment';

export const useSiloHoverPixi = ({ hostRef, svgSrc, height, intensity, isMobile }) => {
  // Use refs only for persistent resources that need cleanup
  const appRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    // Don't initialize on mobile - we show static image instead
    if (isMobile) return;

    const el = hostRef.current;
    if (!el) return;

    // Use a local cancelled flag for this specific effect instance
    // This avoids race conditions with StrictMode double-mounting
    let cancelled = false;
    
    // Clean up any existing app before initializing a new one
    if (appRef.current) {
      try {
        appRef.current.destroy(true);
      } catch (err) {
        console.warn('[Pixi] Cleanup of existing app:', err);
      }
      appRef.current = null;
    }
    
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }

    let logoSprite = null;
    let logoTex = null;
    let rippleFilter = null;
    let time = 0;
    let targetStrength = 0;
    let strength = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let prevX = 0;
    let prevY = 0;
    let smoothVelX = 0;
    let smoothVelY = 0;
    let frozen = false;

    const relaxPos = { x: 0, y: 0 };
    const EDGE_FEATHER = 0.08;
    const DAMPING = 0.12;
    const DECAY = 0.9;
    const STOP_THRESHOLD = 0.01;

    (async () => {
      try {
        // Check if cancelled before starting
        if (cancelled) return;
        
        // Prevent concurrent initializations
        if (isInitializingRef.current) return;
        isInitializingRef.current = true;

        const app = new Application();
        await app.init({
          antialias: true,
          backgroundAlpha: 0,
          powerPreference: 'high-performance',
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          resizeTo: el,
        });

        // Check if cancelled after async init
        if (cancelled) {
          console.log('[Pixi] Component unmounted during init, destroying...');
          app.destroy(true);
          return;
        }

        // Store app reference for cleanup
        appRef.current = app;

        el.innerHTML = '';
        // Prevent canvas from being dragged
        app.canvas.style.userSelect = 'none';
        app.canvas.style.webkitUserSelect = 'none';
        app.canvas.draggable = false;
        el.appendChild(app.canvas);

        // Helper function to load image using standard Image object (decoupled from Pixi lifecycle)
        // Uses cache-busting to force fresh load on SPA navigation
        const loadImageDirectly = (url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            // Add cache-busting parameter to force fresh load on SPA navigation
            const cacheBustUrl = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
            img.src = cacheBustUrl;
          });
        };

        try {
          const img = await loadImageDirectly(svgSrc);
          
          if (cancelled) return;
          
          // Create texture from the loaded image
          logoTex = Texture.from(img);
          console.log('[Pixi] Texture loaded', svgSrc);

          // Add padding to prevent clipping when liquid effect expands
          const padX = img.width * 0.12;
          const padY = img.height * 0.12;
          const base = document.createElement('canvas');
          base.width = img.width + (padX * 2);
          base.height = img.height + (padY * 2);
          const ctx = base.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, base.width, base.height);
            ctx.drawImage(img, padX, padY, img.width, img.height);
          }
          logoTex = Texture.from(base);
        } catch (texError) {
          console.warn('[Pixi] Texture fallback to <img>', texError);
          isInitializingRef.current = false;
          if (!cancelled) {
            el.innerHTML = `<img src="${svgSrc}" alt="logo" style="max-width:100%;height:auto;display:block;user-select:none;-webkit-user-select:none;pointer-events:none;" draggable="false" />`;
          }
          return;
        }

        // Final check before setting up the scene
        if (cancelled) return;

        logoSprite = new Sprite(logoTex);
        logoSprite.anchor.set(0.5);
        app.stage.addChild(logoSprite);

        const glProgram = new GlProgram({ vertex, fragment });
        const baseRadiusPix = 190.0;
        const baseIntensity = (intensity / 40) * 5.4;

        const resources = {
          ripple: {
            uMousePix: { value: { x: 0, y: 0 }, type: 'vec2<f32>' },
            uAspect: { value: { x: 1.0, y: 1.0 }, type: 'vec2<f32>' },
            uRadiusPix: { value: baseRadiusPix, type: 'f32' },
            uIntensity: { value: 0.0, type: 'f32' },
            uVelocity: { value: { x: 0.0, y: 0.0 }, type: 'vec2<f32>' },
            uTime: { value: 0.0, type: 'f32' },
          },
        };

        rippleFilter = new Filter({ glProgram, resources });
        logoSprite.filters = [rippleFilter];

        const rippleUniforms = rippleFilter.resources.ripple.uniforms;

        const layout = () => {
          if (!app || !logoSprite || !logoTex || cancelled) return;

          const w = el.clientWidth;
          if (w === 0) return; // Skip if element has no width yet
          
          const scaleFactor = 1.25;
          const horizontalPadding = w * 0.05;
          const canvasWidth = w + (horizontalPadding * 2);
          const canvasHeight = isMobile ? height : (logoTex.height / logoTex.width) * w * scaleFactor;

          app.renderer.resize(canvasWidth, canvasHeight);
          logoSprite.x = canvasWidth / 2;
          logoSprite.y = canvasHeight / 2;
          logoSprite.width = w * scaleFactor;
          logoSprite.height = (logoTex.height / logoTex.width) * w * scaleFactor;

          rippleUniforms.uAspect.x = logoSprite.width;
          rippleUniforms.uAspect.y = logoSprite.height;

          const centerX = logoSprite.width / 2;
          const centerY = logoSprite.height / 2;
          prevX = centerX;
          prevY = centerY;
          smoothX = centerX;
          smoothY = centerY;
          mouseX = centerX;
          mouseY = centerY;
          relaxPos.x = centerX;
          relaxPos.y = centerY;
        };

        layout();
        
        // Store ResizeObserver reference for cleanup
        resizeObserverRef.current = new ResizeObserver(layout);
        resizeObserverRef.current.observe(el);

        logoSprite.eventMode = 'static';
        logoSprite.on('pointerenter', (e) => {
          targetStrength = 1;
          frozen = false;
          if (!logoSprite) return;
          const pos = e.getLocalPosition(logoSprite);
          mouseX = pos.x + logoSprite.width / 2;
          mouseY = pos.y + logoSprite.height / 2;
          smoothX = mouseX;
          smoothY = mouseY;
          prevX = mouseX;
          prevY = mouseY;
        });

        logoSprite.on('pointerleave', () => {
          frozen = true;
          targetStrength = 0;
        });

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage.on('pointermove', (e) => {
          if (!logoSprite) return;
          frozen = false;
          targetStrength = 1;
          const pos = e.getLocalPosition(logoSprite);
          mouseX = pos.x + logoSprite.width / 2;
          mouseY = pos.y + logoSprite.height / 2;
        });

        app.ticker.add((ticker) => {
          if (!logoSprite || !rippleFilter || cancelled) return;

          time += 0.016 * ticker.deltaTime;
          rippleUniforms.uTime = time;

          strength += (targetStrength - strength) * 0.1;
          smoothX += (mouseX - smoothX) * 0.08;
          smoothY += (mouseY - smoothY) * 0.08;

          const dt = Math.max(1, ticker.deltaTime);
          const fpsNorm = 60 / dt;
          const w = logoSprite.width;
          const h = logoSprite.height;

          const instVelX = ((mouseX - prevX) / Math.max(1, w)) * fpsNorm * 0.8;
          const instVelY = ((mouseY - prevY) / Math.max(1, h)) * fpsNorm * 0.8;
          prevX = mouseX;
          prevY = mouseY;

          smoothVelX += (instVelX - smoothVelX) * DAMPING;
          smoothVelY += (instVelY - smoothVelY) * DAMPING;

          const speed = Math.abs(smoothVelX) + Math.abs(smoothVelY);
          if (speed < STOP_THRESHOLD) {
            smoothVelX *= DECAY;
            smoothVelY *= DECAY;
          }

          if (frozen) {
            const relaxSpeed = 0.005;
            const decay = 0.92;
            smoothX += (relaxPos.x - smoothX) * relaxSpeed;
            smoothY += (relaxPos.y - smoothY) * relaxSpeed;
            strength *= 0.96;
            smoothVelX *= decay;
            smoothVelY *= decay;
          }

          rippleUniforms.uVelocity.x = smoothVelX;
          rippleUniforms.uVelocity.y = smoothVelY;
          rippleUniforms.uMousePix.x = smoothX;
          rippleUniforms.uMousePix.y = smoothY;

          const uRaw = smoothX / w;
          const vRaw = smoothY / h;
          const edgeDist = Math.min(uRaw, vRaw, 1 - uRaw, 1 - vRaw);
          const edgeFactor = Math.max(0, Math.min(1, edgeDist / EDGE_FEATHER));
          const fade = 1.0 - Math.min(1.0, (1.0 - DECAY) * 20.0 * (STOP_THRESHOLD / (speed + STOP_THRESHOLD)));

          rippleUniforms.uRadiusPix = baseRadiusPix;
          rippleUniforms.uIntensity = baseIntensity * edgeFactor * fade * strength;
        });

        isInitializingRef.current = false;
        console.log('[Pixi] Initialization complete');
      } catch (err) {
        isInitializingRef.current = false;
        console.error('[Pixi] Initialization error:', err);
      }
    })();

    return () => {
      console.log('[Pixi] Cleanup running...');
      // Set cancelled flag to stop any in-flight async operations
      cancelled = true;
      // Reset initializing flag so next mount can initialize
      isInitializingRef.current = false;
      
      // Disconnect ResizeObserver immediately
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      
      // Destroy Pixi app immediately
      if (appRef.current) {
        try {
          appRef.current.destroy(true);
          console.log('[Pixi] App destroyed');
        } catch (err) {
          console.warn('[Pixi cleanup warning]', err);
        }
        appRef.current = null;
      }
    };
  }, [hostRef, svgSrc, height, intensity, isMobile]);
};
