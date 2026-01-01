import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { servicesData } from "../../data/servicesData.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARD_DATA = servicesData;

const Cards = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const cardProgress = useMotionValue(0);

  // Register ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Desktop ScrollTrigger - uses native scroll with pinning for smooth trackpad support
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      if (!desktopRef.current) return;

      ScrollTrigger.create({
        trigger: desktopRef.current,
        start: "center center",
        end: "+=1000", // Scroll distance to complete all cards
        pin: true,
        scrub: 0.8, // Smooth scrubbing - slightly higher for desktop feel
        onUpdate: (self) => {
          const progress = self.progress * CARD_DATA.length;
          cardProgress.set(progress);
        },
      });
    });

    return () => mm.revert();
  }, [cardProgress]);

  // Mobile ScrollTrigger
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 639px)", () => {
      if (!mobileRef.current) return;

      ScrollTrigger.create({
        trigger: mobileRef.current,
        start: "60% center",
        end: "+=1200",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress * CARD_DATA.length;
          cardProgress.set(progress);
        },
      });
    });

    return () => mm.revert();
  }, [cardProgress]);

  return (
    <>
      {/* Desktop View - Hidden on Mobile */}
      <div
        ref={desktopRef}
        className="hidden sm:flex w-full max-w-[1280px] mx-auto h-[calc(100vh-80px)] 2xl:mt-20 md:mt-0 flex-col items-center justify-center relative z-30"
        style={{ overflow: "visible" }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center">
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
            const finalY = useTransform(transformY, (v) => -offset.y + v);

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
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[360px] md:w-[420px] lg:w-[580px] 2xl:w-[720px] min-h-[180px] sm:min-h-[190px] md:min-h-[200px] lg:min-h-[250px] 2xl:min-h-[340px] bg-white border-[1px] border-[#FF322E] flex flex-col items-start justify-start px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 pb-8 sm:pb-10 md:pb-12 shadow-lg"
              >
                <div className="mb-2 sm:mb-3 md:mb-4 flex w-full justify-between items-center text-sm sm:text-base lg:text-base 2xl:text-xl font-bold">
                  {card.icon}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-2xl 2xl:text-5xl font-bold mb-1 sm:mb-2">
                  {card.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl 2xl:text-3xl text-black">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
        <h1 className="text-brand text-[28vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[15vw] leading-tight md:leading-tight 2xl:leading-[20rem] font-bold text-center z-10 pointer-events-none">
          CORE <br /> SERVICES
        </h1>
      </div>

      {/* Mobile View - Only Visible on Mobile */}
      <div
        ref={mobileRef}
        className="sm:hidden w-full h-[90vh] pb-20 flex flex-col items-center justify-center relative"
        style={{ overflow: "visible" }}
      >
        <h1 className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 text-brand text-[20vw] leading-[5rem] font-bold text-center z-10 pointer-events-none">
          CORE <br /> SERVICES
        </h1>

        <div
          className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-1/2 z-[20] flex items-center justify-center"
          style={{ height: 200, width: 300 }}
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
                style={{
                  y: finalY,
                  x: 10,
                  rotate: offset.r,
                  zIndex: z,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[310px] bg-white shadow-[0_0_0_2px_#FF322E] outline-1 outline-transparent outline flex flex-col items-start justify-start gap-3 px-4 py-5 will-change-transform"
              >
                <div className="flex w-full justify-between items-start mb-1">
                  <div className="scale-[0.4] origin-top-left h-8">
                    {card.icon}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
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
