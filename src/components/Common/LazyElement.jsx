import { useInView } from 'react-intersection-observer';

/**
 * LazyElement - A universal wrapper for lazy loading any content with animations
 * 
 * Features:
 * - Delays rendering until element is in viewport
 * - Multiple animation presets
 * - Configurable intersection observer options
 * - Lightweight and performant
 */
const LazyElement = ({ 
  children, 
  className = '',
  as: Component = 'div',
  animation = 'fadeUp', // 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'fade', 'scale', 'slideUp', 'none'
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = '50px',
  once = true,
  renderWhenHidden = false, // If true, content is rendered but hidden (useful for SEO)
  placeholder = null,
  style = {},
  ...props 
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
    rootMargin
  });

  // Animation configurations
  const animations = {
    fadeUp: {
      from: { opacity: 0, transform: 'translateY(40px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeDown: {
      from: { opacity: 0, transform: 'translateY(-40px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeLeft: {
      from: { opacity: 0, transform: 'translateX(40px)' },
      to: { opacity: 1, transform: 'translateX(0)' }
    },
    fadeRight: {
      from: { opacity: 0, transform: 'translateX(-40px)' },
      to: { opacity: 1, transform: 'translateX(0)' }
    },
    fade: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    scale: {
      from: { opacity: 0, transform: 'scale(0.85)' },
      to: { opacity: 1, transform: 'scale(1)' }
    },
    slideUp: {
      from: { transform: 'translateY(60px)' },
      to: { transform: 'translateY(0)' }
    },
    none: {
      from: {},
      to: {}
    }
  };

  const animConfig = animations[animation] || animations.fadeUp;
  const currentState = inView ? animConfig.to : animConfig.from;

  const combinedStyle = {
    ...currentState,
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transitionDelay: `${delay}ms`,
    willChange: inView ? 'auto' : 'opacity, transform',
    ...style
  };

  // If renderWhenHidden is false and not in view, don't render children
  if (!renderWhenHidden && !inView) {
    return (
      <Component 
        ref={ref} 
        className={className} 
        style={{ minHeight: placeholder ? undefined : '1px', ...style }}
        {...props}
      >
        {placeholder}
      </Component>
    );
  }

  return (
    <Component 
      ref={ref} 
      className={className} 
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

export default LazyElement;





