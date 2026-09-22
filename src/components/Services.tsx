import { Laptop2, Code2, MessageSquare, CheckCircle2, Phone, Search, HardHat, Hammer, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const serviceCards = [
    {
      id: 'serv-web',
      icon: <Laptop2 className="w-6 h-6 text-purple-400" />,
      title: 'Premium Custom Web Engineering',
      tagline: 'High Speed • Zero Bloat Codebase',
      desc: 'We craft stunning professional websites designed individually for your exact industry. Built using robust modern frameworks to ensure a flawless native experience on mobile, tablet, and desktop, backed by clean semantic code that index you high in local searches.',
      bullets: [
        'Fully hand-crafted layouts designed for high-end conversions',
        'Built from scratch for speeds that pass core Web Vitals',
        'Strategic conversion flow designed to maximize incoming sales calls'
      ]
    },
    {
      id: 'serv-widget',
      icon: <Code2 className="w-6 h-6 text-purple-400" />,
      title: 'Real-Time Google Reviews Widget',
      tagline: 'Instant Social Proof Connection',
      desc: 'Build immediate, verified trust with your website visitors. We embed a highly sleek, light-weight live feed widget that pulls your newest 5-star ratings directly from your Google My Business. Loads dynamically without sluggish third-party scripts.',
      bullets: [
        'Syncs real-time with verified Google My Business listings',
        'Dynamic layouts (feeds, trust badges) in customizable palettes',
        'Melt away prospective buyer hesitation instantly'
      ]
    },
    {
      id: 'serv-bot',
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      title: 'Lead Capture Systems',
      tagline: 'Frictionless Contact Architecture',
      desc: 'We implement high-visibility sticky headers, tap-to-call action buttons, and frictionless contact forms designed for mobile thumbs. Every element is engineered to lower the barrier for a homeowner or GC to reach you.',
      bullets: [
        'Tap-to-call and tap-to-text integration',
        'Sticky mobile navigation for constant CTA visibility',
        'Lead routing directly to your email or phone'
      ]
    }
  ];

  const industries = [
    "Excavation & Grading",
    "Demolition Services",
    "Asphalt & Paving",
    "Septic Installation",
    "Land Clearing",
    "Concrete Foundation"
  ];

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services-block" className="py-24 lg:py-32 relative overflow-hidden bg-[#05040a] neon-grid border-b border-white/[0.06]">
      
      {/* Decorative Radial Orb Glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[125px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono font-black tracking-widest text-purple-400 bg-purple-950/40 border border-purple-500/20 px-3.5 py-1.5 rounded-full uppercase flex items-center justify-center gap-2 mx-auto w-fit"
          >
            <Shield className="w-3.5 h-3.5" /> Service Breakdown
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mt-5 leading-[1.1] uppercase"
          >
            Everything You Need. <br className="hidden sm:inline" /> Nothing You Don't.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-slate-300 text-sm sm:text-base font-normal font-sans mt-4 max-w-2xl mx-auto"
          >
            We don't sell you bloated SEO retainers or confusing software platforms. We build the core infrastructure you need to look legitimate and capture leads.
          </motion.p>
        </div>

        {/* Service Cards Grid Layout with motion stagger */}
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
        >
          {serviceCards.map((srv) => (
            <motion.div 
              key={srv.id} 
              variants={cardItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-950/40 border border-white/[0.06] backdrop-blur-xl rounded-2xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 group hover:border-purple-500/35 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/2 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon wrapper */}
                <div className="bg-slate-950/60 border border-white/[0.08] p-3 text-white rounded-xl w-fit mb-6 shadow-md shadow-black/20 group-hover:border-purple-500/30 transition">
                  {srv.icon}
                </div>

                <p className="text-[10px] font-mono font-black tracking-wider text-purple-400 uppercase mb-2">{srv.tagline}</p>
                <h3 className="text-xl font-display font-bold text-white mb-4 leading-tight uppercase">{srv.title}</h3>
                
                <p className="text-slate-300 text-sm leading-relaxed font-sans font-normal mb-6">
                  {srv.desc}
                </p>

                {/* Sub features list */}
                <ul className="space-y-3 mb-8">
                  {srv.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans font-medium">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industry Fit Section */}
        <div className="bg-slate-950/40 border border-white/[0.06] rounded-3xl p-8 lg:p-12 relative overflow-hidden backdrop-blur-xl text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 to-transparent pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-8 uppercase tracking-tight relative z-10 flex items-center justify-center gap-3">
            <HardHat className="w-6 h-6 text-purple-400" />
            Built For The Trades
            <Hammer className="w-6 h-6 text-purple-400" />
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10 max-w-4xl mx-auto">
            {industries.map((industry, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.08] px-5 py-2.5 rounded-full text-slate-300 font-mono text-sm font-semibold tracking-wide uppercase hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300 cursor-default">
                {industry}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
