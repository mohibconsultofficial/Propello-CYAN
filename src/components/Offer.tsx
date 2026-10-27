import { Phone, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useHoverSupported } from '../utils/useHoverSupported';

export default function Offer() {
  const hasHover = useHoverSupported();
  const offerPoints = [
    'Custom website built specifically for your business and market',
    'First month of hosting for free',
    'Complete Google SEO setup and Search Console configuration',
    'Google Business Profile optimization',
    'Professional brand kit with logo, colors, and typography',
    'Custom social media profile and cover graphics',
    'Google Review Kit with QR code and review-request templates',
    'Automated email notifications for website inquiries and leads',
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
            viewport={{ once: true, amount: 0.05 }}
            whileHover={hasHover ? { y: -5, transition: { duration: 0.25 } } : undefined}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 glass-panel-deep border-2 border-cyan-400/50 hover:border-cyan-400/80 rounded-2xl p-8 sm:p-12 flex flex-col justify-between shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.22)] hover:shadow-[0_28px_85px_rgba(0,0,0,0.9),0_0_65px_rgba(6,182,212,0.32)] ring-1 ring-cyan-400/20 relative overflow-hidden transition-all duration-300"
          >
            {/* Top illuminated cyan highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

            {/* Subtle inner ambient glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10">
              {/* Pricing & Tagline Banner */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase mb-2.5 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>The Complete Package</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-10">
                {offerPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.08] hover:border-cyan-400/50 hover:bg-cyan-950/35 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(6,182,212,0.18)] transition-all duration-200 cursor-default group/pill"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] group-hover/pill:scale-110 group-hover/pill:text-cyan-300 transition-transform" />
                    <span className="leading-snug text-xs sm:text-sm font-medium text-zinc-100">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call CTA Bar */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                href="tel:+14097976986"
                className="btn-call-glowing font-display font-bold text-sm rounded-xl px-8 py-4 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-slate-950/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
                </div>
                <span>Call the owner directly.</span>
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
            viewport={{ once: true, amount: 0.05 }}
            whileHover={hasHover ? { y: -5, transition: { duration: 0.25 } } : undefined}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-4 glass-panel-deep rounded-2xl p-8 flex flex-col justify-between border border-white/[0.08] hover:border-white/[0.2] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.06)] transition-all duration-300 relative overflow-hidden"
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

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-cyan-500/20 text-xs text-zinc-300">
              <span className="text-cyan-300 font-medium block mb-1">The Propello Way:</span>
              Your website is live as a testable prototype on your smartphone rapidly. No meetings. No bloated retainers.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
