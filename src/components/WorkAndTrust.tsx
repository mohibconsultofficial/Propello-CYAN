import { Compass, CheckCircle2, ShieldCheck, Cpu, Layout, FileCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function WorkAndTrust() {
  const pillars = [
    {
      number: '01',
      title: 'Designed Around Your Business',
      icon: Layout,
      summary: 'Tailored architecture reflecting your specific trade, crew, and regional service area.',
      points: [
        'Dedicated pages highlighting each service you offer rather than cramming everything into one generic scroll.',
        'Project portfolio structured to show actual job site craftsmanship, materials, and equipment.',
        'Contact actions engineered for real contractor workflows: fast phone calls on mobile, photo uploads, and estimate intake.',
        'Brand presentation tailored with industrial-grade typography, trade-appropriate colors, and sharp logo treatments.'
      ]
    },
    {
      number: '02',
      title: 'A Complete, Defined Scope',
      icon: FileCheck,
      summary: 'Absolute financial and technical clarity from day one with zero hidden costs.',
      points: [
        'Every deliverable in the $1,500 setup is documented upfront so you know exactly what is being built.',
        'The $97/month service covers enterprise cloud hosting, daily backups, SSL upkeep, and routine content edits.',
        'Clear boundaries: domain ownership remains 100% in your hands, and 3rd-party paid services are never secretly billed.',
        'Review a functional prototype before launch, ensuring scope alignment before public handover.'
      ]
    },
    {
      number: '03',
      title: 'Tested Before Launch',
      icon: Cpu,
      summary: 'Rigorous pre-launch QA across physical devices, forms, and search engine infrastructure.',
      points: [
        'Device verification across iOS Safari, Android Chrome, and desktop screens for flawless touch responsiveness.',
        'Intake verification ensuring quote submissions and click-to-call dialers route directly to your phone and email.',
        'Search engine indexing verification including XML sitemaps, robots directives, and Google Search Console linking.',
        'Performance audits to guarantee sub-second initial loading for property managers and general contractors.'
      ]
    }
  ];

  return (
    <section id="work" className="py-24 lg:py-36 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Background ambient lighting field */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-900/10 rounded-full blur-[170px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>STANDARDS & ACCOUNTABILITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Built With Purpose. <br className="hidden sm:inline" />Delivered With Care.
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed font-sans max-w-2xl">
            From your business's first impression to the final launch checks, every part of the website has a clear purpose. The scope is transparent, the process is understandable, and the finished work is tested before launch.
          </p>
        </div>

        {/* Visually Distinctive 3-Pillar Architectural Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="glass-panel-deep rounded-2xl p-8 sm:p-10 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between relative group shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Subtle electric edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-cyan-400 transition-all duration-300" />

              <div>
                {/* Pillar Header with Monospace Index */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <pillar.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                      Pillar {pillar.number}
                    </span>
                  </div>
                  <span className="text-xl font-display font-bold text-zinc-600 group-hover:text-cyan-400/40 transition-colors">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {pillar.summary}
                </p>

                {/* Specific Concrete Points */}
                <div className="space-y-3.5 pt-2">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-sans">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Trust Indicator */}
              <div className="pt-6 mt-8 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400/60" />
                <span>Verified PROPELLO.ONLINE Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
