// SiloHoverBanner.jsx
import { useRef, useState, useEffect } from 'react';
import { useSiloHoverPixi } from '../../hooks/useSiloHoverPixi';

export const SiloHoverBanner = ({ 
  svgSrc = 'https://silosite.cdn.prismic.io/silosite/aVUgoXNYClf9otsY_v1762717235_hero_hyl0xu.svg', 
  intensity = 40, 
  className = '' 
}) => {
  const hostRef = useRef(null);
  // Initialize as null to indicate "not yet determined"
  const [isMobile, setIsMobile] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const height = isMobile ? 340 : 498;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    // Mark as ready after initial mobile check
    setIsReady(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only run Pixi hook when we've determined mobile state
  useSiloHoverPixi({ 
    hostRef, 
    svgSrc, 
    height, 
    intensity, 
    isMobile: isMobile === null ? true : isMobile, // Treat unknown as mobile to prevent premature Pixi init
    isReady 
  });

  return (
    <section
      className={`relative w-full overflow-visible ${className}`}
      style={{ userSelect: 'none' }}
    >
      <div className='w-full px-4 md:px-8 lg:px-12 overflow-visible'>
        <div className='flex items-center justify-center mt-6 md:mt-8 lg:mt-10 w-full mx-auto overflow-visible'>
          {/* Desktop: Pixi canvas (hidden on mobile via CSS) */}
          <div 
            ref={hostRef} 
            className='relative w-full items-center justify-center overflow-visible hidden md:flex'
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          {/* Mobile: Static image (hidden on desktop via CSS) */}
          <div className='justify-center items-center w-full h-full overflow-visible flex md:hidden'>
            <img 
              src={svgSrc} 
              alt='Silo logo' 
              className='w-full h-auto object-contain' 
              loading="eager"
              draggable="false"
              style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
