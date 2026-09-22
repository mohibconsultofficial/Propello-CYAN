import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does the real-time Google Reviews widget work?",
      answer: "We connect your website directly to your Google Business Profile API. Whenever a client leaves you a positive rating, it syncs and updates on your website automatically. Best of all, it has zero impact on your PageSpeed because we use a lightweight static caching layer on the server."
    },
    {
      question: "Can I customize the Radford AI Chatbot for my exact industry?",
      answer: "Absolutely! Every AI Assistant is structured and programmed specifically for your business. We feed it detailed knowledge sheets containing your services, pricing, typical response scripts, opening hours, and location. It handles basic questions instantly and gracefully collects contact info."
    },
    {
      question: "Are these websites fully hand-crafted and mobile compatible?",
      answer: "Yes, 100%. We do not use slow bloated templates or WordPress plugins that open you up to hacking. We code modern layouts using responsive standards and fluid structural grids. Your reviews feed and AI chatbot will run flawlessly on iPhones, Androids, desktops, and tablets."
    },
    {
      question: "Who is Radford and how are lead alerts delivered?",
      answer: "Radford is our signature conversational AI leads assistant. Whenever a customer leaves their details in the chat or submits our contact form, our server processes it instantly. You receive a direct alert on your phone/email immediately with their name, phone, and project description."
    }
  ];

  const toggleFAQ = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#05040a] border-b border-white/[0.06] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono font-black tracking-widest text-[#a855f7] bg-purple-950/40 border border-purple-500/20 px-3.5 py-1.5 rounded-full uppercase">
            Inquiries cleared
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-5 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-sans font-light">
            All details about Propello’s visual delivery, reviews widgets, and automated business nodes.
          </p>
        </div>

        {/* List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/30 border border-white/[0.05] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-white hover:text-purple-400 transition cursor-pointer"
                >
                  <span className="font-display font-bold text-sm sm:text-base tracking-tight flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-400 shrink-0" />
                    {faq.question}
                  </span>
                  <span className="bg-slate-950/60 p-2 rounded-xl border border-white/[0.06] text-slate-400 shadow-inner shrink-0 transition group-hover:text-white">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/[0.04] pt-4 font-sans font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
