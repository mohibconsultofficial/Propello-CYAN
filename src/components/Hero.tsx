import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import PropelloLogo from './PropelloLogo';
import NicheScroller from './NicheScroller';

interface HeroProps {
  onScrollToOffer?: () => void;
}

export default function Hero({ onScrollToOffer }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-white/[0.08] overflow-hidden">
      
      {/* Focal Ambient Cyan Illumination behind Hero typography */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-cyan-400/10 to-teal-500/5 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header Block */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Eyebrow with Brand Mark */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-zinc-950/80 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-zinc-300 text-xs font-mono tracking-wider uppercase mb-8 backdrop-blur-md"
          >
            <PropelloLogo showWordmark={false} size="sm" />
            <span className="text-white font-medium">Propello</span>
            <span className="text-zinc-500">•</span>
            <span className="text-cyan-300">Websites Engineered for Businesses</span>
          </motion.div>

          {/* Primary Typography - "Your Business Deserves to Stand Out." */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-cursor="header-text"
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08] mb-6 text-center select-none"
          >
            <span className="inline-block">
              {['Your', 'Business', 'Deserves', 'to'].map((word, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.04, 
                    color: '#a5f3fc',
                    textShadow: '0 0 25px rgba(34, 211, 238, 0.6)' 
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="inline-block mr-2.5 sm:mr-3.5 cursor-default transition-colors duration-200"
                >
                  {word}
                </motion.span>
              ))}
            </span>{' '}
            <br className="hidden sm:inline" />
            <motion.span 
              className="relative inline-block group cursor-default mt-1 sm:mt-0"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                transition: { type: 'spring', stiffness: 350, damping: 15 }
              }}
            >
              {/* Distinctive prominent luminous typography */}
              <span className="relative z-10 font-bold sm:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-cyan-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.7)] sm:drop-shadow-[0_0_55px_rgba(6,182,212,0.85)] tracking-tight">
                Stand Out.
              </span>
              {/* Prominent Underline & Ambient Glow Aura */}
              <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] group-hover:h-[3.5px] group-hover:shadow-[0_0_20px_#22d3ee] transition-all duration-300" />
              {/* Backlight focal glow behind Stand Out */}
              <span className="absolute inset-0 bg-cyan-400/20 blur-xl -z-10 opacity-70 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-300" />
            </motion.span>
          </motion.h1>

          {/* Concise Subtext: Clear, No Filler */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-10 max-w-2xl text-center"
          >
            We design, build, and maintain high-performing websites for companies across every industry. Delivered with transparent pricing, rapid turnaround, and zero agency runaround.
          </motion.p>

          {/* Key Value Points Micro-Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400 mb-12"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Rapid Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>$1,500 Complete Package</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>1st Month Hosting Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Zero Contracts or Lock-In</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ELEGANT INFINITE HORIZONTAL NICHE SCROLLER (Completely edge-to-edge from left to right border) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full relative z-10 mt-6 sm:mt-10"
      >
        <NicheScroller />
      </motion.div>

    </section>
  );
}
