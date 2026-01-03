import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { servicesData } from "../../data/servicesData.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARD_DATA = servicesData;

const Cards = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const cardProgress = useMotionValue(0);
  const [isLocked, setIsLocked] = useState(false);
  const isAnimating = useRef(false);
  const unlockTimeoutRef = useRef(null);

  useEffect(() => {
    const unsubscribe = cardProgress.on("change", (latest) => {
      if (isAnimating.current && (latest >= CARD_DATA.length || latest <= 0)) {
        if (unlockTimeoutRef.current) {
          clearTimeout(unlockTimeoutRef.current);
        }

        const delay = latest >= CARD_DATA.length ? 800 : 300;

        unlockTimeoutRef.current = setTimeout(() => {
          setIsLocked(false);
          isAnimating.current = false;
        }, delay);
      }
    });

    // Initialize state if below section on load
    if (desktopRef.current) {
      const rect = desktopRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        cardProgress.set(CARD_DATA.length);
      }
    }

    return () => {
      unsubscribe();
      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, []);

  // Desktop wheel handler with scroll lock
  useEffect(() => {
    const handleWheel = (e) => {
      if (!desktopRef.current) return;

      const rect = desktopRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const containerCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(containerCenter - viewportCenter);

      // Check if section is visible
      const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = visibleBottom - visibleTop;
      const visibilityRatio = visibleHeight / rect.height;
      const isSignificantlyVisible = visibilityRatio >= 0.3;

      // Only lock when section is visible and near center
      const isCentered =
        distanceFromCenter <= 300 && isInViewport && isSignificantlyVisible;

      const currentProgress = cardProgress.get();

      // Don't lock if we're at boundaries and not animating
      const atBoundary =
        (currentProgress >= CARD_DATA.length && e.deltaY > 0) ||
        (currentProgress <= 0 && e.deltaY < 0);
      const shouldLock = (isCentered || isAnimating.current) && !atBoundary;

      if (shouldLock) {
        e.preventDefault();
        e.stopPropagation();

        if (!isLocked && !isAnimating.current && isCentered) {
          setIsLocked(true);
          isAnimating.current = true;

          // Auto-scroll section to perfect center when lock engages
          const scrollOffset = containerCenter - viewportCenter;
          const targetScrollY = window.scrollY + scrollOffset;

          window.scrollTo({
            top: targetScrollY,
            behavior: "smooth",
          });
        }

        const delta = e.deltaY;
        // Direct proportional movement - faster scroll = faster card movement
        const step = Math.abs(delta) * 0.002;
        const direction = delta > 0 ? 1 : -1;

        const newProgress = Math.max(
          0,
          Math.min(CARD_DATA.length, currentProgress + direction * step)
        );
        cardProgress.set(newProgress);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLocked]);

  // Register ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Mobile ScrollTrigger
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 639px)", () => {
      if (!mobileRef.current) return;

        ScrollTrigger.create({
          trigger: mobileRef.current,
          start: "center center",
          end: "+=350", // Short scroll distance
          pin: true,
          scrub: 0.2,
        onUpdate: (self) => {
          // Map progress 0-1 to card index 0-CARD_DATA.length
          const progress = self.progress * CARD_DATA.length;
          cardProgress.set(progress);
        },
      });
    });

    return () => mm.revert(); // Cleanup
  }, []);

  return (
    <>
      {/* Desktop View - Hidden on Mobile */}
      <div
        ref={desktopRef}
        className="hidden sm:flex w-full max-w-[1280px] mx-auto h-[calc(100vh-80px)] 2xl:mt-20 md:mt-0 flex-col items-center justify-center relative"
        style={{ overflow: "hidden" }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
          {CARD_DATA.map((card, i) => {
            const VISIBLE_COUNT = Math.min(5, CARD_DATA.length);
            const computeOffset = (idx) => {
              if (idx === 0) return { x: 0, y: 0, r: 0 };
              if (idx < VISIBLE_COUNT) {
                const pos = idx;
                const x = (pos % 2 === 0 ? -1 : 1) * (8 + pos * 6);
                const y = pos * 18;
                const r = (pos % 2 === 0 ? -4 : 4) - (pos % 3);
                return { x, y, r };
              }
              const hiddenIndex = idx - VISIBLE_COUNT;
              return {
                x: idx % 2 === 0 ? -6 : 6,
                y: 120 + hiddenIndex * 22,
                r: idx % 2 === 0 ? -6 : 6,
              };
            };

            const offset = computeOffset(i);
            const z = 40 - i;

            // Desktop Transform Logic
            const transformY = useTransform(
              cardProgress,
              [i, i + 1],
              [0, -1000]
            );
            const finalY = useTransform(transformY, (v) => -offset.y + v - 80);

            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  y: 20,
                  x: -300,
                  rotate: offset.r,
                  scale: 1,
                }}
                style={{
                  y: finalY,
                  rotate: offset.r,
                  zIndex: z,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 2xl:w-[720px] lg:w-[580px] md:w-[420px] md:h-[200px] lg:h-[250px] 2xl:h-[340px] bg-white border-[1px] border-[#FF322E] flex flex-col items-start justify-center px-12 py-10 shadow-lg"
              >
                <div className="mb-4 flex w-full justify-between items-center 2xl:text-xl lg:text-base font-bold">
                  {card.icon}
                </div>
                <h2 className="2xl:text-5xl lg:text-2xl font-bold mb-2">
                  {card.title}
                </h2>
                <p className="2xl:text-3xl lg:text-xl text-black">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
        <h1 className="text-brand xl:text-[15vw] md:text-[22vw] md:leading-tight font-bold text-center 2xl:leading-[20rem] z-10 pointer-events-none lg:text-[20vw]">
          CORE <br /> SERVICES
        </h1>
      </div>

      {/* Mobile View - Only Visible on Mobile */}
      <div
        ref={mobileRef}
        className="sm:hidden w-full h-[50vh] flex flex-col items-center justify-center relative"
        style={{ overflow: "visible" }}
      >
        <h1 className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 text-brand text-[16vw] leading-[4rem] font-bold text-center z-10 pointer-events-none">
          CORE <br /> SERVICES
        </h1>

        <div
          className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-[20] flex items-center justify-center"
          style={{ height: 180, width: 290 }}
        >
          {CARD_DATA.map((card, i) => {
            const VISIBLE_COUNT = Math.min(5, CARD_DATA.length);
            const computeOffset = (idx) => {
              if (idx === 0) return { x: 0, y: 0, r: 0 };
              if (idx < VISIBLE_COUNT) {
                const pos = idx;
                const x = (pos % 2 === 0 ? 1 : -1) * (4 + pos * 3);
                const y = pos * 8;
                const r = (pos % 2 === 0 ? 2 : -2) + (pos % 3);
                return { x, y, r };
              }
              const hiddenIndex = idx - VISIBLE_COUNT;
              return {
                x: idx % 2 === 0 ? 3 : -3,
                y: 60 + hiddenIndex * 10,
                r: idx % 2 === 0 ? 3 : -3,
              };
            };

            const offset = computeOffset(i);
            const z = 40 - i;

            // Mobile Transform Logic
            // Mobile Transform Logic
            const scrollY = useTransform(cardProgress, [i, i + 1], [0, -1000]);

            const finalY = useTransform(scrollY, (v) => -offset.y + v);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 20, x: 10, rotate: offset.r }}
                animate={
                  isLocked
                    ? {
                        opacity: 1,
                        x: 10,
                        rotate: offset.r,
                        scale: 1,
                      }
                    : undefined
                }
                style={{
                  y: finalY,
                  x: 10,
                  rotate: offset.r,
                  zIndex: z,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[290px] h-[200px] bg-white shadow-[0_0_0_2px_#FF322E] outline-1 outline-transparent outline flex flex-col items-start justify-between px-4 py-5 will-change-transform"
              >
                <div className="flex w-full justify-between items-start">
                  <div className="scale-[0.55] origin-top-left">
                    {card.icon}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-extrabold uppercase leading-tight tracking-tight text-black font-epilogue">
                    {card.title}
                  </h2>
                  <p className="text-[13px] text-black/80 leading-relaxed font-dm">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cards;
