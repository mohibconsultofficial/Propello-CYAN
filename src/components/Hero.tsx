import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import NicheScroller from './NicheScroller';

interface HeroProps {
  onScrollToOffer?: () => void;
}

export default function Hero({ onScrollToOffer }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { margin: '100px 0px 100px 0px' });

  return (
    <section ref={sectionRef} className="relative pt-28 pb-4 sm:pt-36 sm:pb-6 lg:pt-40 lg:pb-8 border-b border-white/[0.08] overflow-hidden flex flex-col justify-between min-h-[88vh] min-h-[88svh] min-h-[88dvh] sm:min-h-[92vh] sm:min-h-[92svh] sm:min-h-[92dvh]">
      
      {/* Focal Ambient Cyan Illumination behind Hero typography */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-cyan-500/18 via-cyan-400/12 to-teal-500/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* Precision Decorative HUD Watermarks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative border-x border-white/[0.04]">
          <div className="absolute top-8 left-4 text-[9px] font-mono text-cyan-400/40 uppercase tracking-widest hidden sm:flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            PROPELLO.ONLINE
          </div>
          <div className="absolute top-8 right-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
            DIRECT FOUNDER DEPLOYMENT
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        
        {/* Main Hero Header Block - Centered and Harmonious */}
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">

          {/* Primary Typography - Exactly 2 lines on desktop, Stand Out visually dominant */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-cursor="header-text"
            className="flex flex-col items-center text-center select-none mb-7 sm:mb-10 lg:mb-12"
          >
            {/* Line 1: "Websites built for" - Unbroken on desktop, with continuous moving theme-colored cyan light flowing INSIDE the letters */}
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.75rem] font-display font-bold tracking-tight leading-[1.08] md:whitespace-nowrap text-transparent bg-clip-text select-none"
              style={{
                backgroundImage:
                  'linear-gradient(110deg, #f8fafc 0%, #cffafe 18%, #22d3ee 32%, #ffffff 46%, #06b6d4 58%, #a5f3fc 74%, #bae6fd 88%, #f8fafc 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={isInView ? {
                backgroundPosition: ['0% 0%', '-200% 0%'],
              } : undefined}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              Websites built for
            </motion.span>

            {/* Line 2: "Contractors" - Prominent luminous gradient, glow aura, and underline */}
            <motion.span 
              className="relative inline-block group cursor-default mt-1 sm:mt-2"
              whileHover={{ 
                scale: 1.04, 
                y: -3,
                transition: { type: 'spring', stiffness: 350, damping: 15 }
              }}
            >
              {/* Distinctive prominent luminous typography */}
              <span className="relative z-10 block font-display font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-[4.85rem] xl:text-[5.85rem] leading-[1.06] text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-cyan-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.7)] sm:drop-shadow-[0_0_55px_rgba(6,182,212,0.85)] tracking-tight">
                Contractors
              </span>
              {/* Prominent Underline & Ambient Glow Aura */}
              <span className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-[2.5px] sm:h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] group-hover:h-[4px] group-hover:shadow-[0_0_24px_#22d3ee] transition-all duration-300" />
              {/* Backlight focal glow behind Contractors */}
              <span className="absolute inset-0 bg-cyan-400/25 blur-xl sm:blur-2xl -z-10 opacity-75 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-300" />
            </motion.span>
          </motion.h1>

          {/* Concise Subtext: Positioned exactly in the middle between header text and niche ticker */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed tracking-wide sm:whitespace-nowrap text-center max-w-none"
          >
            High-performing custom websites engineered to win more high-value jobs.
          </motion.p>
        </div>
      </div>

      {/* ELEGANT INFINITE HORIZONTAL NICHE SCROLLER (Positioned near the end of the frame, paired with heading bubble) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full relative z-10 mt-7 sm:mt-10 lg:mt-12"
      >
        <NicheScroller badgeTitle="Tailored specifically for industrial trades & specialty contractors" />
      </motion.div>

    </section>
  );
}
