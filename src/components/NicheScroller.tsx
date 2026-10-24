interface NicheScrollerProps {
  className?: string;
  badgeTitle?: string;
}

const CONTRACTOR_NICHES = [
  'Fence Contractors',
  'Deck Builders',
  'Garage Door Contractors',
  'Gutter Contractors',
  'Pool Builders',
  'Excavation',
  'Land Clearing',
  'Demolition',
  'Grading & Earthwork',
  'Site Preparation',
  'Asphalt Paving',
  'Concrete Contractors',
  'Drainage Contractors',
  'Septic Services',
  'Utility Contractors',
  'Retaining Walls',
  'Roofing',
  'Tree Services',
  'Landscaping',
  'Forestry & Timber',
  'Hauling & Trucking',
  'Equipment Rental',
  'General Contracting',
  'Commercial Construction',
  'Dirt Work',
  'Road Construction',
  'Hardscaping',
  'Foundation Contractors'
];

export default function NicheScroller({ 
  className = '',
  badgeTitle = 'Tailored specifically for industrial trades & specialty contractors'
}: NicheScrollerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Subheader Badge */}
      {badgeTitle && (
        <div className="w-full px-4 sm:px-6 mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-zinc-950/70 text-[11px] font-mono tracking-wider uppercase text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span>{badgeTitle}</span>
          </div>
        </div>
      )}

      {/* Full-Viewport Edge-to-Edge Marquee Bar (Spans 100% of screen width from border to border) */}
      <div className="w-full overflow-hidden py-3.5 border-y border-white/[0.08] bg-zinc-950/80 backdrop-blur-md select-none relative">
        
        {/* Left & Right Edge Gradient Shields for Seamless Visual Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#030508] via-[#030508]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#030508] via-[#030508]/90 to-transparent z-10 pointer-events-none" />

        {/* Twin-Element React Infinite Scroll Architecture (Mathematically 100% Gapless) */}
        <div className="flex w-full overflow-hidden">
          {/* Twin Track 1 */}
          <div className="animate-twin-loop flex items-center shrink-0">
            {CONTRACTOR_NICHES.map((niche, index) => (
              <div
                key={`t1-${niche}-${index}`}
                className="flex items-center shrink-0 px-5 sm:px-7 py-1 cursor-default"
              >
                <span className="text-xs sm:text-sm font-display font-medium text-zinc-300 hover:text-cyan-300 transition-colors tracking-wide whitespace-nowrap">
                  {niche}
                </span>
                <span className="ml-5 sm:ml-7 w-1.5 h-1.5 rounded-full bg-cyan-400/40 hover:bg-cyan-400 transition-colors shadow-[0_0_6px_rgba(6,182,212,0.6)] shrink-0" />
              </div>
            ))}
          </div>

          {/* Twin Track 2 (Identical Twin Element placed adjacent to Track 1) */}
          <div className="animate-twin-loop flex items-center shrink-0" aria-hidden="true">
            {CONTRACTOR_NICHES.map((niche, index) => (
              <div
                key={`t2-${niche}-${index}`}
                className="flex items-center shrink-0 px-5 sm:px-7 py-1 cursor-default"
              >
                <span className="text-xs sm:text-sm font-display font-medium text-zinc-300 hover:text-cyan-300 transition-colors tracking-wide whitespace-nowrap">
                  {niche}
                </span>
                <span className="ml-5 sm:ml-7 w-1.5 h-1.5 rounded-full bg-cyan-400/40 hover:bg-cyan-400 transition-colors shadow-[0_0_6px_rgba(6,182,212,0.6)] shrink-0" />
              </div>
            ))}
          </div>

          {/* Twin Track 3 (Guarantees zero gap on ultrawide 4K monitors) */}
          <div className="animate-twin-loop flex items-center shrink-0" aria-hidden="true">
            {CONTRACTOR_NICHES.map((niche, index) => (
              <div
                key={`t3-${niche}-${index}`}
                className="flex items-center shrink-0 px-5 sm:px-7 py-1 cursor-default"
              >
                <span className="text-xs sm:text-sm font-display font-medium text-zinc-300 hover:text-cyan-300 transition-colors tracking-wide whitespace-nowrap">
                  {niche}
                </span>
                <span className="ml-5 sm:ml-7 w-1.5 h-1.5 rounded-full bg-cyan-400/40 hover:bg-cyan-400 transition-colors shadow-[0_0_6px_rgba(6,182,212,0.6)] shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded CSS for guaranteed hardware-accelerated twin-element infinite loop */}
      <style>{`
        @keyframes twinScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .animate-twin-loop {
          animation: twinScrollLeft 40s linear infinite !important;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
