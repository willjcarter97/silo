import React, { useRef, useEffect } from 'react'

const REPEATS = 20

export default function TextLoop({ text, speed = 50, direction = 'left', className = '', gap = '2rem', separator = null }) {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)

  // Split text by commas and clean up
  const textItems = text.split(',').map(item => item.trim()).filter(item => item.length > 0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Width of one copy of the text. The track holds REPEATS copies, so wrapping the offset within one
    // copy loops seamlessly in either direction. Re-measured whenever the track resizes (fonts loading,
    // lazy sections appearing, window resizes); measuring once on mount could give 0 and leave the row
    // drifting off-screen, which is how the right-moving row used to disappear.
    let loopWidth = 0
    const measure = () => { loopWidth = track.scrollWidth / REPEATS }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)

    const animate = () => {
      if (loopWidth > 0) {
        const step = speed / 60
        offsetRef.current += direction === 'left' ? step : -step
        offsetRef.current = ((offsetRef.current % loopWidth) + loopWidth) % loopWidth
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [speed, direction])

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="inline-flex will-change-transform items-center">
        {Array.from({ length: REPEATS }).map((_, repeatIndex) => (
          textItems.map((item, itemIndex) => (
            <React.Fragment key={`${repeatIndex}-${itemIndex}`}>
              <span className={className}>
                {item}
              </span>
              {separator && (
                <span 
                  className="mx-4 flex items-center justify-center"
                  style={{ color: 'inherit' }}
                >
                  {separator}
                </span>
              )}
            </React.Fragment>
          ))
        )).flat()}
      </div>
    </div>
  )
}
