interface NicheScrollerProps {
  className?: string;
}

const NICHES = [
  'Restaurants & Bars',
  'Real Estate',
  'Roofing & Exteriors',
  'Construction & Contractors',
  'Law Firms & Legal',
  'Dental Practices',
  'Medical & Clinics',
  'Automotive & Detailing',
  'Landscaping & Tree Care',
  'Plumbing',
  'HVAC & Climate Control',
  'Electrical Services',
  'Commercial Cleaning',
  'Home Services',
  'Fitness & Gyms',
  'Beauty & Salons',
  'Hospitality & Lodging',
  'Retail & Boutiques',
  'Consulting Agencies',
  'Manufacturing',
  'Logistics & Freight',
  'Professional Services',
  'Accounting & Financial'
];

export default function NicheScroller({ className = '' }: NicheScrollerProps) {
  // Duplicate array for seamless infinite scroll
  const duplicatedNiches = [...NICHES, ...NICHES];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Editorial Subheader */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-zinc-950/60 text-[11px] font-mono tracking-wider uppercase text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span>Whatever the business, we build the website</span>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Container with Fading Edge Masks */}
      <div className="relative w-full overflow-hidden py-3 border-y border-white/[0.06] bg-zinc-950/40 backdrop-blur-sm">
        
        {/* Left & Right Gradient Shadows for seamless visual fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#030508] via-[#030508]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#030508] via-[#030508]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="animate-infinite-scroll flex items-center">
          {duplicatedNiches.map((niche, index) => (
            <div
              key={index}
              className="flex items-center shrink-0 px-4 sm:px-6 py-1.5 group cursor-default"
            >
              <span className="text-xs sm:text-sm font-display font-medium text-zinc-300 group-hover:text-cyan-300 transition-colors tracking-wide">
                {niche}
              </span>
              <span className="ml-4 sm:ml-6 w-1 h-1 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors shadow-[0_0_4px_rgba(6,182,212,0.6)]" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
