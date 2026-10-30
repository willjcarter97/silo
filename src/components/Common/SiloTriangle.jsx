// The red corner triangle from the Silo mark, used as a graphic accent where photography used to sit.
const SiloTriangle = ({ className = "w-[72px] h-[60px]" }) => (
  <span
    aria-hidden="true"
    className={`block bg-brand ${className}`}
    style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
  />
);

export default SiloTriangle;
