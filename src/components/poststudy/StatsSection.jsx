const StatsSection = ({ title, column1, column2, column3 }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto py-12 md:py-20 px-5 md:px-6 lg:px-0">
      {/* Section Title */}
      {title && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8">
          {title}
        </h2>
      )}

      {/* Mobile Layout: Image followed by stats for each */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Column 1 Stats */}
        <div className="bg-white border-[1px] border-black p-8 flex flex-col justify-between min-h-[400px]">
          <h3 className="text-lg font-bold text-black">
            {column1?.heading || "Short stats heading goes here"}
          </h3>
          <div className="text-right">
            <div className="text-7xl md:text-5xl font-bold text-black mb-4">
              {column1?.value || "30%"}
            </div>
            <div className="w-full h-[1px] bg-black mb-4"></div>
            <p className="text-sm text-black leading-relaxed">
              {column1?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
          </div>
        </div>

        {/* Column 2: Image then Stats */}
        <div className="w-full aspect-[4/3] bg-white overflow-hidden">
          {column2?.image?.src ? (
            <img
              src={column2.image.src}
              alt={column2.image.alt || "Stats image"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#DBDBDB]">
              <svg
                className="w-20 h-20 text-[#BABABA]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
        </div>

        <div className="bg-white border-[1px] border-black p-8 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-black mb-4">
            {column2?.stat?.heading || "Short stats heading goes here"}
          </h3>
          <div className="text-right">
            <div className="text-6xl font-bold text-black mb-4">
              {column2?.stat?.value || "30%"}
            </div>
            <div className="w-full h-[1px] bg-black mb-4"></div>
            <p className="text-sm text-black leading-relaxed">
              {column2?.stat?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
          </div>
        </div>

        {/* Column 3: Image then Stats */}
        <div className={`w-full ${column3?.image?.heightClass || 'aspect-[4/3]'} bg-white overflow-hidden`}>
          {column3?.image?.src ? (
            <img
              src={column3.image.src}
              alt={column3.image.alt || "Stats image"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#DBDBDB]">
              <svg
                className="w-20 h-20 text-[#BABABA]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
        </div>

        <div className={`bg-white border-[1px] border-black p-8 flex flex-col justify-between ${column3?.stat?.heightClass || ''}`}>
          <h3 className="text-lg font-bold text-black mb-4">
            {column3?.stat?.heading || "Short stats heading goes here"}
          </h3>
          <div className="text-right">
            <div className="text-6xl font-bold text-black mb-4">
              {column3?.stat?.value || "30%"}
            </div>
            <div className="w-full h-[1px] bg-black mb-4"></div>
            <p className="text-sm text-black leading-relaxed">
              {column3?.stat?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout: 3 Column Grid (unchanged) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Column 1: Single tall card */}
        <div className="bg-white border-[1px] border-black p-8 md:p-8 lg:p-0 xl:p-10 flex flex-col justify-between md:min-h-[500px]">
          <h3 className="text-lg md:text-xl font-bold text-black">
            {column1?.heading || "Short stats heading goes here"}
          </h3>
          <div className="text-right">
            <div className="text-5xl md:text-5xl lg:text-8xl font-bold text-black mb-4">
              {column1?.value || "30%"}
            </div>
            <div className="w-full h-[1px] bg-black mb-4"></div>
            <p className="text-sm md:text-base text-black text-left leading-relaxed">
              {column1?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
          </div>
        </div>

        {/* Column 2: Image on top, Stat on bottom */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Image Card */}
          <div className="w-full aspect-[4/3] bg-white overflow-hidden">
            {column2?.image?.src ? (
              <img
                src={column2.image.src}
                alt={column2.image.alt || "Stats image"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#DBDBDB]">
                <svg
                  className="w-20 h-20 text-[#BABABA]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
            )}
          </div>

          {/* Stat Card */}
          <div className="bg-white border-[1px] border-black p-8 lg:p-0 lg:py-10 xl:p-10 flex flex-col justify-between">
            <h3 className="text-lg md:text-xl font-bold text-black mb-4">
              {column2?.stat?.heading || "Short stats heading goes here"}
            </h3>
            <div className="text-right">
              <div className="text-5xl md:text-5xl lg:text-8xl font-bold text-black mb-4">
                {column2?.stat?.value || "30%"}
              </div>
              <div className="w-full h-[1px] bg-black mb-4"></div>
              <p className="text-sm md:text-base text-left text-black leading-relaxed">
                {column2?.stat?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Stat on top, Image on bottom */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8 md:col-span-2 lg:col-span-1">
          {/* Stat Card */}
          <div className={`bg-white border-[1px] border-black p-8 lg:p-0 lg:py-10 xl:p-10 flex flex-col justify-between md:w-1/2 lg:w-full ${column3?.stat?.heightClass || ''}`}>
            <h3 className="text-lg md:text-xl font-bold text-black mb-4">
              {column3?.stat?.heading || "Short stats heading goes here"}
            </h3>
            <div className="text-right">
              <div className="text-5xl md:text-5xl lg:text-8xl font-bold text-black mb-4">
                {column3?.stat?.value || "30%"}
              </div>
              <div className="w-full h-[1px] bg-black mb-4"></div>
              <p className="text-sm md:text-base text-left text-black leading-relaxed">
                {column3?.stat?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </div>
          </div>

          {/* Image Card */}
          <div className={`w-full md:w-1/2 lg:w-full ${column3?.image?.heightClass || 'aspect-[4/3]'} bg-white overflow-hidden`}>
            {column3?.image?.src ? (
              <img
                src={column3.image.src}
                alt={column3.image.alt || "Stats image"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#DBDBDB]">
                <svg
                  className="w-20 h-20 text-[#BABABA]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
