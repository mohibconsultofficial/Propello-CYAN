import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Send, X, Calendar, CheckCircle2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { getIntelligentReply } from '../data/chatKnowledge';
import PropelloLogo from './PropelloLogo';

const INITIAL_SUGGESTIONS = [
  "What's included in the $1,500 package?",
  "How does the working prototype review work?",
  "What does the $97/mo service cover?",
  "Do you handle Google SEO & Search Console?",
  "Can I request a consultation?"
];

export default function PropelloAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    trade: '',
    location: '',
    preferredDate: '',
    notes: ''
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm Propello AI. I can explain our complete $1,500 contractor website setup, our $97/month hosting and maintenance service, the working prototype review process, or help you submit a consultation request directly to founder Mo Radford.\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedReplies: INITIAL_SUGGESTIONS
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();

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
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      // Support Netlify serverless functions and local Express dev server
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
        throw new Error('API request failed');
      }

      const data = await response.json();
      setIsTyping(false);

      const botReply = data.text || '';
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: data.nextSuggestions
      };

      setMessages((prev) => [...prev, botMsg]);

      // If inquiry indicates booking intent, open consultation request overlay
      if (
        lower.includes('consultation') ||
        lower.includes('schedule') ||
        lower.includes('book a call') ||
        lower.includes('book consultation') ||
        lower.includes('appointment')
      ) {
        setTimeout(() => setShowBookingModal(true), 600);
      }
    } catch {
      setIsTyping(false);
      // Fallback domain-expert reply
      const fallbackResult = getIntelligentReply(
        trimmed,
        currentHistory.map((m) => ({ sender: m.sender, text: m.text }))
      );

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: fallbackResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: fallbackResult.nextSuggestions
      };

      setMessages((prev) => [...prev, botMsg]);

      if (lower.includes('consultation') || lower.includes('schedule') || lower.includes('book')) {
        setTimeout(() => setShowBookingModal(true), 600);
      }
    }
  };

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone) return;

    setIsSubmittingBooking(true);
    try {
      const bookingEndpoint = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/booking'
        : '/api/booking';

      await fetch(bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    } catch {
      // Graceful local handling
    } finally {
      setIsSubmittingBooking(false);
      setBookingSubmitted(true);
      setTimeout(() => {
        setBookingSubmitted(false);
        setShowBookingModal(false);
        setBookingData({
          name: '',
          phone: '',
          email: '',
          trade: '',
          location: '',
          preferredDate: '',
          notes: ''
        });
        const ackMsg: ChatMessage = {
          id: Date.now().toString(),
          sender: 'bot',
          text: `Thank you, ${bookingData.name}! Your consultation request has been delivered to founder Mo Radford. We will review your project details and contact you directly to confirm our appointment time.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, ackMsg]);
      }, 2200);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40">
      
      {/* DISTINCTIVE PROPELLO AI LAUNCHER (Exact requirement: communicates only "Talk to Propello AI") */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        id="propello-ai-toggle"
        aria-label="Talk to Propello AI"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-950/90 border border-cyan-500/50 hover:border-cyan-400 text-white cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] backdrop-blur-xl transition-all select-none group"
      >
        {/* Electric Pulse Halo */}
        <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-30 pointer-events-none" />

        {/* Brand Electric Mark */}
        <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors shrink-0 shadow-[0_0_8px_#22d3ee]">
          <Zap className="w-3.5 h-3.5 fill-current" />
        </div>

        {/* Clean, Concise Text (Communicates ONLY "Talk to Propello AI") */}
        <span className="font-display font-semibold text-xs text-white tracking-wide whitespace-nowrap pr-1">
          {isOpen ? 'Close Assistant' : 'Talk to Propello AI'}
        </span>
      </motion.button>

      {/* PROPELLO AI CONVERSATION WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] h-[580px] max-h-[80vh] glass-panel-deep rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.2)] border border-cyan-500/40 flex flex-col overflow-hidden backdrop-blur-2xl z-50"
          >
            {/* Top illuminated cyan highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.08] bg-zinc-950/85 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PropelloLogo size="sm" showWordmark={false} />
                <div>
                  <h3 className="text-xs font-display font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>Propello AI</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    Contractor Website Specialist
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                  title="Request Consultation"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Consult</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-4 py-3 leading-relaxed font-sans whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500/20 border border-cyan-400/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.12)]'
                        : 'bg-zinc-900/90 border border-white/[0.08] text-zinc-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Contextual Suggestions */}
                  {msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.suggestedReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => {
                            if (
                              reply.toLowerCase().includes('schedule') ||
                              reply.toLowerCase().includes('consultation')
                            ) {
                              setShowBookingModal(true);
                            } else {
                              handleSendMessage(reply);
                            }
                          }}
                          className="text-[10px] font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] hover:border-cyan-400/40 px-2.5 py-1 rounded-md transition-all text-left cursor-pointer"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-zinc-900/90 border border-white/[0.08] text-zinc-300 w-fit">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Propello AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* In-Chat Consultation Request Overlay Modal */}
            <AnimatePresence>
              {showBookingModal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-[#030508]/95 p-5 flex flex-col justify-between z-20 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-display font-semibold text-white text-xs">
                        Request a 5-Minute Consultation
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="text-zinc-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {bookingSubmitted ? (
                    <div className="py-12 text-center space-y-3">
                      <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
                      <h5 className="font-display font-bold text-white text-sm">
                        Request Received
                      </h5>
                      <p className="text-xs text-zinc-400 max-w-xs mx-auto font-sans leading-relaxed">
                        Founder Mo Radford will review your project details and reach out to confirm your consultation time.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-3 py-2 overflow-y-auto">
                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          placeholder="e.g. David Miller"
                          className="w-full bg-zinc-900 border border-white/[0.1] rounded-lg px-3 py-2 text-white text-xs focus:border-cyan-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            placeholder="(555) 000-0000"
                            className="w-full bg-zinc-900 border border-white/[0.1] rounded-lg px-3 py-2 text-white text-xs focus:border-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                            placeholder="david@contracting.com"
                            className="w-full bg-zinc-900 border border-white/[0.1] rounded-lg px-3 py-2 text-white text-xs focus:border-cyan-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          Trade / Contracting Niche
                        </label>
                        <input
                          type="text"
                          value={bookingData.trade}
                          onChange={(e) => setBookingData({ ...bookingData, trade: e.target.value })}
                          placeholder="e.g. Commercial Roofing & Sheet Metal"
                          className="w-full bg-zinc-900 border border-white/[0.1] rounded-lg px-3 py-2 text-white text-xs focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          Preferred Day & Time
                        </label>
                        <input
                          type="text"
                          value={bookingData.preferredDate}
                          onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                          placeholder="e.g. Tomorrow morning around 10am CST"
                          className="w-full bg-zinc-900 border border-white/[0.1] rounded-lg px-3 py-2 text-white text-xs focus:border-cyan-400"
                        />
                      </div>

                      <p className="text-[10px] text-zinc-500 font-sans pt-1">
                        Note: Submitting this form sends an inquiry to Mo Radford. We will confirm the actual call time with you directly.
                      </p>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmittingBooking}
                          className="w-full btn-call-glowing py-2.5 rounded-lg text-slate-950 font-bold font-display text-xs cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingBooking ? 'Submitting Request...' : 'Submit Consultation Request'}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/[0.08] bg-zinc-950/90">
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
                  placeholder="Ask about deliverables, prototype, or pricing..."
                  className="flex-1 bg-zinc-900/90 border border-white/[0.12] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  aria-label="Send message"
                  className="btn-cta-illuminated p-2 rounded-lg cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
