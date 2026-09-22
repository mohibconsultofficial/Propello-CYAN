import { Phone, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Offer() {
  const offerPoints = [
    'Custom website built specifically for your business and market',
    'Interactive live prototype delivered to your phone in 48 hours',
    'Mobile-first performance engineered for fast customer calls',
    'Enterprise cloud hosting, SSL security, and automated daily backups',
    'Continuous updates: just call or text us when you need edits',
    'Zero contracts or retainers: pause or cancel anytime without penalty'
  ];

  const agencyFrictions = [
    '$5,000 to $10,000+ bloated upfront deposits',
    '8 to 16 weeks of endless questionnaires and delays',
    'Rigid 12-month lock-in service agreements',
    'Invoiced hourly for simple photo or text updates'
  ];

  return (
    <section id="offer" className="py-24 lg:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Background ambient lighting field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>WHAT WE OFFER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
            One clear offer. Zero agency runaround.
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed font-sans">
            Everything your business needs to establish an authoritative web presence with fast turnaround and predictable pricing.
          </p>
        </div>

        {/* Single Polished Offer Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Offer Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 glass-panel-deep border border-cyan-500/40 rounded-xl p-8 sm:p-12 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            {/* Top illuminated cyan highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div>
              {/* Pricing & Tagline Banner */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider block mb-1">
                    The Complete Package
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
                    Full Custom Website
                  </h3>
                </div>

                <div className="sm:text-right">
                  <div className="flex items-baseline gap-1.5 sm:justify-end">
                    <span className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      $1,500
                    </span>
                    <span className="text-zinc-400 text-xs font-mono uppercase">one-time</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 block mt-1">
                    + $97 / month hands-off care & hosting
                  </span>
                </div>
              </div>

              {/* Offer Core Deliverables */}
              <div className="space-y-4 mb-10">
                {offerPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-sm text-zinc-200">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call CTA Bar */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                href="tel:+14099655019"
                target="_top"
                rel="noopener noreferrer"
                className="btn-cta-illuminated font-display font-semibold text-sm rounded-lg px-8 py-4 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              >
                <Phone className="w-4 h-4 fill-slate-950" />
                <span>Call to Get Started: +1 (409) 965-5019</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 justify-center sm:justify-end">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Review your demo on your phone first</span>
              </div>
            </div>
          </motion.div>

          {/* Side Comparison: Why Traditional Agencies Don't Make Sense */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 glass-panel-deep rounded-xl p-8 flex flex-col justify-between border border-white/[0.08]"
          >
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                The Industry Standard
              </span>
              <h3 className="text-xl font-display font-medium text-zinc-200 mb-2">
                Traditional Web Agencies
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                Why business owners get frustrated with standard agency setups.
              </p>

              <div className="space-y-4 mb-8">
                {agencyFrictions.map((fric, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-zinc-400">
                    <XCircle className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
                    <span>{fric}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-zinc-900/80 border border-cyan-500/20 text-xs text-zinc-300">
              <span className="text-cyan-300 font-medium block mb-1">The Propello Way:</span>
              Your website is live as a testable prototype on your smartphone in 48 hours. No meetings. No bloated retainers.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
