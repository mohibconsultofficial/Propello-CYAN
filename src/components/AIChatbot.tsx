import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { getIntelligentReply } from '../data/chatKnowledge';

const DEFAULT_SUGGESTIONS = [
  "Do you build websites for my industry?",
  "I already have a website. Can you redesign it?",
  "How much does it cost and what's included?",
  "Why should I choose Propello over Wix?",
  "How does the 48-hour prototype work?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hey there! I’m here to help with anything regarding Propello — whether that’s our $1,500 turnkey build, our 48-hour mobile prototype, keeping your existing domain, or how we'd handle your specific industry.\n\nWhat’s on your mind?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedReplies: DEFAULT_SUGGESTIONS
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: currentHistory.map(m => ({ sender: m.sender, text: m.text }))
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Server status error");
      }

      const data = await response.json();
      setIsTyping(false);

      const botReply = data.text || "";
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: data.nextSuggestions
      };

      setMessages(prev => [...prev, botMsg]);

    } catch {
      setIsTyping(false);
      const fallbackResult = getIntelligentReply(
        trimmed,
        currentHistory.map(m => ({ sender: m.sender, text: m.text }))
      );

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: fallbackResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: fallbackResult.nextSuggestions
      };

      setMessages(prev => [...prev, botMsg]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none flex items-end">
      
      {/* Subtle Continuous Expanding Glow Ring around widget (Communicates: "Something is active here") */}
      {!isOpen && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-14 h-14 rounded-full border border-cyan-400/40 animate-pulse-ring" />
          <span className="w-16 h-16 rounded-full bg-cyan-500/10 blur-md animate-breathing-cyan" />
        </div>
      )}

      {/* Interactive Active System Capsule */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => setIsOpen(true)}
            className="absolute right-16 bottom-1 hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.18)] backdrop-blur-md cursor-pointer group transition-all"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-display font-semibold text-white block leading-none">
                Propello Intelligence
              </span>
              <span className="text-[9px] font-mono text-cyan-300 leading-none mt-1 block">
                Live System • Instant Answers
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button - Controlled Cyan Illumination */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="ai-chat-bubble-toggle"
        className="relative w-13 h-13 rounded-xl bg-zinc-950/90 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center text-white cursor-pointer transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] group backdrop-blur-md"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-zinc-300 group-hover:text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        )}
      </button>

      {/* High-End Enterprise Concierge Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[400px] h-[550px] max-h-[80vh] glass-panel-deep rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.2)] border border-cyan-500/30 flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Top illuminated cyan highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.08] bg-zinc-950/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </span>
                <div>
                  <h3 className="text-xs font-display font-semibold text-white tracking-tight flex items-center gap-1.5">
                    <span>Propello Intelligence</span>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    Online • Mo Radford: +1 (409) 797-6986
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+14097976986"
                  className="p-1.5 rounded-lg text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 border border-white/[0.08] hover:border-cyan-400/40 transition-all"
                  title="Call Founder"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
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
                    className={`max-w-[85%] rounded-lg px-4 py-3 leading-relaxed font-sans whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500/20 border border-cyan-400/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-zinc-900/90 border border-white/[0.08] text-zinc-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Contextual suggestions */}
                  {msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.suggestedReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => handleSendMessage(reply)}
                          className="text-[10px] font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] hover:border-cyan-400/40 px-2.5 py-1 rounded transition-all text-left cursor-pointer"
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
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-300" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Propello is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/[0.08] bg-zinc-950/70">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(userInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask anything about pricing, redesigns, your industry..."
                  className="flex-1 bg-zinc-900/90 border border-white/[0.12] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="btn-cta-illuminated p-2 rounded-lg cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </button>
              </form>
              <div className="text-[9px] font-mono text-zinc-500 text-center mt-1.5">
                Natural conversation • Ask any question in your own words
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
