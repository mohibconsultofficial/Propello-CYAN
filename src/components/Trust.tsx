import { AlertTriangle, HardHat, TrendingDown, EyeOff, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Trust() {
  const problems = [
    {
      title: 'Losing Jobs to "Prettier" Competitors',
      desc: 'You have the equipment and the crew, but homeowners and GCs judge you by your website. If yours looks like it was built in 2005, they move on.'
    },
    {
      title: 'Failing GC Vetting Processes',
      desc: 'Commercial project managers check your online footprint before awarding bids. A broken or non-existent website throws a massive red flag.'
    },
    {
      title: 'Zero Mobile Optimization',
      desc: 'Over 70% of your potential clients are searching for contractors on their phones while on-site or at home. If your site doesn\'t load instantly, they call someone else.'
    },
    {
      title: 'Invisible on Google Maps',
      desc: 'You do great work, but your local SEO is nonexistent. When people search "excavation near me", your competitors show up first.'
    }
  ];

  return (
    <section id="the-problem" className="py-24 lg:py-32 bg-[#05040a] border-b border-white/[0.06] relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[115px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Visual left stats panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-950/40 border border-white/[0.06] rounded-3xl p-6 lg:p-8 relative backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 to-transparent pointer-events-none" />
              
              <span className="text-[10px] font-mono font-black tracking-widest text-red-400 uppercase flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Industry Reality
              </span>
              <h3 className="text-white font-display font-black text-2xl mt-2 mb-8 uppercase">The Cost of Looking Unprofessional</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Lost Residential Leads</span>
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1 font-mono">
                      <TrendingDown className="w-4.5 h-4.5 fill-current" /> -45%
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-900/60 rounded-full overflow-hidden border border-white/[0.04]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '45%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Failed GC Background Checks</span>
                    <span className="text-xs font-bold text-orange-400 font-mono flex items-center gap-1">
                       <XCircle className="w-4 h-4" /> High Risk
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-900/60 rounded-full overflow-hidden border border-white/[0.04]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" 
                    />
                  </div>
                </div>

              </div>

              <div className="mt-8 p-4.5 bg-slate-900/40 rounded-2xl border border-red-500/20 flex items-start gap-3 text-xs text-slate-200 font-normal shadow-inner">
                <HardHat className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Stop letting lesser contractors win jobs just because their website looks slightly better than yours.</span>
              </div>
            </div>
          </motion.div>

          {/* Core Text Points */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-mono font-black tracking-widest text-slate-400 uppercase">
                The Core Problem
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-[1.1] mb-8 uppercase">
              You're invisible where it matters most.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {problems.map((pt, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-slate-900/30 border border-white/[0.05] p-5.5 rounded-2xl flex flex-col items-start hover:border-red-500/25 transition duration-300"
                >
                  <h4 className="text-white font-display font-bold text-sm tracking-tight mb-2 uppercase">{pt.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-normal font-sans">{pt.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
