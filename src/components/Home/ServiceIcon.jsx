// Small geometric service marks in the brand red and black, drawn after Nic's October homepage design.
// They are approximations of the design file: swap in Nic's exported SVGs here if exact artwork is wanted.
const RED = "#FF322E";

const ICONS = {
  // Target with the Silo corner triangle
  strategy: (
    <>
      <circle cx="16" cy="24" r="11" fill="none" stroke="#000" strokeWidth="2" />
      <circle cx="16" cy="24" r="5" fill={RED} />
      <path d="M26 2h12v12z" fill="#000" />
    </>
  ),
  // Red circle meeting an outlined square
  identity: (
    <>
      <rect x="15" y="15" width="22" height="22" fill="none" stroke="#000" strokeWidth="2" />
      <circle cx="14" cy="14" r="11" fill={RED} />
      <rect x="15" y="15" width="8" height="8" fill="#000" />
    </>
  ),
  // Stacked screens with a red panel
  uiux: (
    <>
      <rect x="4" y="4" width="22" height="18" fill="none" stroke="#000" strokeWidth="2" />
      <rect x="14" y="16" width="22" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="14" y="16" width="11" height="9" fill={RED} />
      <circle cx="25" cy="30" r="2" fill="#000" />
    </>
  ),
  // Code brackets as diamonds around a red point
  web: (
    <>
      <path d="M2 20 12 8v24z" fill="#000" />
      <circle cx="20" cy="20" r="6" fill={RED} />
      <path d="M38 20 28 8v24z" fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="miter" />
    </>
  ),
};

const ServiceIcon = ({ name, className = "w-10 h-10" }) => {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      {icon}
    </svg>
  );
};

export default ServiceIcon;
