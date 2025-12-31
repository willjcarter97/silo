const WhyUGC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-0 bg-white overflow-x-hidden">
      <div className="max-w-full mx-auto w-full">
        <h2 
          className="font-bold text-black mb-10 mt-5 md:mb-10 sm:mb-8 text-left xl:text-left text-4xl sm:text-xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-[60px] leading-tight px-2 sm:px-0 w-[70vw] md:w-[30vw] lg:w-[30vw] xl:w-[30vw]"
          style={{
            opacity: 1,
          
            fontWeight: 700,
            lineHeight: '120%',
            letterSpacing: '0%'
          }}
        >
          Why we choose UGC?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
          {/* First Column - Zoom & Small Laptop Optimized */}
          <div className="w-full space-y-2 sm:space-y-2  md:space-y-2 px-2 sm:px-0 max-w-md mx-auto lg:max-w-none">
            <img 
              src="https://images.prismic.io/silosite/aVUf93NYClf9otq2_v1762717258_img1_f6eobz.png?auto=format,compress" 
              alt="People trust people"
              className="w-full h-auto max-h-56 sm:max-h-56 md:max-h-64 lg:max-h-[450px] object-cover"
              loading="lazy"
            />
            <h3 
              className="font-bold text-black text-xl sm:text-xl md:text-xl lg:text-3xl text-left"
              style={{
              
                fontWeight: 700,
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Because people trust people.
            </h3>
            <p 
              className="text-black text-xs sm:text-base pb-10 md:text-base leading-relaxed text-left"
              style={{
                
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              UGC feels real. It doesn't look like an ad. It looks like 
              someone you'd actually follow. That's why it works.
            </p>
          </div>
          
          {/* Second Column - Zoom & Small Laptop Optimized */}
          <div className="w-full space-y-2 sm:space-y-2  md:space-y-2 lg:pt-0 xl:pt-8 2xl:pt-16 px-2 sm:px-0 max-w-md mx-auto  lg:max-w-none">
            <img 
              src="https://images.prismic.io/silosite/aVUf13NYClf9otqw_v1762717257_img2_nbestt.png?auto=format,compress" 
              alt="Strategy makes it scale"
              className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-[250px] object-cover"
              loading="lazy"
            />
            <h3 
              className="font-bold text-black text-xl sm:text-xl md:text-xl lg:text-3xl text-left"
              style={{
              
                fontWeight: 700,
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Because strategy makes it scale.
            </h3>
            <p 
              className="text-black text-xs sm:text-base pb-10 md:text-base leading-relaxed text-left"
              style={{
                
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              On its own, UGC is just content. When we build into a 
              social strategy, brand mapping, and storytelling, it 
              becomes a growth engine.
            </p>
          </div>
          
          {/* Third Column - Zoom & Small Laptop Optimized */}
          <div className="w-full space-y-2 sm:space-y-2  md:space-y-2 lg:pt-0 xl:pt-16 2xl:pt-32 px-2 sm:px-0 max-w-md mt-auto mx-auto lg:max-w-none md:col-span-2 lg:col-span-1">
            <img 
              src="https://images.prismic.io/silosite/aVUgpHNYClf9otsb_v1762717244_img3_dwttap.png?auto=format,compress" 
              alt="Brands need both"
              className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-[240px] object-cover"
              loading="lazy"
            />
            <h3 
              className="font-bold text-black text-xl sm:text-xl md:text-xl lg:text-3xl text-left"
              style={{
              
                fontWeight: 700,
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Because brands need both.
            </h3>
            <p 
              className="text-black text-xs sm:text-base pb-10 md:text-base leading-relaxed text-left"
              style={{
                
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              We don't pick between slick campaigns and scrappy 
              creator clips. We blend them. Structured strategy + 
              creator energy = content that connects and 
              converts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUGC;