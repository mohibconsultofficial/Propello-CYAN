import { Phone, Mail, UserCheck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import PropelloLogo from './PropelloLogo';

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ABOUT PROPELLO.ONLINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
            Websites built for businesses. Not agency committees.
          </h2>
        </div>

        {/* Narrative & Founder Block — Human, Concise, Real */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Direct, Confident Copy (Zero Filler) */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base leading-relaxed font-sans">
            <p className="text-lg text-white font-medium leading-relaxed">
              Propello builds websites for businesses that need a serious online presence without dealing with the complexity, delays, and bloated process associated with traditional agencies.
            </p>

            <p className="text-zinc-400">
              Most agency engagements take months, cost thousands in upfront deposits, and involve multiple account coordinators who know nothing about your business. We took the opposite approach: a streamlined process where founder Mo Radford works directly with you, delivering a functional, interactive prototype to your smartphone in 48 hours.
            </p>

            <p className="text-zinc-400">
              Whether you run a medical clinic, restaurant, law practice, construction company, or local service business, your website should load instantly, look unmistakably professional, and turn visitors into paying customers. That is what we build.
            </p>
          </div>

          {/* Right Column: Founder Channel Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-deep rounded-xl p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.12)] relative">
              {/* Top illuminated cyan highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/[0.08]">
                <PropelloLogo size="md" showWordmark={false} />
                <div>
                  <h3 className="font-display font-semibold text-white text-base">
                    Mo Radford
                  </h3>
                  <span className="text-xs font-mono text-cyan-300">
                    Founder, Propello
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                "When you contact Propello, you talk directly with me. No junior coordinators, no outsourced tickets. We build and launch your site right the first time."
              </p>

              {/* Direct Founder Access Links */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+14099655019"
                  target="_top"
                  rel="noopener noreferrer"
                  className="btn-call-glowing w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 font-display font-bold text-xs sm:text-sm cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.6)] group"
                >
                  <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>Call Direct: +1 (409) 965-5019</span>
                </a>

                <a
                  href="mailto:mo.radford@propellonline.com"
                  className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-colors text-xs font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>mo.radford@propellonline.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
