import { useState, useEffect, type FormEvent } from 'react';
import { Phone, Mail, Clock, CheckCircle2, ShieldCheck, Zap, X, ArrowRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useHoverSupported } from '../utils/useHoverSupported';

const OWNER_EMAIL = 'mo.radford@propellonline.com';

export default function Contact() {
  const hasHover = useHoverSupported();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastMailtoUrl, setLastMailtoUrl] = useState('');

  const [bookingData, setBookingData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    trade: '',
    preferredTime: '',
    notes: ''
  });

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBookingModalOpen) {
        setIsBookingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingModalOpen]);

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Callback Request: ${bookingData.company || bookingData.name || 'Contractor'} (${bookingData.trade || 'Specialty Trade'})`;
    const body = 
`Hi Mo,

Please give me a call back regarding a custom contractor website for my business.

• Contractor / Owner Name: ${bookingData.name || 'N/A'}
• Company / Business Name: ${bookingData.company || 'N/A'}
• Trade / Specialty: ${bookingData.trade || 'N/A'}
• Phone Number: ${bookingData.phone || 'N/A'}
• Email Address: ${bookingData.email || 'None provided'}
• Preferred Callback Time: ${bookingData.preferredTime || 'Anytime / ASAP'}
• Notes / Questions: ${bookingData.notes || 'None provided'}

Looking forward to speaking with you.

Thanks!`;

    const mailtoLink = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setLastMailtoUrl(mailtoLink);

    // Send asynchronous backup payload to ensure email delivery
    try {
      const bookingEndpoint = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/booking'
        : '/api/booking';

      fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingData.name,
          company: bookingData.company,
          phone: bookingData.phone,
          email: bookingData.email,
          trade: bookingData.trade,
          preferredDate: bookingData.preferredTime,
          notes: bookingData.notes,
          type: 'callback_booking_request'
        })
      }).catch(() => null);

      await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: bookingData.name,
          company: bookingData.company,
          phone: bookingData.phone,
          email: bookingData.email || 'Not provided',
          trade: bookingData.trade,
          preferredTime: bookingData.preferredTime || 'Anytime / ASAP',
          notes: bookingData.notes || 'None provided',
          _subject: `New Contractor Callback Request: ${bookingData.company || bookingData.name || 'Contractor'} (${bookingData.trade || 'Specialty'})`,
          _replyto: bookingData.email || undefined
        })
      }).catch(() => null);
    } catch {
      // Gracefully continue even if offline
    } finally {
      setIsSubmitting(false);
      setBookingSubmitted(true);
      // Automatically trigger email client redirection
      window.location.href = mailtoLink;
    }
  };

  const defaultDirectMailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
    'Callback Request - Propello.Online'
  )}&body=${encodeURIComponent(
    'Hi Mo,\n\nPlease call me back regarding a custom contractor website.\n\nName: \nCompany Name: \nTrade / Specialty: \nPhone Number: \nPreferred Time to Call: \nNotes: \n\nThanks!'
  )}`;

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
          One phone call or callback request is all it takes. We outline your project together and deliver a working prototype for your review before launch.
        </p>

        {/* Primary Contact Chassis: Designated Call Button #3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          whileHover={hasHover ? { y: -5, transition: { duration: 0.25 } } : undefined}
          transition={{ duration: 0.4 }}
          className="glass-panel-deep border border-cyan-500/50 hover:border-cyan-400/80 rounded-2xl p-8 sm:p-14 max-w-3xl mx-auto shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.2)] hover:shadow-[0_28px_85px_rgba(0,0,0,0.95),0_0_65px_rgba(6,182,212,0.28)] relative overflow-hidden mb-12 transition-all duration-300"
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
              <span>Call me, not a call center</span>
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

        {/* BOOKING / CALLBACK CTA CARD */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/[0.1] hover:border-cyan-400/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.7)] relative overflow-hidden"
        >
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block mb-1">
              Prefer A Scheduled Callback?
            </span>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Enter your details below and founder Mo Radford will call you back personally to discuss your project.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            id="booking-cta"
            data-cursor="button"
            className="btn-cta-illuminated px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2.5 shrink-0 cursor-pointer text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-transform active:scale-95"
            title={`Book a Direct Callback with Mo Radford - details sent to ${OWNER_EMAIL}`}
          >
            <Calendar className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Book a Call</span>
          </button>
        </motion.div>

      </div>

      {/* BOOKING / CALLBACK MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-zinc-950 border border-cyan-500/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.2)] overflow-hidden z-10 my-8 text-left"
            >
              {/* Top Cyan Accent Strip */}
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500" />

              {/* Header */}
              <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Direct Founder Callback</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight">
                    Request a Callback from Mo Radford
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                {bookingSubmitted ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-display font-bold text-white">
                      Callback Details Dispatched!
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Your details were redirected directly to founder Mo Radford at <span className="font-mono text-cyan-300 select-all">{OWNER_EMAIL}</span>. Mo will call you back directly at the number provided.
                    </p>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Your device&apos;s email client should open automatically with the structured callback request pre-filled.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={lastMailtoUrl || defaultDirectMailto}
                        className="btn-cta-illuminated px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 text-slate-950"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Re-open Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setBookingSubmitted(false);
                          setIsBookingModalOpen(false);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Enter your details below and Mo will personally call you back. All form info routes directly to <strong className="text-cyan-300 font-mono">{OWNER_EMAIL}</strong>.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                          Contractor / Owner Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          placeholder="e.g. John Miller"
                          className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                          Company / Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.company}
                          onChange={(e) => setBookingData({ ...bookingData, company: e.target.value })}
                          placeholder="e.g. Miller & Sons Electric"
                          className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                          Trade / Specialty *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.trade}
                          onChange={(e) => setBookingData({ ...bookingData, trade: e.target.value })}
                          placeholder="e.g. HVAC, Roofing, Plumbing"
                          className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                          Phone Number (to call you back) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          placeholder="e.g. +1 (555) 234-5678"
                          className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          placeholder="e.g. john@millerelectric.com"
                          className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                          Best Time to Call (Optional)
                        </label>
                        <input
                          type="text"
                          value={bookingData.preferredTime}
                          onChange={(e) => setBookingData({ ...bookingData, preferredTime: e.target.value })}
                          placeholder="e.g. Morning, After 3 PM, ASAP"
                          className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Notes / Details (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        placeholder="Current website URL, service area, specific goals or questions..."
                        className="w-full bg-zinc-900/90 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-cta-illuminated w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-slate-950 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] active:scale-95 transition-transform disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending Callback Request...</span>
                        ) : (
                          <>
                            <Phone className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                            <span>Request Callback from Mo</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-zinc-500">
                      <span>Routes directly to {OWNER_EMAIL}</span>
                      <a
                        href={defaultDirectMailto}
                        className="text-cyan-400/80 hover:text-cyan-300 underline underline-offset-2"
                      >
                        Direct Email Link
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

