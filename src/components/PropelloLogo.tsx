interface PropelloLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PropelloLogo({
  className = '',
  showWordmark = true,
  size = 'md'
}: PropelloLogoProps) {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-xs font-bold tracking-wider',
    md: 'text-sm font-bold tracking-wider',
    lg: 'text-base font-extrabold tracking-widest'
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Precision Electric Bolt Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconSizes[size]} text-cyan-400 shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]`}
          aria-hidden="true"
        >
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="url(#cyanBoltGrad)"
            stroke="#67e8f9"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cyanBoltGrad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-display text-white tracking-wider uppercase ${textSizes[size]}`}>
          PROPELLO.ONLINE
        </span>
      )}
    </div>
  );
}
