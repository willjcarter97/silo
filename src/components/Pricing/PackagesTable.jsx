import { FaChevronRight } from "react-icons/fa";
import { packages, tableRows, priceButtonText, smallPrint, tableCta } from "../../data/pricingData";

// Colour language from the brochure: Refresh = red, Rebrand = black
const tone = {
  refresh: { border: "border-brand", head: "text-brand", block: "bg-brand", bar: "bg-brand" },
  rebrand: { border: "border-black", head: "text-black", block: "bg-black", bar: "bg-black" },
};

// The price row: a button in the brochure's red / black price blocks
const PriceButton = ({ pkg, onGetBrochure, className = "" }) => (
  <a
    href="#brochure"
    onClick={(e) => {
      e.preventDefault();
      onGetBrochure();
    }}
    className={`group flex items-center justify-between gap-3 px-5 py-5 min-h-[76px] text-left font-epilogue font-bold text-lg md:text-xl text-white transition-opacity duration-200 hover:opacity-90 ${tone[pkg.key].block} ${className}`}
  >
    <span>{priceButtonText}</span>
    <FaChevronRight aria-hidden className="shrink-0 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
  </a>
);

const PackagesTable = ({ onGetBrochure }) => (
  <div>
    {/* Desktop / tablet: comparison grid in the brochure's style */}
    <div className="hidden md:grid grid-cols-[minmax(120px,190px)_1fr_1fr] gap-x-6">
      <div />
      {packages.map((pkg) => (
        <div
          key={pkg.key}
          className={`border-2 ${tone[pkg.key].border} px-6 py-5 font-epilogue font-bold text-2xl lg:text-3xl ${tone[pkg.key].head}`}
        >
          {pkg.name}
        </div>
      ))}

      {tableRows.map((row, i) => {
        const last = i === tableRows.length - 1;
        return (
          <div key={row.label} className="contents">
            <div className="py-5 pr-1 text-right font-epilogue font-bold text-base lg:text-lg self-center">{row.label}</div>
            {packages.map((pkg) => (
              <div
                key={pkg.key}
                className={`border-x-2 ${tone[pkg.key].border} ${last ? "border-b-2" : ""} ${
                  i > 0 ? "border-t border-t-black/10" : ""
                } px-6 py-5 flex items-center text-base lg:text-lg leading-snug break-words`}
              >
                {row[pkg.key]}
              </div>
            ))}
          </div>
        );
      })}

      <div className="pt-6 text-right font-epilogue font-bold text-base lg:text-lg self-center">Price</div>
      {packages.map((pkg) => (
        <div key={pkg.key} className="pt-6">
          <PriceButton pkg={pkg} onGetBrochure={onGetBrochure} className="h-full" />
        </div>
      ))}
    </div>

    {/* Mobile: one card per package, so nothing ever needs to scroll sideways */}
    <div className="md:hidden space-y-8">
      {packages.map((pkg) => (
        <article key={pkg.key} className={`border-2 ${tone[pkg.key].border} bg-white`}>
          <h3 className={`px-5 py-4 font-epilogue font-bold text-2xl text-white ${tone[pkg.key].bar}`}>{pkg.name}</h3>
          <dl>
            {tableRows.map((row) => (
              <div key={row.label} className="px-5 py-4 border-t border-black/10 first:border-t-0">
                <dt className="font-dm text-xs font-bold uppercase tracking-wider text-black/60">{row.label}</dt>
                <dd className="mt-1 text-base leading-snug break-words">{row[pkg.key]}</dd>
              </div>
            ))}
          </dl>
          <PriceButton pkg={pkg} onGetBrochure={onGetBrochure} />
        </article>
      ))}
    </div>

    <p className="mt-6 text-center text-sm text-black/60">{smallPrint}</p>

    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
      <p className="font-epilogue font-bold text-xl md:text-2xl">{tableCta.text}</p>
      <a
        href="#brochure"
        onClick={(e) => {
          e.preventDefault();
          onGetBrochure();
        }}
        className="inline-flex items-center justify-center gap-2 border border-brand h-12 px-8 text-base font-bold text-brand w-fit transition-colors duration-200 hover:bg-brand hover:text-white"
      >
        {tableCta.button}
      </a>
    </div>
  </div>
);

export default PackagesTable;
