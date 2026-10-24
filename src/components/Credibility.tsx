import { Sparkles, Check, CheckCircle2, MonitorSmartphone, Rocket, Link2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Credibility() {
  const steps = [
    {
      icon: <MonitorSmartphone className="w-5 h-5 text-purple-400" />,
      title: 'Step 1: We Build Your Draft',
      desc: 'We map out a mobile-first, high-converting layout specifically for your trade (excavation, paving, etc.). No generic templates.'
    },
    {
      icon: <Link2 className="w-5 h-5 text-purple-400" />,
      title: 'Step 2: You Review The Demo',
      desc: 'We send you a live link to interact with your new site. You test the buttons, read the copy, and see exactly what it looks like on your phone.'
    },
    {
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      title: 'Step 3: Approve & Launch',
      desc: 'If you love it, we finalize the setup, connect your custom domain, and integrate the lead capture system. You start looking like the pro you are.'
    }
  ];

  return (
    <section id="solution-process" className="py-24 lg:py-32 bg-[#05040a] border-b border-white/[0.06] relative overflow-hidden">
      
      {/* Immersive radial visual elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-none">
          <span className="text-[10px] font-mono font-black tracking-widest text-purple-400 bg-purple-950/40 border border-purple-500/20 px-3.5 py-1.5 rounded-full uppercase">
            The Pre-Built System
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mt-5 leading-[1.1] uppercase">
            Invisible to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Credible Contractor</span> <br className="hidden sm:inline" /> Fast &amp; Frictionless.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium font-sans mt-4 leading-relaxed max-w-2xl mx-auto">
            Forget 6-month agency contracts and confusing software builders. We build your entire digital footprint and send you the draft to approve. It's already done before you commit.
          </p>
        </div>

        {/* How It Works Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="bg-purple-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-6 border border-purple-500/20">
                {step.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 uppercase tracking-tight">{step.title}</h3>
              <p className="text-sm font-sans text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Reassurance Metrics / Value checkmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-12 border-t border-white/[0.08]">
          <div className="flex items-start gap-3.5 group">
            <div className="bg-purple-950/40 text-purple-400 p-2.5 rounded-xl border border-purple-500/20 shrink-0 mt-0.5 group-hover:border-purple-500/35 transition">
              <Check className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-white font-display font-bold text-sm uppercase">Zero Downtime</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-1.5 font-light font-sans">We build on staging servers. Your current site (if you have one) stays live until you're ready.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 group">
            <div className="bg-purple-950/40 text-purple-400 p-2.5 rounded-xl border border-purple-500/20 shrink-0 mt-0.5 group-hover:border-purple-500/35 transition">
              <Check className="w-4.5 h-4.5" />
            </div>
            <div>
              <h5 className="text-white font-display font-bold text-sm uppercase">Done-For-You Setup</h5>
              <p className="text-slate-400 text-xs leading-relaxed mt-1.5 font-light font-sans">We handle hosting, SSL certificates, and domain connection. No technical headaches.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 group">
            <div className="bg-purple-950/40 text-purple-400 p-2.5 rounded-xl border border-purple-500/20 shrink-0 mt-0.5 group-hover:border-purple-500/35 transition">
              <Check className="w-4.5 h-4.5" />
            </div>
            <div>
              <h5 className="text-white font-display font-bold text-sm uppercase">Lead Notifications</h5>
              <p className="text-slate-400 text-xs leading-relaxed mt-1.5 font-light font-sans">New inquiries get texted or emailed to you instantly so you can close them on the go.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
