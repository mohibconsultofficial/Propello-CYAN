import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Send, X, CheckCircle2, Sparkles, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { getIntelligentReply, TARGET_EMAIL, BACKUP_GMAIL, TARGET_PHONE } from '../data/chatKnowledge';

export default function PropelloAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: '',
    phone: '',
    email: '',
    trade: '',
    notes: ''
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm Propello AI. How can I help you with your contractor website today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showPromptBubble, setShowPromptBubble] = useState(false);
  const [hasUserDismissed, setHasUserDismissed] = useState(false);

  // Periodic non-pushy tooltip bubble hovering above the widget when closed
  useEffect(() => {
    if (isOpen || hasUserDismissed) {
      setShowPromptBubble(false);
      return;
    }

    let hideTimeout: NodeJS.Timeout;

    // Initial gentle appearance after 4 seconds
    const initialTimer = setTimeout(() => {
      setShowPromptBubble(true);
      hideTimeout = setTimeout(() => {
        setShowPromptBubble(false);
      }, 5500); // Visible for 5.5s
    }, 4000);

    // Subtle re-appearance every 26 seconds (visible for 5.5s, hidden for ~20.5s)
    const recurringInterval = setInterval(() => {
      setShowPromptBubble(true);
      hideTimeout = setTimeout(() => {
        setShowPromptBubble(false);
      }, 5500);
    }, 26000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimeout);
      clearInterval(recurringInterval);
    };
  }, [isOpen, hasUserDismissed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showQuoteForm]);

  useEffect(() => {
    if (isOpen) {
      setShowPromptBubble(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setUserInput('');
    setIsTyping(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const chatEndpoint = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/chat'
        : '/api/chat';

      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: currentHistory.map((m) => ({ sender: m.sender, text: m.text }))
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('API response error');
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Non-JSON response');
      }

      const data = await response.json();
      setIsTyping(false);

      let text = data.text || '';
      // Ensure the vital call booking push is always present
      if (
        !text.includes('Would you like to book a call with Mo directly') &&
        !text.includes('quick quote form')
      ) {
        text += '\n\nWould you like to book a call with Mo directly, or shall I pull up our quick quote form?';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.triggerQuoteForm) {
        setTimeout(() => setShowQuoteForm(true), 400);
      }
    } catch {
      setIsTyping(false);
      // Offline / standalone intelligent knowledge engine fallback
      const fallbackResult = getIntelligentReply(
        trimmed,
        currentHistory.map((m) => ({ sender: m.sender, text: m.text }))
      );

      let text = fallbackResult.text;
      if (
        !text.includes('Would you like to book a call with Mo directly') &&
        !text.includes('quick quote form')
      ) {
        text += '\n\nWould you like to book a call with Mo directly, or shall I pull up our quick quote form?';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);

      if (fallbackResult.triggerQuoteForm) {
        setTimeout(() => setShowQuoteForm(true), 400);
      }
    }
  };

  const handleQuoteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!quoteData.name || !quoteData.phone || !quoteData.email) return;

    setIsSubmitting(true);
    const submittedName = quoteData.name;
    const submittedTrade = quoteData.trade || 'business';

    try {
      const payload = {
        name: quoteData.name,
        phone: quoteData.phone,
        email: quoteData.email,
        trade: quoteData.trade || 'Specialty Contractor',
        notes: quoteData.notes || 'Inquired via Propello AI',
        _subject: `New Propello Quote Request: ${quoteData.name} (${quoteData.trade || 'Specialty Contractor'})`,
        _cc: TARGET_EMAIL,
        _template: 'table'
      };

      const bookingEndpoint = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/booking'
        : '/api/booking';

      // Deliver via both API endpoint and direct FormSubmit to Gmail
      const p1 = fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      const p2 = fetch(`https://formsubmit.co/ajax/${BACKUP_GMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(() => null);

      await Promise.allSettled([p1, p2]);
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setQuoteSubmitted(true);

      setTimeout(() => {
        setQuoteSubmitted(false);
        setShowQuoteForm(false);
        setQuoteData({
          name: '',
          phone: '',
          email: '',
          trade: '',
          notes: ''
        });

        const ackMsg: ChatMessage = {
          id: Date.now().toString(),
          sender: 'bot',
          text: `Thank you, ${submittedName}! Your quote request for your ${submittedTrade} has been sent directly to founder Mo Radford at ${TARGET_EMAIL}.\n\nMo will review your details and reach out promptly. You can also call or text Mo directly at ${TARGET_PHONE}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, ackMsg]);
      }, 1500);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      
      {/* HOVERING ASSISTANT GUIDANCE PROMPT */}
      <AnimatePresence>
        {!isOpen && showPromptBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full mb-3 right-0 select-none z-50 pointer-events-auto"
          >
            <div
              onClick={() => {
                setIsOpen(true);
                setShowPromptBubble(false);
              }}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/95 border border-cyan-500/40 shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md cursor-pointer group hover:border-cyan-400 transition-all duration-200"
            >
              {/* Subtle pulsing cyan beacon */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              </span>

              <span className="text-xs font-display font-medium text-zinc-200 group-hover:text-white tracking-tight whitespace-nowrap">
                Talk to our AI assistant for guidance
              </span>

              {/* Minimal dismiss button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUserDismissed(true);
                  setShowPromptBubble(false);
                }}
                className="ml-0.5 p-0.5 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Dismiss prompt"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Downward pointing beak pointing toward button */}
              <div className="absolute -bottom-1 right-7 w-2 h-2 bg-zinc-950 border-r border-b border-cyan-500/40 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAUNCHER BUTTON */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPromptBubble(false);
        }}
        id="propello-ai-toggle"
        aria-label="Propello AI Assistant"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-call-glowing px-4 sm:px-5 py-3 rounded-full cursor-pointer flex items-center gap-2 select-none shadow-[0_0_22px_rgba(34,211,238,0.7),0_0_45px_rgba(6,182,212,0.4)] text-slate-950 font-display font-bold text-xs sm:text-sm tracking-tight border border-white/90"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 text-slate-950" />
            <span>Close</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-950 shadow-[0_0_8px_#22d3ee]" />
            </div>
            <span>Propello AI</span>
          </>
        )}
      </motion.button>

      {/* SLEEK CONVERSATION WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[410px] h-[560px] max-h-[82vh] bg-zinc-950/95 border border-cyan-500/25 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.18)] flex flex-col overflow-hidden backdrop-blur-2xl z-50"
          >
            {/* Top subtle highlight hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Simple, Professional Header */}
            <div className="px-4 py-3.5 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <h3 className="text-sm font-display font-semibold text-white tracking-tight">
                  Propello AI
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-medium rounded-tr-none shadow-[0_4px_12px_rgba(6,182,212,0.25)]'
                        : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800/70 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    
                    {/* Subtle quick action strip on bot replies to push booking & quote */}
                    {msg.sender === 'bot' && msg.id !== 'welcome' && (
                      <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                        <a
                          href="tel:+14097976986"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono transition-colors"
                        >
                          <Phone className="w-3 h-3 text-cyan-400" />
                          <span>Call Mo Directly</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowQuoteForm(true)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-[11px] font-display font-semibold transition-colors cursor-pointer"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <span
                      className={`text-[9px] block mt-1.5 font-mono ${
                        msg.sender === 'user' ? 'text-slate-950/70' : 'text-zinc-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Dynamic Non-Static Fluid Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(34,211,238,0.35)]">
                    <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
                  </div>
                  <div className="bg-zinc-900/95 text-zinc-300 border border-cyan-500/20 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-3">
                    <span className="text-[11px] font-mono tracking-tight text-cyan-300/90">Thinking</span>
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-wave-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-wave-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-wave-dot-3" />
                    </div>
                  </div>
                </div>
              )}

              {/* Embedded In-Chat Quote Form */}
              <AnimatePresence>
                {showQuoteForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="p-4 rounded-xl bg-zinc-900/95 border border-cyan-500/30 shadow-lg my-2"
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                      <h4 className="text-xs font-display font-semibold text-white tracking-wide">
                        Quick Quote Request
                      </h4>
                      <span className="text-[10px] font-mono text-cyan-400">
                        Direct to Mo Radford
                      </span>
                    </div>

                    {quoteSubmitted ? (
                      <div className="py-4 text-center">
                        <CheckCircle2 className="w-6 h-6 text-cyan-400 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <p className="text-xs font-semibold text-white">Quote Request Sent</p>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          Founder Mo Radford will follow up promptly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleQuoteSubmit} className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                              Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={quoteData.name}
                              onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                              placeholder="Your name"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              required
                              value={quoteData.phone}
                              onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                              placeholder="(409) 000-0000"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={quoteData.email}
                              onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                              placeholder="name@email.com"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                              Trade / Business
                            </label>
                            <input
                              type="text"
                              value={quoteData.trade}
                              onChange={(e) => setQuoteData({ ...quoteData, trade: e.target.value })}
                              placeholder="e.g. Roofing, HVAC"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                            Project Goals (Optional)
                          </label>
                          <textarea
                            rows={2}
                            value={quoteData.notes}
                            onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                            placeholder="Current website, service area, or goals..."
                            className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 resize-none"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowQuoteForm(false)}
                            className="px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(userInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask Propello AI..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || isTyping}
                  className="p-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
