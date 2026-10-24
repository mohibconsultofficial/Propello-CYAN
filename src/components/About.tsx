import { UserCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import PropelloLogo from './PropelloLogo';

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ABOUT PROPELLO.ONLINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Websites Built for Contractors. <br className="hidden sm:inline" />Not Agency Committees.
          </h2>
        </div>

        {/* Narrative & Founder Block — Human, Concise, Real */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Direct, Confident Copy */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base leading-relaxed font-sans">
            <p className="text-lg text-white font-medium leading-relaxed">
              PROPELLO.ONLINE builds websites for contractors and trade specialists who need an authoritative digital presence without the complexity, delays, and bloated overhead of traditional agencies.
            </p>

            <p className="text-zinc-400">
              Most agency engagements take months, charge $5,000 to $10,000 upfront, and pass you between account coordinators who have never been on a job site. We took the opposite approach: a streamlined, collaborative process where founder Mo Radford works directly with you, delivering a functional, interactive prototype to your phone for review before launch.
            </p>

            <p className="text-zinc-400">
              Whether you specialize in commercial roofing, HVAC, electrical, excavation, landscaping, plumbing, or general contracting, your website should load instantly, look unmistakably professional, and convert local property owners and GCs into scheduled estimates.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct Founder Collaboration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Client Domain Ownership</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Long-Term Lock-in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Prototype Review Before Launch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Channel Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel-deep rounded-2xl p-8 sm:p-10 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.12)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_45px_rgba(6,182,212,0.28)] transition-all duration-300 relative overflow-hidden group cursor-default"
            >
              {/* Immersive ambient inner sheen on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top illuminated cyan highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_8px_#22d3ee]" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                  <div className="group-hover:scale-105 transition-transform">
                    <PropelloLogo size="md" showWordmark={false} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg group-hover:text-cyan-200 transition-colors">
                      Mo Radford
                    </h3>
                    <span className="text-xs font-mono text-cyan-300">
                      Founder, PROPELLO.ONLINE
                    </span>
                  </div>
                </div>

                <blockquote className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans italic border-l-2 border-cyan-400/50 pl-4 group-hover:border-cyan-400 transition-colors">
                  "When you contact PROPELLO.ONLINE, you talk directly with me. No junior coordinators, no outsourced tickets. We build, review, and launch your site right the first time."
                </blockquote>

                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] group-hover:border-cyan-500/30 text-xs font-mono text-zinc-400 space-y-2 transition-colors">
                  <div className="flex items-center justify-between">
                    <span>Specialization</span>
                    <span className="text-white">Contractors & Trades</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Standard Model</span>
                    <span className="text-cyan-300 font-semibold">$1,500 + $97/mo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Review Phase</span>
                    <span className="text-white">Working Prototype</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
