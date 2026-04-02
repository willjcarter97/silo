import React, { useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "../../data/servicesData.jsx";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Map servicesData to the format needed for this component (default fallback)
const defaultFeatureSections = servicesData.map((service) => ({
  icon: service.icon,
  title: service.title,
  description: service.desc,
}));

const Layout417 = ({ heading, featureSections, serviceCards }) => {
  // Use provided heading or default to "CORE SERVICES"
  const displayHeading = heading || "CORE SERVICES";
  // Use serviceCards from Prismic if provided, otherwise fallback to featureSections or defaults
  const sections = useMemo(() => {
    if (serviceCards && serviceCards.length > 0) {
      return serviceCards.map((card, index) => ({
        icon: card.icon ? (
          <img src={card.icon} alt={card.title || `Service ${index + 1}`} className="w-20 h-20 object-contain" />
        ) : defaultFeatureSections[index]?.icon,
        title: card.title || defaultFeatureSections[index]?.title,
        description: card.description || defaultFeatureSections[index]?.description,
      }));
    }
    return featureSections || defaultFeatureSections;
  }, [serviceCards, featureSections]);
  const containerRef = useRef(null);
  const scrollProgress = useMotionValue(0);

  // Use GSAP ScrollTrigger for reliable pinning and scroll tracking
  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop - full scroll experience
    mm.add("(min-width: 640px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
        },
      });
    });

    // Mobile - shorter, faster scroll
    mm.add("(max-width: 639px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center center",
        end: "+=350",
        pin: true,
        scrub: 0.2,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
        },
      });
    });

    return () => mm.revert();
  }, [scrollProgress]);

  // Split heading into two lines
  const headingParts = displayHeading.split(" ");
  const firstLine = headingParts[0] || "CORE";
  const secondLine = headingParts.slice(1).join(" ") || "SERVICES";

  return (
    <section 
      ref={containerRef} 
      className="relative sm:h-screen hidden sm:flex items-center justify-center bg-white overflow-visible"
    >
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Large heading behind cards - with liquid fill effect */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <LiquidFillHeading 
            firstLine={firstLine} 
            secondLine={secondLine} 
            scrollProgress={scrollProgress}
            totalSections={sections.length}
          />
        </div>
        
        {/* Card stack container */}
        <div className="relative flex min-h-[20rem] w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex-col items-center justify-center px-4">
          {sections.map((section, index) => (
            <FeatureSection
              key={index}
              section={section}
              index={index}
              totalSections={sections.length}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Liquid fill heading component using SVG
const LiquidFillHeading = ({ firstLine, secondLine, scrollProgress, totalSections }) => {
  // Fill starts when the last card begins animating
  const fillStart = (totalSections - 1) / totalSections;
  
  // Clamp the fill to 0 until we reach fillStart, then interpolate to 100
  const rawFillPercent = useTransform(
    scrollProgress,
    [0, fillStart, 1],
    [0, 0, 100]
  );
  
  // Spring for smoother, more liquid-like motion
  const fillPercent = useSpring(rawFillPercent, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  // Time for wave animation
  const time = useTransform(scrollProgress, [fillStart, 1], [0, 10]);

  // Create the wave path for the clip
  const wavePath = useTransform(
    [fillPercent, time],
    ([fill, t]) => {
      const fillNum = Math.max(0, Number(fill));
      const tNum = Number(t);
      const h = 400;
      const w = 1000;
      
      // Water level from bottom (0 = no fill, 400 = full)
      const waterHeight = (fillNum / 100) * h;
      const waterY = h - waterHeight;
      
      // If essentially no fill, put water line below visible area
      if (fillNum < 0.5) {
        return `M 0 ${h + 50} L ${w} ${h + 50} L ${w} ${h} L 0 ${h} Z`;
      }
      
      // Scale waves based on fill amount
      const waveScale = Math.min(1, fillNum / 20);
      
      // Generate wave path
      let path = `M 0 ${h} L 0 ${waterY}`;
      const steps = 50;
      
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const normalizedX = i / steps;
        
        const wave1 = Math.sin(normalizedX * Math.PI * 4 + tNum * 2) * 8 * waveScale;
        const wave2 = Math.sin(normalizedX * Math.PI * 7 + tNum * 3.5) * 4 * waveScale;
        const wave3 = Math.sin(normalizedX * Math.PI * 2 + tNum * 1.2) * 6 * waveScale;
        
        const y = waterY + wave1 + wave2 + wave3;
        path += ` L ${x} ${y}`;
      }
      
      path += ` L ${w} ${h} Z`;
      return path;
    }
  );

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <svg 
        viewBox="0 0 1000 400" 
        className="w-[95vw] max-w-[1400px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Animated liquid clip path */}
          <clipPath id="liquidClip">
            <motion.path d={wavePath} />
          </clipPath>
        </defs>
        
        {/* Outline text - using paint-order so stroke is behind fill, showing only outer edge */}
        <text
          x="500"
          y="160"
          textAnchor="middle"
          className="font-epilogue font-black"
          style={{
            fontSize: '180px',
            fill: 'white',
            stroke: '#FF322E',
            strokeWidth: '4px',
            strokeLinejoin: 'round',
            strokeLinecap: 'round',
            paintOrder: 'stroke fill',
          }}
        >
          {firstLine}
        </text>
        <text
          x="500"
          y="340"
          textAnchor="middle"
          className="font-epilogue font-black"
          style={{
            fontSize: '180px',
            fill: 'white',
            stroke: '#FF322E',
            strokeWidth: '4px',
            strokeLinejoin: 'round',
            strokeLinecap: 'round',
            paintOrder: 'stroke fill',
          }}
        >
          {secondLine}
        </text>
        
        {/* Filled text with liquid mask */}
        <g clipPath="url(#liquidClip)">
          <text
            x="500"
            y="160"
            textAnchor="middle"
            className="font-epilogue font-black"
            style={{
              fontSize: '180px',
              fill: '#FF322E',
            }}
          >
            {firstLine}
          </text>
          <text
            x="500"
            y="340"
            textAnchor="middle"
            className="font-epilogue font-black"
            style={{
              fontSize: '180px',
              fill: '#FF322E',
            }}
          >
            {secondLine}
          </text>
        </g>
      </svg>
    </div>
  );
};

const FeatureSection = ({
  section,
  index,
  totalSections,
  scrollProgress,
}) => {
  const sectionScrollStart = index / totalSections;
  const sectionScrollEnd = (index + 1) / totalSections;

  // Initial rotation offset for stacked effect
  const initialRotation = index * 2;

  const rotate = useTransform(
    scrollProgress,
    [sectionScrollStart, sectionScrollEnd],
    [initialRotation, -25]
  );

  const translateY = useTransform(
    scrollProgress,
    [sectionScrollStart, sectionScrollEnd],
    [0, -500]
  );

  const translateX = useTransform(
    scrollProgress,
    [sectionScrollStart, sectionScrollEnd],
    [0, -80]
  );

  const opacity = useTransform(
    scrollProgress,
    [sectionScrollStart, sectionScrollEnd - 0.05, sectionScrollEnd],
    [1, 1, 0]
  );

  return (
    <motion.div
      className="absolute w-[calc(100%-2rem)] max-w-[340px] md:max-w-[400px] lg:max-w-[480px] flex flex-col justify-start border border-brand bg-white p-4 md:p-5 lg:p-6 shadow-xl"
      style={{
        rotate: rotate,
        y: translateY,
        x: translateX,
        opacity: opacity,
        zIndex: totalSections - index,
      }}
    >
      {/* Icon */}
      <div className="mb-2 md:mb-3">
        {typeof section.icon === 'string' ? (
          <img src={section.icon} alt={section.title} className="w-10 h-10 md:w-14 md:h-14 object-contain" />
        ) : (
          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">{section.icon}</div>
        )}
      </div>
      
      {/* Title */}
      <h3 className="mb-1 text-base md:text-lg lg:text-xl font-epilogue font-bold text-black">
        {section.title}
      </h3>
      
      {/* Description */}
      <p className="text-xs md:text-sm text-black/80 leading-relaxed">
        {section.description}
      </p>
    </motion.div>
  );
};

export default Layout417;
