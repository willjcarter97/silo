// SiloHoverBanner.jsx
import { useRef } from 'react';
import { useSiloHoverPixi } from '../../hooks/useSiloHoverPixi';

export const SiloHoverBanner = ({ 
  svgSrc = 'https://res.cloudinary.com/di9tb45rl/image/upload/v1762717235/hero_hyl0xu.svg', 
  intensity = 40, 
  className = '' 
}) => {
  const hostRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const height = isMobile ? 340 : 498;

  useSiloHoverPixi({ hostRef, svgSrc, height, intensity, isMobile });

  return (
    <section
      className={`relative w-full overflow-visible ${className}`}
    >
      <div className='w-full px-4 md:px-8 lg:px-12 overflow-visible'>
        {/* ⭐ FIX: Removed md:min-h-[350px] and relying on child height now. ⭐ */}
        <div className='flex items-center justify-center mt-6 md:mt-8 lg:mt-10 w-full mx-auto overflow-visible'>
          {!isMobile ? (
            <div ref={hostRef} className='relative w-full flex items-center justify-center overflow-visible' />
          ) : (
            <div className='flex justify-center items-center w-full h-full overflow-visible'>
              <img src={svgSrc} alt='Silo logo' className='w-full h-auto object-contain' loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
