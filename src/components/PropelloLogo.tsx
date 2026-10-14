import { motion } from 'motion/react';

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
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Corporate Precision Bolt Brand Mark */}
      <div className="relative flex items-center justify-center">
        {/* Subtle breathing ambient halo */}
        <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full pointer-events-none" />

        <svg
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconSizes[size]} text-cyan-400 relative z-10 animate-bolt-glow transition-transform duration-300 group-hover:scale-105`}
        >
          <defs>
            <linearGradient id="propelloBoltGrad" x1="4" y1="2" x2="24" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="45%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="propelloBoltEdge" x1="6" y1="2" x2="22" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Geometric Precision Architectural Bolt Facet */}
          <path
            d="M17.5 2L5.5 16.5H13.8L9.5 30L22.5 14H14.5L17.5 2Z"
            fill="url(#propelloBoltGrad)"
            stroke="url(#propelloBoltEdge)"
            strokeWidth="1.2"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
          />

          {/* Internal specular facet accent for corporate dimension */}
          <path
            d="M17.2 3.8L8.2 15.5H14L10.8 26L20.2 14.8H14.2L17.2 3.8Z"
            fill="#ffffff"
            fillOpacity="0.18"
          />
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-display font-bold tracking-wider text-white whitespace-nowrap ${textSizes[size]}`}>
          PROPELLO.ONLINE
        </span>
      )}
    </div>
  );
}
