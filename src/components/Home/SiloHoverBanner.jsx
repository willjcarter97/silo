// SiloHoverBanner.jsx
import { useRef, useState, useEffect } from 'react';
import { useSiloHoverPixi } from '../../hooks/useSiloHoverPixi';

export const SiloHoverBanner = ({ 
  svgSrc = 'https://silosite.cdn.prismic.io/silosite/aVUgoXNYClf9otsY_v1762717235_hero_hyl0xu.svg', 
  intensity = 40, 
  className = '' 
}) => {
  const hostRef = useRef(null);
  
  // Use state for client-side detection to avoid hydration mismatches
  // and ensure proper detection after the component mounts
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Mark that we're now on the client
    setIsClient(true);
    // Check viewport width after mount when window is definitely available
    setIsMobile(window.innerWidth < 768);
    
    // Handle resize events for responsive behavior
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const height = isMobile ? 340 : 498;
  const computedIsMobile = !isClient || isMobile;

  // Only initialize Pixi once we're on the client and know the mobile state
  // Pass isMobile as true before client detection to prevent premature Pixi init
  useSiloHoverPixi({ 
    hostRef, 
    svgSrc, 
    height, 
    intensity, 
    isMobile: computedIsMobile 
  });

  // Before client detection, show static image to prevent layout shift
  // After detection, show appropriate content based on device
  return (
    <section
      className={`relative w-full overflow-visible ${className}`}
      style={{ userSelect: 'none' }}
    >
      <div className='w-full px-4 md:px-8 lg:px-12 overflow-visible'>
        <div className='flex items-center justify-center mt-6 md:mt-8 lg:mt-10 w-full mx-auto overflow-visible'>
          {!isClient ? (
            // Show static image during SSR/initial render to prevent layout shift
            <div className='flex justify-center items-center w-full h-full overflow-visible'>
              <img 
                src={svgSrc} 
                alt='Silo logo' 
                className='w-full h-auto object-contain' 
                loading="eager"
                draggable="false"
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          ) : !isMobile ? (
            <div 
              ref={hostRef} 
              className='relative w-full flex items-center justify-center overflow-visible'
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            />
          ) : (
            <div className='flex justify-center items-center w-full h-full overflow-visible'>
              <img 
                src={svgSrc} 
                alt='Silo logo' 
                className='w-full h-auto object-contain' 
                loading="eager"
                draggable="false"
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
