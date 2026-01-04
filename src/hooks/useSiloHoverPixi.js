import { useEffect, useRef } from 'react';
import { Application, Assets, Sprite, Texture, Filter, GlProgram } from 'pixi.js';
import vertex from '../shaders/siloHover.vertex';
import fragment from '../shaders/SiloDisplacement.fragment';

export const useSiloHoverPixi = ({ hostRef, svgSrc, height, intensity, isMobile }) => {
  // Use refs to persist across StrictMode double-mounting
  const appRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const isInitializingRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Don't initialize on mobile - we show static image instead
    if (isMobile) return;

    const el = hostRef.current;
    if (!el) return;

    // Prevent double initialization from StrictMode
    if (isInitializingRef.current) {
      console.log('[Pixi] Already initializing, skipping...');
      return;
    }

    // If app already exists and is valid, skip re-initialization
    if (appRef.current && appRef.current.renderer) {
      console.log('[Pixi] App already exists, skipping...');
      return;
    }

    mountedRef.current = true;
    isInitializingRef.current = true;

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
        const app = new Application();
        await app.init({
          antialias: true,
          backgroundAlpha: 0,
          powerPreference: 'high-performance',
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          resizeTo: el,
        });

        // Check if we were unmounted during async initialization
        if (!mountedRef.current) {
          console.log('[Pixi] Component unmounted during init, destroying...');
          app.destroy(true);
          isInitializingRef.current = false;
          return;
        }

        // Store app reference
        appRef.current = app;

        el.innerHTML = '';
        // Prevent canvas from being dragged
        app.canvas.style.userSelect = 'none';
        app.canvas.style.webkitUserSelect = 'none';
        app.canvas.draggable = false;
        el.appendChild(app.canvas);

        // Clear cached asset to prevent stale texture issues from previous renders
        if (Assets.cache.has(svgSrc)) {
          Assets.cache.remove(svgSrc);
        }

        try {
          logoTex = await Assets.load(svgSrc);
          console.log('[Pixi] Texture loaded', svgSrc);

          // Check again if unmounted during texture load
          if (!mountedRef.current) {
            console.log('[Pixi] Component unmounted during texture load, destroying...');
            app.destroy(true);
            appRef.current = null;
            isInitializingRef.current = false;
            return;
          }

          // Add padding to prevent clipping when liquid effect expands
          const padX = logoTex.width * 0.12;
          const padY = logoTex.height * 0.12;
          const base = document.createElement('canvas');
          base.width = logoTex.width + (padX * 2);
          base.height = logoTex.height + (padY * 2);
          const ctx = base.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, base.width, base.height);
            ctx.drawImage(logoTex.source.resource, padX, padY, logoTex.width, logoTex.height);
          }
          logoTex = Texture.from(base);
        } catch (texError) {
          console.warn('[Pixi] Texture fallback to <img>', texError);
          el.innerHTML = `<img src="${svgSrc}" alt="logo" style="max-width:100%;height:auto;display:block;user-select:none;-webkit-user-select:none;pointer-events:none;" draggable="false" />`;
          isInitializingRef.current = false;
          return;
        }

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
          if (!app || !logoSprite || !logoTex || !mountedRef.current) return;

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
          if (!logoSprite || !rippleFilter || !mountedRef.current) return;

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
        console.error('[Pixi] Initialization error:', err);
        isInitializingRef.current = false;
      }
    })();

    return () => {
      console.log('[Pixi] Cleanup running...');
      mountedRef.current = false;
      
      // Disconnect ResizeObserver immediately
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      
      // Destroy Pixi app immediately (no setTimeout)
      if (appRef.current) {
        try {
          appRef.current.destroy(true);
          console.log('[Pixi] App destroyed');
        } catch (err) {
          console.warn('[Pixi cleanup warning]', err);
        }
        appRef.current = null;
      }
      
      isInitializingRef.current = false;
    };
  }, [hostRef, svgSrc, height, intensity, isMobile]);
};
