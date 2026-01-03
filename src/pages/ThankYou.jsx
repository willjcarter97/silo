import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

const ThankYou = () => {
  usePageMeta(
    "Thank You | Silo Creative",
    "Thank you for getting in touch. We'll be in contact soon."
  );

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [letterStates, setLetterStates] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  const thankYouText = "Thank you";
  const letters = thankYouText.split("");

  // Get the return path from sessionStorage, default to home
  const getReturnPath = () => {
    const savedPath = sessionStorage.getItem("thankYouReturnPath");
    sessionStorage.removeItem("thankYouReturnPath"); // Clean up after reading
    return savedPath || "/";
  };

  // Trigger entrance animations and start redirect timer immediately
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Stagger letter animations
    letters.forEach((_, index) => {
      setTimeout(() => {
        setLetterStates(prev => [...prev, index]);
      }, 150 + index * 80);
    });

    // Start exit animation after 3 seconds, then redirect
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Redirect after exit animation completes (1 second after exit starts)
    const redirectTimer = setTimeout(() => {
      navigate(getReturnPath());
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div 
      className={`min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${
        isExiting ? 'scale-[3] rotate-[15deg] opacity-0' : 'scale-100 rotate-0 opacity-100'
      }`}
    >
      {/* Wild exit overlay */}
      <div 
        className={`fixed inset-0 bg-brand z-50 transition-all duration-700 ease-out pointer-events-none ${
          isExiting ? 'translate-y-0' : 'translate-y-full'
        }`}
      />
      
      {/* Radial burst effect on exit */}
      <div 
        className={`fixed inset-0 z-40 pointer-events-none transition-all duration-500 ${
          isExiting ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(255,50,46,0.3) 50%, rgba(255,50,46,0.8) 100%)'
        }}
      />

      {/* Main content */}
      <div 
        className={`text-center px-4 transition-all duration-700 ${
          isExiting ? 'blur-sm' : 'blur-0'
        }`}
      >
        {/* Animated "Thank you" letters - HUGE */}
        <h1 className="font-epilogue text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-bold text-black mb-4 tracking-tight leading-none overflow-hidden">
          <span className="inline-flex flex-wrap justify-center">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ease-out ${
                  isExiting 
                    ? 'opacity-0 -translate-y-20 rotate-[-20deg] scale-50'
                    : letterStates.includes(index)
                      ? 'opacity-100 translate-y-0 rotate-0 scale-100'
                      : 'opacity-0 translate-y-full rotate-12 scale-100'
                }`}
                style={{
                  transitionDelay: isExiting ? `${(letters.length - index) * 30}ms` : `${index * 50}ms`
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheading */}
        <p 
          className={`font-epilogue text-lg sm:text-xl md:text-2xl text-black max-w-lg mx-auto transition-all duration-700 ease-out ${
            isExiting 
              ? 'opacity-0 translate-y-10 scale-95'
              : isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-100'
          }`}
          style={{ transitionDelay: isExiting ? '0ms' : '800ms' }}
        >
          Message received. We'll be in touch.<br />
          Now, back to the fun part.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
