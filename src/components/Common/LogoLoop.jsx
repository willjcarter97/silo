import React, { memo, useCallback, useMemo } from 'react'
import useLogoLoopMovement from '../../hooks/useLogoLoopMovement'

const toCssLength = value => (typeof value === 'number' ? `${value}px` : value ?? undefined)
const cx = (...parts) => parts.filter(Boolean).join(' ')

const LogoLoopComponent = ({
  logos,
  speed = 120,
  direction = 'right',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  // how many viewports the concatenated strip should cover before repeating
  stripCoverage = 2,
  // if true, rotate the logos per copy to avoid exact repetition pattern
  shuffleCopies = false,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = 'Partner logos',
  className,
  style
}) => {
  const {
    containerRef,
    trackRef,
    seqRef,
    seqWidth,
    copyCount,
    handleMouseEnter,
    handleMouseLeave,
    cssVariables
  } = useLogoLoopMovement({ logos, gap, logoHeight, speed, direction, pauseOnHover, stripCoverage })

  const renderLogoItem = useCallback(
    (item, key) => {
      const isNodeItem = 'node' in item

      const content = isNodeItem ? (
        <span
          className={cx(
            'inline-flex items-center',
            'motion-reduce:transition-none',
            scaleOnHover && 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
          )}
          aria-hidden={!!item.href && !item.ariaLabel}
        >
          {item.node}
        </span>
      ) : (
        <img
          className={cx(
            'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
            '[-webkit-user-drag:none] pointer-events-none',
            '[image-rendering:-webkit-optimize-contrast]',
            'motion-reduce:transition-none',
            scaleOnHover &&
              'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
          )}
          style={item.style}
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ''}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      )

      const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title)

      const inner = item.href ? (
        <a
          className={cx(
            'inline-flex items-center no-underline rounded',
            'transition-opacity duration-200 ease-linear',
            'hover:opacity-80',
            'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
          )}
          href={item.href}
          aria-label={itemAriaLabel || 'logo link'}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      )

      return (
        <li
          className={cx(
            'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
            scaleOnHover && 'overflow-visible group/item'
          )}
          key={key}
          role="listitem"
        >
          {inner}
        </li>
      )
    },
    [scaleOnHover]
  )

  const logoLists = useMemo(() => {
    return Array.from({ length: copyCount }, (_, copyIndex) => {
      // optionally rotate logos per copy to avoid exact repeating pattern
      const items =
        shuffleCopies && logos.length > 1
          ? logos.map((_, i) => logos[(i + copyIndex) % logos.length])
          : logos

      return (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {items.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )
    })
  }, [copyCount, logos, renderLogoItem, shuffleCopies])

  const rootClasses = useMemo(
    () =>
      cx(
        'relative overflow-x-hidden group',
        scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
        className
      ),
    [scaleOnHover, className]
  )

  const containerStyle = useMemo(
    () => ({
      width: toCssLength(width) ?? '100%',
      ...cssVariables,
      ...style
    }),
    [width, cssVariables, style]
  )

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className={cx(
              'pointer-events-none absolute inset-y-0 left-0 z-[1]',
              'w-[clamp(24px,8%,120px)]',
              'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
            )}
          />
          <div
            aria-hidden
            className={cx(
              'pointer-events-none absolute inset-y-0 right-0 z-[1]',
              'w-[clamp(24px,8%,120px)]',
              'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
            )}
          />
        </>
      )}

      <div
        className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}
        ref={trackRef}
      >
        {logoLists}
      </div>
    </div>
  )
}

const LogoLoop = memo(LogoLoopComponent)
LogoLoop.displayName = 'LogoLoop'

export default LogoLoop
