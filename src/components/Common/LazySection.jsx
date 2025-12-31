import { useInView } from 'react-intersection-observer';

/**
 * LazySection - Delays rendering of section content until in viewport
 * 
 * Use this for heavy sections that should only load when the user scrolls to them.
 * For animated reveals, use LazyElement or LazyText instead.
 * 
 * Features:
 * - Defers rendering until in viewport (improves initial page load)
 * - Optional fade-in animation
 * - Configurable threshold and margin
 */
const LazySection = ({ 
  children, 
  className = '', 
  threshold = 0.1, 
  rootMargin = '100px',
  animate = true,
  duration = 500,
  placeholder = null,
  style = {},
  ...props
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  });

  const animatedStyle = animate ? {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    ...style
  } : style;

  return (
    <div 
      ref={ref} 
      className={className}
      style={animatedStyle}
      {...props}
    >
      {inView ? children : placeholder}
    </div>
  );
};

export default LazySection;
