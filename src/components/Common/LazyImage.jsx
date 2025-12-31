import { useInView } from 'react-intersection-observer';
import { useState, useCallback } from 'react';

/**
 * LazyImage - A performant image component with lazy loading and fade-in animation
 * 
 * Features:
 * - Intersection Observer-based lazy loading
 * - Smooth fade-in animation when image loads
 * - Optional blur-up placeholder effect
 * - Skeleton loading state
 * - Configurable trigger threshold and root margin
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  containerClassName = '',
  containerStyle = {},
  threshold = 0.1,
  rootMargin = '100px',
  placeholderColor = 'transparent', // Changed to transparent to support PNGs
  showSkeleton = false, // Only show skeleton when explicitly enabled
  animationDuration = 500,
  blur = false,
  onLoad: onLoadProp,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  });

  const handleLoad = useCallback((e) => {
    setIsLoaded(true);
    onLoadProp?.(e);
  }, [onLoadProp]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${containerClassName}`} 
      style={{ 
        backgroundColor: placeholderColor,
        ...containerStyle 
      }}
    >
      {/* Skeleton pulse animation while loading - only when showSkeleton is true */}
      {showSkeleton && !isLoaded && inView && !hasError && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor === 'transparent' ? '#f3f4f6' : placeholderColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      
      {/* Actual image */}
      {inView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-all ${blur && !isLoaded ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            transitionProperty: 'opacity, filter, transform',
            transitionDuration: `${animationDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
