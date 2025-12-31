const SimpleHeadingText = ({ heading, text }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto py-16 md:py-24 px-5 md:px-6 lg:px-0">
      <div className="max-w-4xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
          {heading || "Medium length section heading goes here"}
        </h2>
        <div className="flex flex-col gap-4">
          {Array.isArray(text) ? (
            text.map((para, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-black leading-relaxed"
              >
                {para}
              </p>
            ))
          ) : (
            <p className="text-base md:text-lg text-black leading-relaxed">
              {text ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleHeadingText;
