import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '120px 0px 120px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full relative z-10 select-none ${className}`}>
      {/* Unified Industrial Niche Ticker Chassis */}
      <div className="w-full border-y border-white/[0.08] bg-zinc-950/85 backdrop-blur-md relative overflow-hidden py-3 sm:py-3.5">
        
        {/* Subtle Ambient Backlight Glow inside chassis */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-8 bg-cyan-500/5 blur-2xl pointer-events-none" />

        {/* Small, Elegant Heading Bar - Unified Directly Above the Marquee */}
        {badgeTitle && (
          <div className="w-full max-w-2xl mx-auto px-4 mb-2.5 sm:mb-3 flex items-center justify-center gap-2.5 sm:gap-4 relative z-10">
            <div className="h-[1px] flex-1 max-w-[36px] sm:max-w-[70px] bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-400/60" />
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-zinc-300">
                {badgeTitle}
              </span>
            </div>
            <div className="h-[1px] flex-1 max-w-[36px] sm:max-w-[70px] bg-gradient-to-l from-transparent via-cyan-500/30 to-cyan-400/60" />
          </div>
        )}

        {/* Left & Right Edge Gradient Shields for Seamless Visual Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#030508] via-[#030508]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#030508] via-[#030508]/90 to-transparent z-10 pointer-events-none" />

        {/* Twin-Element React Infinite Scroll Architecture (Mathematically 100% Gapless) */}
        <div className="flex w-full overflow-hidden">
          {/* Twin Track 1 */}
          <div 
            className="animate-twin-loop flex items-center shrink-0"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
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
          <div 
            className="animate-twin-loop flex items-center shrink-0" 
            aria-hidden="true"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
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
          <div 
            className="animate-twin-loop flex items-center shrink-0" 
            aria-hidden="true"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
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
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
