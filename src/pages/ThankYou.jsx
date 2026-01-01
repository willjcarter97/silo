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

  const thankYouText = "Thank you";
  const letters = thankYouText.split("");

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

    // Redirect after 4 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Main content */}
      <div className="text-center px-4">
        {/* Animated "Thank you" letters - HUGE */}
        <h1 className="font-epilogue text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-bold text-black mb-4 tracking-tight leading-none overflow-hidden">
          <span className="inline-flex flex-wrap justify-center">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ease-out ${
                  letterStates.includes(index)
                    ? 'opacity-100 translate-y-0 rotate-0'
                    : 'opacity-0 translate-y-full rotate-12'
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`
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
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          Message received. We'll be in touch.<br />
          Now, back to the fun part.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;

