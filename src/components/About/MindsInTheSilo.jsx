import { useState, useEffect, useRef, useCallback } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { client } from "../../prismicio";

const MindsInTheSilo = () => {
  // Carousel state management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Viewport animation state
  const [cardsInViewport, setCardsInViewport] = useState(new Set());
  const cardRefs = useRef([]);

  // Team members state - fetched from Prismic
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch team members from Prismic
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await client.getAllByType("team_member", {
          orderings: { field: "my.team_member.display_order", direction: "asc" },
        });

        const members = response
          .filter((doc) => doc.data.is_active !== false)
          .map((doc) => ({
            id: doc.uid,
            type: "team-member",
            name: doc.data.name || "",
            title: doc.data.title || "",
            description: doc.data.description || "",
            imageUrl: doc.data.photo?.url || "",
          }));

        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members:", error);
        // Fallback to empty array on error
        setTeamMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Special card content based on team size
  const getSpecialCardContent = () => {
    if (teamMembers.length <= 2) {
      return {
        id: "join-us",
        type: "special-card",
        title: "It's not the size that matters.",
        description: "But a few more teammates wouldn't hurt.",
        buttonText: "View Openings",
        showSecondaryAction: false,
      };
    } else {
      return {
        id: "join-us",
        type: "special-card",
        title: "Think you're the right fit for our team?",
        description: "Can't see an opening that fits you?",
        secondaryDescription: "Get in touch anyway - we're always on the lookout for our next team-mates!",
        buttonText: "Current Vacancies",
        showSecondaryAction: true,
      };
    }
  };

  // Combine team members with special card
  const carouselData = [...teamMembers, getSpecialCardContent()];

  // Enhanced responsive breakpoint detection
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Intersection Observer for viewport-based animations
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      const cardIndex = parseInt(entry.target.dataset.cardIndex);

      setCardsInViewport((prev) => {
        const newSet = new Set(prev);

        // Card is entering viewport (even 1% visible)
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          newSet.add(cardIndex);
        }
        // Card is completely out of viewport
        else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
          newSet.delete(cardIndex);
        }

        return newSet;
      });
    });
  }, []);

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.01], // Trigger at 0% (completely out) and 1% (barely in)
    });

    // Observe all card elements
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [observerCallback]);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      // Compute cards-per-view for previous and new widths so we can reset slide on breakpoint change
      const prevWidth = viewportWidth;
      const getCardsPerView = (w) => {
        if (w < 768) return 1;
        if (w < 1280) return 2; // md and lg show 2 cards
        return 3; // xl and up show 3 cards
      };

      const prevCards = getCardsPerView(prevWidth);
      const newCards = getCardsPerView(width);

      if (newCards !== prevCards) {
        setCurrentSlide(0);
      }

      setViewportWidth(width);
    };

    // Initial check
    checkViewport();

    // Debounced resize handler for better performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [viewportWidth]);

  // Dynamic slide calculation based on viewport width
  const getLayoutForWidth = (w) => {
    // returns { cardsPerView, cardWidth, gap }
    if (w < 768) {
      return { cardsPerView: 1, cardWidth: Math.min(320, w - 40), gap: 12 };
    }
    if (w < 1024) {
      // md: show 2 cards, calculate width to fit properly
      const availableWidth = w - 80; // account for padding
      const cardWidth = Math.min(340, (availableWidth - 24) / 2);
      return { cardsPerView: 2, cardWidth, gap: 24 };
    }
    if (w < 1280) {
      // lg: show 2 cards, calculate width to fit properly
      const availableWidth = w - 100;
      const cardWidth = Math.min(380, (availableWidth - 24) / 2);
      return { cardsPerView: 2, cardWidth, gap: 24 };
    }
    // xl and up: show 3 cards, calculate width to fit properly
    const availableWidth = w - 120;
    const cardWidth = Math.min(380, (availableWidth - 48) / 3);
    return { cardsPerView: 3, cardWidth, gap: 24 };
  };

  const { cardsPerView, cardWidth, gap } = getLayoutForWidth(viewportWidth);
  const totalSlides =
    cardsPerView === 1
      ? carouselData.length
      : Math.max(1, carouselData.length - cardsPerView + 1);

  // Ensure cards are visible when they slide into carousel view (handles horizontal carousel sliding)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only add cards to the viewport set, never remove (intersection observer handles removal)
      if (cardsPerView === 1) {
        // On mobile, mark current slide as visible
        setCardsInViewport((prev) => new Set(prev).add(currentSlide));
      } else {
        // On larger screens, mark all currently displayed cards
        setCardsInViewport((prev) => {
          const newSet = new Set(prev);
          for (let i = currentSlide; i < Math.min(currentSlide + cardsPerView, carouselData.length); i++) {
            newSet.add(i);
          }
          return newSet;
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentSlide, cardsPerView, carouselData.length]);

  // Calculate the maximum slide index (clamped)
  const maxSlide = Math.max(0, totalSlides - 1);

  // Navigation functions with faster transitions
  const goToSlide = useCallback((slideIndex) => {
    // Clamp to valid range
    const clampedSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    if (!isTransitioning && clampedSlide !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(clampedSlide);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [isTransitioning, currentSlide, maxSlide]);

  const goToNextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToPrevSlide, goToNextSlide]);

  // Cleanup any active timers on unmount
  useEffect(() => {
    return () => {
      // Clear any pending transition timeouts
      setIsTransitioning(false);
    };
  }, []);

  // Don't render until data is loaded
  if (isLoading) {
    return (
      <section className="flex items-center justify-center py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-0 bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  // Don't render if no team members
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="flex items-start justify-center py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-0 bg-white overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header Section - Zoom & Small Laptop Optimized */}
        <div className="text-left xl:text-left mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2 sm:px-0">
          <h2
            className="font-bold text-black text-4xl sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-[48px] leading-tight mb-3 sm:mb-4"
            style={{
              opacity: 1,
              fontFamily: "Epilogue, sans-serif",
              fontWeight: 700,
              lineHeight: "120%",
              letterSpacing: "0%",
            }}
          >
            Minds at Silo
          </h2>

          <p
            className="text-black text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl xl:mx-0"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 400,
              lineHeight: "150%",
              letterSpacing: "0%",
            }}
          >
            Behind Silo is a team of storytellers, designers and digital creators building brands with ideas, identity and experiences that move people.
          </p>
        </div>

        {/* Carousel Container - Mobile Optimized */}
        <div
          className="relative"
          role="region"
          aria-label="Team members carousel"
          aria-live="polite"
        >
          {/* Cards Container - Mobile Enhanced with Framer Motion */}
          <div
            className="overflow-hidden w-full px-2 sm:px-4 lg:px-0 lg:max-w-full lg:mx-auto"
            role="group"
            aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
          >
            <motion.div
              className={`flex items-stretch gap-3 sm:gap-4 md:gap-6 select-none ${
                totalSlides > 1 ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
              style={{ touchAction: totalSlides > 1 ? "pan-y" : "auto" }}
              drag={totalSlides > 1 ? "x" : false}
              dragConstraints={{
                // Right constraint: cannot scroll past first card (x cannot be positive)
                right: 0,
                // Left constraint: cannot scroll past last viewable position
                left: -(cardWidth + gap) * maxSlide,
              }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={() => {
                setIsDragging(true);
                document.body.style.userSelect = "none";
              }}
              onDragEnd={(event, info) => {
                setIsDragging(false);
                document.body.style.userSelect = "";
                
                const offset = info.offset.x;
                const velocity = info.velocity.x;
                const slideWidth = cardWidth + gap;
                
                // Calculate which slide to snap to based on drag direction and velocity
                let targetSlide = currentSlide;
                
                // Significant drag or fast swipe
                if (Math.abs(offset) > slideWidth * 0.25 || Math.abs(velocity) > 300) {
                  if (offset > 0) {
                    // Dragged right -> go to previous slide
                    targetSlide = currentSlide - 1;
                  } else if (offset < 0) {
                    // Dragged left -> go to next slide
                    targetSlide = currentSlide + 1;
                  }
                }
                
                // Clamp to valid range (this is the key fix!)
                targetSlide = Math.max(0, Math.min(targetSlide, maxSlide));
                
                // Update slide (this will trigger the animate prop)
                if (targetSlide !== currentSlide) {
                  setCurrentSlide(targetSlide);
                }
                // If same slide, Framer Motion will snap back automatically due to animate prop
              }}
              animate={{
                x: -currentSlide * (cardWidth + gap),
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5,
              }}
              style={{
                width: `${
                  cardWidth * carouselData.length +
                  gap * (carouselData.length - 1)
                }px`,
              }}
            >
              {carouselData.map((item, index) => {
                const isInViewport = cardsInViewport.has(index);
                const isDisplayed = index >= currentSlide && index < currentSlide + cardsPerView;

                return (
                  <motion.div
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                      if (el) el.dataset.cardIndex = index;
                    }}
                    className="flex-shrink-0 flex"
                    style={{ 
                      width: `${cardWidth}px`,
                      // Consistent height: square image + text content area
                      minHeight: `${cardWidth + 180}px`,
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 50, rotateY: -15 }}
                    animate={{
                      opacity: (isInViewport || isDisplayed) ? 1 : 0,
                      scale: (isInViewport || isDisplayed) ? 1 : 0.8,
                      y: (isInViewport || isDisplayed) ? 0 : 50,
                      rotateY: (isInViewport || isDisplayed) ? 0 : -15,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    {item.type === "team-member" ? (
                      // Team Member Card - No fading animations
                      <motion.div
                        className="bg-white flex flex-col border-[1px] p-1 transition-all duration-200 h-full w-full"
                        style={{
                          pointerEvents: "auto",
                          borderColor:
                            cardsPerView === 1 && isInViewport
                              ? "transparent"
                              : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!isDragging && window.innerWidth >= 768) {
                            e.currentTarget.style.borderColor = "transparent";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (cardsPerView !== 1 || !isInViewport) {
                            e.currentTarget.style.borderColor = "transparent";
                          }
                        }}
                        whileHover={!isDragging ? {} : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Square Image Container */}
                        <div className="w-full aspect-square overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={`${item.name} - Team Member`}
                            className="w-full h-full object-cover block"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>

                        {/* Text Content - No animations */}
                        <div className="mt-0 pt-3 sm:pt-3 lg:pt-4 flex-1 flex flex-col">
                          <h3 className="font-semibold text-black text-xl sm:text-base lg:text-2xl text-left">
                            {item.name}
                          </h3>
                          <p className="text-black text-base sm:text-sm lg:text-xl text-left mb-5 font-normal">
                            {item.title}
                          </p>
                          <p className="text-black text-sm lg:text-lg leading-relaxed text-left font-normal">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      // Special Card - Viewport-based animations (matches team card height)
                      <motion.div
                        className="p-3 sm:p-4 lg:p-6 xl:p-8 flex flex-col justify-center items-center text-center border-[1px] group h-full w-full"
                        style={{
                          backgroundColor: "#FFE5E5",
                          borderColor: "#FF322E",
                          pointerEvents: isDragging ? "none" : "auto",
                          // Match the aspect-square image + text content height
                          minHeight: `${cardWidth + 180}px`,
                        }}
                        whileHover={
                          !isDragging
                            ? {
                                borderColor: "#FF1E1A",
                                rotate: 0,
                              }
                            : {}
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="space-y-4 sm:space-y-4 lg:space-y-5 xl:space-y-6 max-w-xs"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: (isInViewport || isDisplayed) ? 1 : 0,
                            scale: (isInViewport || isDisplayed) ? 1 : 0.8,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: isInViewport ? 0.2 : 0,
                          }}
                        >
                          <motion.h3
                            className="font-bold text-black text-2xl text-center w-[90%] md:text-3xl md:w-[100%] mx-auto sm:text-xl lg:text-2xl xl:text-3xl leading-tight"
                            style={{
                              fontFamily: "Epilogue, sans-serif",
                              fontWeight: 700,
                              lineHeight: "120%",
                              letterSpacing: "0%",
                            }}
                            initial={{ opacity: 0, scale: 0.7, rotateZ: -5 }}
                            animate={{
                              opacity: (isInViewport || isDisplayed) ? 1 : 0,
                              scale: (isInViewport || isDisplayed) ? 1 : 0.7,
                              rotateZ: (isInViewport || isDisplayed) ? 0 : -5,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: isInViewport ? 0.3 : 0,
                            }}
                          >
                            {item.title}
                          </motion.h3>

                          <motion.p
                            className="text-black text-sm text-center w-[90%] mx-auto md:w-[100%] sm:text-sm lg:text-base leading-relaxed"
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontWeight: 400,
                              lineHeight: "150%",
                              letterSpacing: "0%",
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{
                              opacity: (isInViewport || isDisplayed) ? 1 : 0,
                              y: (isInViewport || isDisplayed) ? 0 : 15,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: isInViewport ? 0.5 : 0,
                            }}
                          >
                            {item.description}
                          </motion.p>

                          <motion.a
                            href="/careers"
                            className="inline-flex items-center justify-center gap-2 bg-brand h-12 px-6 py-3 text-sm font-bold tracking-wide text-white border-transparent relative overflow-hidden group mx-auto"
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontWeight: 700,
                            }}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{
                              opacity: isInViewport ? 1 : 0,
                              y: isInViewport ? 0 : 20,
                              scale: isInViewport ? 1 : 0.8,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: isInViewport ? 0.4 : 0,
                            }}
                          >
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 svg-wrapper group-hover:animate-bounce-custom">
                              <FaChevronRight className="text-white w-5 h-5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-[140%]" />
                            </div>
                            <span className="block transition-all duration-300 ease-in-out text-base group-hover:translate-x-80">
                              {item.buttonText}
                            </span>
                          </motion.a>

                          {/* Secondary content for larger teams */}
                          {item.showSecondaryAction && (
                            <>
                              <motion.p
                                className="text-black text-xs text-center w-[90%] mx-auto md:w-[100%] sm:text-xs lg:text-sm leading-relaxed pt-2"
                                style={{
                                  fontFamily: "DM Sans, sans-serif",
                                  fontWeight: 400,
                                  lineHeight: "150%",
                                }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{
                                  opacity: (isInViewport || isDisplayed) ? 1 : 0,
                                  y: (isInViewport || isDisplayed) ? 0 : 15,
                                }}
                                transition={{
                                  duration: 0.6,
                                  delay: isInViewport ? 0.6 : 0,
                                }}
                              >
                                {item.secondaryDescription}
                              </motion.p>
                            </>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Controls - Mobile Optimized */}
          {totalSlides > 1 && (
            <div className="flex justify-between items-center mt-6 sm:mt-8 w-full pr-2 sm:pr-4 lg:max-w-full lg:mx-auto lg:pr-10">
              {/* Navigation Dots - Mobile Enhanced */}
              <div className="flex space-x-1 sm:space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentSlide(index);
                        setTimeout(() => setIsTransitioning(false), 300);
                      }
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      currentSlide === index
                        ? "bg-red-500"
                        : "bg-red-200 hover:bg-red-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentSlide === index ? "true" : "false"}
                  />
                ))}
              </div>

              {/* Navigation Arrows - Mobile Enhanced */}
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={goToPrevSlide}
                  disabled={isTransitioning || currentSlide === 0}
                  className={`w-10 h-10 sm:w-12 sm:h-12 border border-red-500 text-red-500 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-base sm:text-lg ${
                    isTransitioning || currentSlide === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-50 active:bg-red-100"
                  }`}
                  aria-label="Previous slide"
                >
                  <HiArrowLeft />
                </button>
                <button
                  onClick={goToNextSlide}
                  disabled={isTransitioning || currentSlide === totalSlides - 1}
                  className={`w-10 h-10 sm:w-12 sm:h-12 border border-red-500 text-red-500 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-base sm:text-lg ${
                    isTransitioning || currentSlide === totalSlides - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-50 active:bg-red-100"
                  }`}
                  aria-label="Next slide"
                >
                  <HiArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MindsInTheSilo;

