import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import PropelloLogo from './PropelloLogo';
import NicheScroller from './NicheScroller';

interface HeroProps {
  onScrollToOffer: () => void;
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

          {/* Primary Typography - Crystal Clear & Confident */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08] mb-6 text-center"
          >
            High-quality websites <br className="hidden sm:inline" />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_0_30px_rgba(6,182,212,0.35)]">
                built for your business.
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
            </span>
          </motion.h1>

          {/* Concise Subtext: Clear, No Filler */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-10 max-w-2xl text-center"
          >
            We design, build, and maintain high-performing websites for companies across every industry. Delivered in 48 hours with transparent pricing and zero agency runaround.
          </motion.p>

          {/* Primary Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto mb-14"
          >
            <a
              href="tel:+14099655019"
              target="_top"
              rel="noopener noreferrer"
              id="hero-call-cta"
              className="btn-call-glowing font-display font-bold text-sm sm:text-base rounded-xl px-8 py-4 flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(6,182,212,0.65)] group"
            >
              <div className="w-6 h-6 rounded-full bg-slate-950/20 flex items-center justify-center">
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
              </div>
              <span>Call Propello: +1 (409) 965-5019</span>
            </a>

            <button
              onClick={onScrollToOffer}
              className="border border-white/[0.14] hover:border-cyan-500/50 bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-200 hover:text-white font-display font-medium text-sm transition-all duration-200 rounded-lg px-7 py-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <span>View The Offer</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </motion.div>

          {/* Key Value Points Micro-Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400 mb-12"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>48-Hour Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>$1,500 Complete Build</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>No Contracts or Lock-In</span>
            </div>
          </motion.div>

        </div>

        {/* ELEGANT INFINITE HORIZONTAL NICHE SCROLLER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-4"
        >
          <NicheScroller />
        </motion.div>

      </div>
    </section>
  );
}
