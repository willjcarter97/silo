import { useInView } from 'react-intersection-observer';

/**
 * LazyText - A component that animates text content when it enters the viewport
 * 
 * Features:
 * - Fade-in animation with optional translate effect
 * - Staggered children animation support
 * - Multiple animation directions (up, down, left, right, none)
 * - Configurable delay, duration, and easing
 * - Can be used as a wrapper for any content, not just text
 */
const LazyText = ({ 
  children, 
  className = '',
  as: Component = 'div',
  animation = 'fadeUp', // 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'fade', 'scale', 'blur'
  delay = 0,
  duration = 600,
  threshold = 0.2,
  rootMargin = '0px',
  stagger = false,
  staggerDelay = 100,
  once = true,
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
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeDown: {
      from: { opacity: 0, transform: 'translateY(-30px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeLeft: {
      from: { opacity: 0, transform: 'translateX(30px)' },
      to: { opacity: 1, transform: 'translateX(0)' }
    },
    fadeRight: {
      from: { opacity: 0, transform: 'translateX(-30px)' },
      to: { opacity: 1, transform: 'translateX(0)' }
    },
    fade: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    scale: {
      from: { opacity: 0, transform: 'scale(0.9)' },
      to: { opacity: 1, transform: 'scale(1)' }
    },
    blur: {
      from: { opacity: 0, filter: 'blur(10px)' },
      to: { opacity: 1, filter: 'blur(0px)' }
    }
  };

  const animConfig = animations[animation] || animations.fadeUp;
  const currentState = inView ? animConfig.to : animConfig.from;

  const combinedStyle = {
    ...currentState,
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform, filter',
    ...style
  };

  // If stagger is enabled and children are array-like, wrap each child
  if (stagger && Array.isArray(children)) {
    return (
      <Component ref={ref} className={className} {...props}>
        {children.map((child, index) => (
          <span
            key={index}
            style={{
              ...currentState,
              display: 'inline-block',
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: `${delay + (index * staggerDelay)}ms`,
              willChange: 'opacity, transform, filter',
            }}
          >
            {child}
          </span>
        ))}
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

export default LazyText;






