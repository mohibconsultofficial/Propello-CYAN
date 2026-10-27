import { useState, type FormEvent } from 'react';
import { Phone, Mail, Clock, CheckCircle2, ShieldCheck, Zap, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useHoverSupported } from '../utils/useHoverSupported';

export default function Contact() {
  const hasHover = useHoverSupported();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    trade: '',
    projectDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const bookingEndpoint = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/booking'
        : '/api/booking';
      await fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          trade: formData.trade,
          details: formData.projectDetails,
          type: 'website_estimate_request'
        })
      });
      fetch('https://formsubmit.co/ajax/mohibconsultofficial@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          trade: formData.trade,
          details: formData.projectDetails,
          _subject: `New Propello Website Request: ${formData.name}`,
          _cc: 'mo.radford@propellonline.com'
        })
      }).catch(() => null);
    } catch {
      // Gracefully continue even if offline
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-36 relative overflow-hidden">
      
      {/* High-intensity Ambient Cyan Illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-cyan-500/12 to-teal-500/8 rounded-full blur-[170px] pointer-events-none mix-blend-screen" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow - Designated Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>START YOUR PROJECT TODAY</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
          Ready for a website that works for your business?
        </h2>

        <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto mb-12 font-sans">
          One phone call or email is all it takes. We outline your scope together and deliver a working prototype for your review before launch.
        </p>

        {/* Primary Contact Chassis: Designated Call Button #3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          whileHover={hasHover ? { y: -5, transition: { duration: 0.25 } } : undefined}
          transition={{ duration: 0.4 }}
          className="glass-panel-deep border border-cyan-500/50 hover:border-cyan-400/80 rounded-2xl p-8 sm:p-14 max-w-3xl mx-auto shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.2)] hover:shadow-[0_28px_85px_rgba(0,0,0,0.95),0_0_65px_rgba(6,182,212,0.28)] relative overflow-hidden mb-12 transition-all duration-300 transform-gpu"
        >
          {/* Top illuminated cyan highlight */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
              <Phone className="w-8 h-8" />
            </div>

            <span className="text-xs sm:text-sm font-mono text-cyan-300 uppercase tracking-widest mb-2">
              Direct Founder Line
            </span>

            {/* Direct Dial Display */}
            <div className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-6 block drop-shadow-[0_0_25px_rgba(6,182,212,0.35)] select-all font-mono">
              +1 (409) 797-6986
            </div>

            {/* DESIGNATED CALL BUTTON #3 (Electric Glow & Pulse) */}
            <a
              href="tel:+14097976986"
              id="final-call-cta"
              className="btn-call-glowing w-full sm:w-auto font-display font-bold text-base sm:text-xl rounded-2xl px-12 py-5 flex items-center justify-center gap-3.5 cursor-pointer mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center">
                <Phone className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
              </div>
              <span>Call Propello Now: +1 (409) 797-6986</span>
            </a>

            {/* Key Reassurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Talk with Mo Radford</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>5-Minute Project Review</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>No Sales Pressure</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* DESIGNATED SINGLE EMAIL CTA (Under "START YOUR PROJECT TODAY") */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/[0.1] hover:border-cyan-400/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.7)] relative overflow-hidden"
        >
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block mb-1">
              Official Email Channel
            </span>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Prefer to send details via email first? Click to launch your mail app with recipient and inquiry pre-filled.
            </p>
          </div>

          <a
            href="mailto:mo.radford@propellonline.com?subject=Contractor%20Website%20Inquiry%20-%20Propello.Online&body=Hi%20Mo%2C%0A%0AI%20am%20interested%20in%20a%20custom%20contractor%20website%20for%20my%20business.%0A%0ACompany%20Name%3A%20%0ATrade%20%2F%20Specialty%3A%20%0APhone%20Number%3A%20%0ABest%20Time%20to%20Reach%20Me%3A%20%0A%0AThanks!"
            id="final-email-cta"
            onClick={() => {
              window.location.href = "mailto:mo.radford@propellonline.com?subject=Contractor%20Website%20Inquiry%20-%20Propello.Online&body=Hi%20Mo%2C%0A%0AI%20am%20interested%20in%20a%20custom%20contractor%20website%20for%20my%20business.%0A%0ACompany%20Name%3A%20%0ATrade%20%2F%20Specialty%3A%20%0APhone%20Number%3A%20%0ABest%20Time%20to%20Reach%20Me%3A%20%0A%0AThanks!";
            }}
            data-cursor="button"
            className="btn-cta-illuminated px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2.5 shrink-0 cursor-pointer text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-transform active:scale-95"
            title="Open email client to mo.radford@propellonline.com"
          >
            <Mail className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Email Mo Radford</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
