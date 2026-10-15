import { Phone, Mail, Clock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import PropelloLogo from './PropelloLogo';

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-36 relative overflow-hidden">
      
      {/* High-intensity Ambient Cyan Illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-cyan-500/15 to-teal-500/10 rounded-full blur-[170px] pointer-events-none mix-blend-screen" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>START YOUR PROJECT TODAY</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-6xl font-display font-semibold text-white tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
          Ready for a website that works for your business?
        </h2>

        <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto mb-12 font-sans">
          One phone call is all it takes to get started. We will have an interactive, live prototype ready on your phone in 48 hours.
        </p>

        {/* Primary Phone Action Chassis — High Impact, Zero Friction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel-deep border border-cyan-500/50 rounded-2xl p-8 sm:p-14 max-w-3xl mx-auto shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.25)] relative overflow-hidden"
        >
          {/* Top illuminated cyan laser beam */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              <Phone className="w-8 h-8" />
            </div>

            <span className="text-xs sm:text-sm font-mono text-cyan-300 uppercase tracking-widest mb-2">
              Primary Direct Contact
            </span>

            {/* Direct Dial Number Display */}
            <a
              href="tel:+14099655019"
              target="_top"
              rel="noopener noreferrer"
              className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight hover:text-cyan-300 transition-colors mb-6 block drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            >
              +1 (409) 965-5019
            </a>

            {/* Primary Tap-to-Call Button */}
            <a
              href="tel:+14099655019"
              target="_top"
              rel="noopener noreferrer"
              className="btn-call-glowing w-full sm:w-auto font-display font-bold text-base sm:text-xl rounded-2xl px-12 py-5 flex items-center justify-center gap-3.5 cursor-pointer shadow-[0_0_50px_rgba(6,182,212,0.75)] mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center">
                <Phone className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
              </div>
              <span>Call Propello Now: +1 (409) 965-5019</span>
            </a>

            {/* Key Reassurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Talk with Mo Radford</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>5-Minute Quick Chat</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>No Sales Pressure</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Secondary, Understated Email Alternative */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-400 font-mono">
            Prefer to write first? Email us at{' '}
            <a
              href="mailto:mo.radford@propellonline.com"
              className="text-zinc-300 hover:text-cyan-300 underline underline-offset-4 transition-colors"
            >
              mo.radford@propellonline.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
