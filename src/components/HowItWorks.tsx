import { Phone, Code2, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVERY',
      subtitle: '5-Minute Project Outline',
      desc: 'Connect directly with founder Mo Radford to cover your trade, core services, project photos, and target service area. No complex questionnaires or agency runaround.',
      icon: <Phone className="w-5 h-5 text-cyan-400" />
    },
    {
      num: '02',
      title: 'PROTOTYPE',
      subtitle: 'A Working Prototype for Your Review',
      desc: 'Review the proposed website before launch. Once the scope and required materials are confirmed, we agree on the implementation timeline and work with you through approval and launch.',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />
    },
    {
      num: '03',
      title: 'LAUNCH',
      subtitle: 'Approval, Domain Setup & Launch',
      desc: 'You test the navigation, speed, and quote forms on your phone. Upon your feedback and approval, we point your domain, activate SSL, and manage ongoing maintenance.',
      icon: <Rocket className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-36 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Ambient background glow field */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[450px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            A Clear, Collaborative Process <br className="hidden sm:inline" />From Start to Finish.
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed font-sans max-w-2xl">
            No bloated agency committees or drawn-out timelines. From discovery call to a working prototype for your review.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -7, transition: { duration: 0.25, ease: 'easeOut' } }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel-deep rounded-2xl p-8 sm:p-9 flex flex-col justify-between relative group overflow-hidden border border-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.22)] hover:bg-zinc-950/90 transition-all duration-300 cursor-default"
            >
              {/* Immersive ambient inner cyan sheen on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top illuminated cyan highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#22d3ee]" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full font-semibold shadow-[0_0_10px_rgba(6,182,212,0.15)] group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-300">
                    Step {step.num}
                  </span>
                </div>

                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  {step.title}
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-cyan-200 transition-colors">
                  {step.subtitle}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Phase {step.num}</span>
                <span className="text-cyan-400 font-semibold">{step.num === '02' ? 'Interactive Review' : 'Founder Managed'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
