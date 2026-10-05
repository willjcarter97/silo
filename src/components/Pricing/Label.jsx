// Small tilted tag used for section labels, matching the Silo packages brochure.
const Label = ({ children, tone = "red", className = "" }) => (
  <span
    className={`inline-block -rotate-2 px-2.5 py-1 font-dm font-bold text-sm md:text-base lowercase ${
      tone === "red" ? "bg-brand text-white" : "bg-white text-black"
    } ${className}`}
  >
    {children}
  </span>
);

export default Label;
