import { Sparkles, Check, X, Shield, PhoneCall, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function OwnerDashboard() {
  return (
    <section id="offer-section" className="py-24 lg:py-32 relative bg-[#05040a] border-b border-white/[0.06] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">

        {/* MILLION-DOLLAR PRICING SECTION */}
        <div className="text-left mb-24">
          
          {/* Module Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 px-4">
            <span className="text-[10px] font-mono font-black tracking-widest text-purple-400 bg-purple-950/40 border border-purple-500/20 px-3.5 py-1.5 rounded-full uppercase flex items-center justify-center gap-2 mx-auto w-fit">
              <Shield className="w-3.5 h-3.5" /> Direct Partnership Offer
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mt-5 leading-[1.1] uppercase">
              Stop Overpaying <br />For Weak Results.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium font-sans mt-4 leading-relaxed max-w-2xl mx-auto">
              Traditional agencies want $5,000+ upfront and 6 months to build a site. We build your entire digital footprint for a fraction of the cost, and you see the draft before you pay a dime.
            </p>
          </div>

          {/* Pricing Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Column A: Propello */}
            <div className="relative border border-purple-500/30 bg-[#0e0a1b]/80 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(168,85,247,0.15)] overflow-hidden backdrop-blur-3xl transform lg:-translate-y-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute top-0 left-0 bg-purple-600 h-1.5 w-full" />
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono font-black tracking-wider text-purple-400 bg-purple-950/50 border border-purple-500/20 px-3 py-1 rounded-lg uppercase">
                    The Done-For-You System
                  </span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/10 flex items-center gap-1.5 select-none font-sans uppercase animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> High ROI
                  </span>
                </div>
                
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none mb-2 uppercase">
                  Contractor Growth Plan
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed mb-6 font-sans">
                  Everything you need to look professional, rank local, and convert leads. Fast turnaround.
                </p>

                {/* Big Price Tag */}
                <div className="bg-slate-950/50 border border-white/[0.04] rounded-2xl p-5 mb-8 flex flex-wrap items-baseline justify-center sm:justify-start gap-1 shadow-inner">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white">$500</span>
                  <span className="text-slate-400 text-xs font-mono ml-1 uppercase">upfront</span>
                  <span className="text-slate-500 text-lg mx-3 select-none">/</span>
                  <span className="text-3xl sm:text-4.5xl font-display font-black text-purple-400">$97</span>
                  <span className="text-slate-400 text-xs font-mono ml-1 uppercase">per month</span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans">
                    <div className="bg-emerald-950/50 text-emerald-400 p-1 rounded-lg border border-emerald-500/20 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-white uppercase tracking-wide">Premium Custom Website</strong>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-normal leading-relaxed">Designed specifically for your trade. Fast, mobile-first, and SEO structured.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans">
                    <div className="bg-emerald-950/50 text-emerald-400 p-1 rounded-lg border border-emerald-500/20 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-white uppercase tracking-wide">Lead Capture & Routing</strong>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-normal leading-relaxed">Forms and tap-to-call buttons that instantly notify your phone.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans">
                    <div className="bg-emerald-950/50 text-emerald-400 p-1 rounded-lg border border-emerald-500/20 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-white uppercase tracking-wide">Secure Hosting & Maintenance</strong>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-normal leading-relaxed">We handle all the technical updates, SSL certificates, and server speed.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans">
                    <div className="bg-emerald-950/50 text-emerald-400 p-1 rounded-lg border border-emerald-500/20 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-white uppercase tracking-wide">Unlimited Text Updates</strong>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-normal leading-relaxed">Need to add a new service or change a photo? Text us, we do it.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA dialer */}
              <div className="pt-6 border-t border-white/[0.06]">
                <a 
                  href="tel:+14097976986"
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white font-bold py-4.5 rounded-2xl flex items-center justify-center gap-2.5 transition duration-300 shadow-xl shadow-purple-500/20 hover:duration-100 font-display text-sm tracking-wide shrink-0 cursor-pointer transform hover:-translate-y-0.5 uppercase"
                >
                  <PhoneCall className="w-4.5 h-4.5 text-purple-200" />
                  <span>Call +1 (409) 797-6986</span>
                </a>
              </div>
            </div>

            {/* Column B: Traditional Agency */}
            <div className="border border-white/[0.05] bg-slate-950/40 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between relative backdrop-blur-md">
              <div className="absolute top-0 left-0 bg-slate-800 h-1.5 w-full" />
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono font-black tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg uppercase">
                    Traditional Agency
                  </span>
                  <span className="text-[10px] text-rose-400 font-bold bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-500/15 uppercase">
                    High Risk
                  </span>
                </div>
                
                <h3 className="font-display font-black text-2xl text-slate-300 tracking-tight leading-none mb-2 uppercase">
                  Legacy Agency Model
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans">
                  The outdated scheme requiring huge upfront capital, slow timelines, and endless hourly retainers.
                </p>

                {/* Distorted high price tag */}
                <div className="bg-[#120f18]/50 border border-white/[0.02] rounded-2xl p-5 mb-8 flex flex-wrap items-baseline justify-center sm:justify-start gap-1 text-slate-400">
                  <span className="text-3xl sm:text-4xl font-display font-medium text-slate-300">$5,000+</span>
                  <span className="text-slate-500 text-xs font-mono ml-1 uppercase">upfront</span>
                  <span className="text-slate-600 text-sm mx-2 select-none">/</span>
                  <span className="text-2xl sm:text-3xl font-display font-medium text-slate-300">$300+</span>
                  <span className="text-slate-500 text-xs font-mono ml-1 uppercase">monthly</span>
                </div>

                {/* Critical Failures list */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-400">
                    <div className="bg-rose-950/30 text-rose-400 p-1 rounded-lg border border-rose-500/10 mt-0.5 shrink-0">
                      <X className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-slate-300 uppercase tracking-wide">Weeks or Months to Launch</strong>
                      <p className="text-[11px] text-slate-500 mt-1 font-normal leading-relaxed">Endless meetings and delays before your site ever sees the light of day.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-400">
                    <div className="bg-rose-950/30 text-rose-400 p-1 rounded-lg border border-rose-500/10 mt-0.5 shrink-0">
                      <X className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-slate-300 uppercase tracking-wide">Year-Long Locked Contracts</strong>
                      <p className="text-[11px] text-slate-500 mt-1 font-normal leading-relaxed">Trapped in a 12-month retainer regardless of the actual results.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-400">
                    <div className="bg-rose-950/30 text-rose-400 p-1 rounded-lg border border-rose-500/10 mt-0.5 shrink-0">
                      <X className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <strong className="text-slate-300 uppercase tracking-wide">$150/hr for Minor Updates</strong>
                      <p className="text-[11px] text-slate-500 mt-1 font-normal leading-relaxed">Charged extra just to change a photo or update a paragraph.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom traditional details */}
              <div className="pt-6 border-t border-slate-900 text-center font-sans">
                <span className="text-slate-500 text-xs block font-bold uppercase tracking-widest">Legacy Burden</span>
                <p className="text-slate-600 text-[10px] mt-1 uppercase">High risk, low speed.</p>
              </div>
            </div>

          </div>
        </div>

        {/* RISK REVERSAL GUARANTEE SECTION */}
        <div className="max-w-4xl mx-auto bg-slate-950/60 border border-purple-500/20 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent pointer-events-none" />
          
          <div className="flex justify-center mb-6 relative z-10">
            <div className="bg-purple-950/50 p-4 rounded-2xl border border-purple-500/30">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight relative z-10">
            Our "See It First" Guarantee
          </h3>
          
          <p className="text-slate-300 text-sm sm:text-lg font-medium leading-relaxed mb-8 max-w-2xl mx-auto relative z-10 font-sans">
            We are so confident in our system that we build your website draft <strong>before you pay anything</strong>. You get a live link to interact with it directly on your phone. If you don't like it, you walk away. Zero risk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 relative z-10 text-xs sm:text-sm font-mono text-purple-300 uppercase font-bold tracking-widest">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              No Long-Term Contracts
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Rapid Turnaround
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
