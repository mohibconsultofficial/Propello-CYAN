import { Phone, Code2, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'CALL',
      subtitle: 'Tell us what you need',
      desc: 'A quick 5-minute call to cover your business, services, and target customers. No endless questionnaires or discovery workshops.',
      icon: <Phone className="w-5 h-5 text-cyan-400" />
    },
    {
      num: '02',
      title: 'BUILD',
      subtitle: 'We design and build the website',
      desc: 'Within 48 hours, we send you an interactive, live staging prototype directly to your phone. Test the speed, layout, and click-to-call dialers.',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />
    },
    {
      num: '03',
      title: 'LAUNCH',
      subtitle: 'Your website goes live',
      desc: 'Upon your approval, we link your domain, enable secure cloud hosting, and keep your site updated with ongoing hands-off maintenance.',
      icon: <Rocket className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Ambient background glow field */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[450px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
            Three simple steps to your new website.
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed font-sans">
            No bloated meetings or drawn-out agency timelines. From initial call to testable prototype in 48 hours.
          </p>
        </div>

        {/* 3 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel-interactive rounded-xl p-8 flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Top illuminated cyan highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/[0.1] group-hover:border-cyan-400/50 flex items-center justify-center transition-colors shadow-sm">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    Step {step.num}
                  </span>
                </div>

                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                  {step.title}
                </div>

                <h3 className="text-xl font-display font-semibold text-white mb-3 tracking-tight group-hover:text-cyan-200 transition-colors">
                  {step.subtitle}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Phase {step.num}</span>
                <span className="text-cyan-400 font-semibold">{step.num === '02' ? '48-Hr Delivery' : 'Zero Friction'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Prompt Below Process */}
        <div className="glass-panel-deep rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/[0.08]">
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-1">
              Ready to start Step 01?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans">
              Talk directly with founder Mo Radford. Takes 5 minutes to outline your project.
            </p>
          </div>

          <a
            href="tel:+14099655019"
            target="_top"
            rel="noopener noreferrer"
            className="btn-call-glowing font-display font-bold text-xs sm:text-sm rounded-xl px-7 py-3.5 flex items-center gap-2.5 shrink-0 cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.6)] group"
          >
            <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Call Now: +1 (409) 965-5019</span>
          </a>
        </div>

      </div>
    </section>
  );
}
