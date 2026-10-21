import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Phone, 
  ShieldCheck, 
  Building2, 
  ExternalLink, 
  X, 
  ArrowLeft,
  Lock,
  Landmark,
  UserCheck
} from 'lucide-react';
import PropelloLogo from './PropelloLogo';

interface BankField {
  id: string;
  label: string;
  value: string;
}

const BANK_INFO_FIELDS: BankField[] = [
  { id: 'bank_name', label: 'Bank name', value: 'Citibank' },
  { id: 'bank_address', label: 'Bank address', value: '111 Wall Street, New York, NY 10043, USA' },
  { id: 'routing', label: 'Routing (ABA)', value: '031100209' },
  { id: 'swift', label: 'SWIFT code', value: 'CITIUS33' },
  { id: 'account_type', label: 'Account type', value: 'CHECKING' }
];

const BENEFICIARY_INFO_FIELDS: BankField[] = [
  { id: 'beneficiary', label: 'Beneficiary name', value: 'Auisha Jubeen' },
  { id: 'account_number', label: 'Account number', value: '70580410002685339' }
];

const ALL_FIELDS = [...BANK_INFO_FIELDS, ...BENEFICIARY_INFO_FIELDS];

const FULL_COPY_BLOCK = `Payment Details

Bank Information
- Bank name: Citibank
- Bank address: 111 Wall Street, New York, NY 10043, USA
- Routing (ABA): 031100209
- SWIFT code: CITIUS33
- Account type: CHECKING

Beneficiary Information
- Beneficiary name: Auisha Jubeen
- Account number: 70580410002685339`;

interface PaymentDetailsProps {
  onNavigateHome?: () => void;
  onNavigateToProfile?: () => void;
}

export default function PaymentDetails({ onNavigateHome, onNavigateToProfile }: PaymentDetailsProps) {
  // Track copied fields permanently (once copied, stays green forever)
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [allCopied, setAllCopied] = useState(false);


  const safeCopyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch {
      return false;
    }
  };

  const handleCopySingle = async (field: BankField) => {
    await safeCopyToClipboard(field.value);
    setCopiedMap((prev) => ({
      ...prev,
      [field.id]: true
    }));
  };

  const handleCopyAll = async () => {
    await safeCopyToClipboard(FULL_COPY_BLOCK);
    setAllCopied(true);
    // Mark ALL individual rows as copied so they stay permanently emerald green
    const newMap: Record<string, boolean> = {};
    ALL_FIELDS.forEach((f) => {
      newMap[f.id] = true;
    });
    setCopiedMap(newMap);
  };


  return (
    <div className="min-h-screen bg-[#080B10] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background Ambience: Subtle deep tech grid & faint glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px'
        }}
      />

      {/* =========================================================================
          B. DEDICATED PAGE HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080B10]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo & Wordmark (Clickable back to homepage) */}
            <div className="flex items-center gap-4">
              {onNavigateHome ? (
                <button
                  onClick={onNavigateHome}
                  className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors py-1.5 px-2.5 rounded-lg border border-white/[0.08] hover:border-cyan-500/30 bg-white/[0.02] cursor-pointer"
                  title="Back to Propello Home"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              ) : null}

              <div 
                onClick={() => {
                  if (onNavigateHome) onNavigateHome();
                  else window.location.href = '/';
                }}
                className="cursor-pointer group flex items-center"
              >
                <PropelloLogo size="md" />
              </div>
            </div>

            {/* Right: Action Group (Visit Main Website & Call Propello) */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <a
                href="https://propello.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors py-2 px-3 rounded-lg border border-transparent hover:border-white/[0.08]"
              >
                <span>Visit Main Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href="tel:+14097976986"
                className="btn-call-glowing text-xs font-display font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.6)]"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span className="hidden sm:inline">Call Propello:</span>
                <span>+1 (409) 797-6986</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT CONTENT */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* =========================================================================
            C. HERO SECTION
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/35 bg-cyan-950/30 text-cyan-400 text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>OFFICIAL BANK TRANSFER</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Payment Details
          </h1>

          {/* Subline */}
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Use the details below to send your payment to Propello.
          </p>
        </div>

        {/* =========================================================================
            D. COMPLIANCE PAYMENT GUIDELINES (PULSING GLOWING RED CARDS)
            Positioned directly above the bank details container.
            Two cards side-by-side on desktop, stacked on mobile.
            ========================================================================= */}
        <section aria-label="Compliance Payment Guidelines" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Card 1: Business Accounts Only */}
            <div className="relative rounded-2xl bg-[#0F090C] border border-red-500/35 p-5 sm:p-6 animate-pulse-crimson-glow overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-red-beacon inline-block" />
                  REQUIRED ACCOUNT TYPE
                </span>
                <Lock className="w-4 h-4 text-red-400/80" />
              </div>

              <h2 className="text-base sm:text-lg font-display font-bold text-white tracking-tight mb-1.5">
                Business Bank Accounts Only
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Payments can only be received from business bank accounts. Personal bank accounts are not accepted.
              </p>
            </div>

            {/* Card 2: Supported Methods Only */}
            <div className="relative rounded-2xl bg-[#0F090C] border border-red-500/35 p-5 sm:p-6 animate-pulse-crimson-glow overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-red-beacon inline-block" />
                  SUPPORTED METHODS
                </span>
                <Landmark className="w-4 h-4 text-red-400/80" />
              </div>

              <h2 className="text-base sm:text-lg font-display font-bold text-white tracking-tight mb-1.5">
                ACH & Domestic Wire Only
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Both ACH and domestic U.S. wire (Fedwire) transfers are supported only.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            E. BANK DETAILS SECTION (FOCAL POINT)
            - #0A0E15 background
            - Subtle 2px cyan ambient gradient top line
            - Vertical scale-in entrance animation
            - High-readability sans-serif with tabular numbers
            - Persistent copy behavior (stays green permanently)
            - Copy All Details button
            ========================================================================= */}
        <section 
          aria-label="Citibank Bank Details" 
          className="relative rounded-2xl bg-[#0A0E15] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden animate-bank-card-entrance"
        >
          {/* Subtle 2px cyan ambient gradient top line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_12px_#00F0FF]" />

          {/* Card Header info */}
          <div className="px-6 py-4.5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#00F0FF]" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium">
                Verified Citibank Transfer Routing
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
              USD Currency Account
            </span>
          </div>

          {/* ==================== SUBSECTION 1: BANK INFORMATION ==================== */}
          <div className="bg-white/[0.02] px-6 py-3.5 border-b border-white/[0.07] flex items-center gap-2">
            <Landmark className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              Bank Information
            </h3>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {BANK_INFO_FIELDS.map((field) => {
              const isCopied = !!copiedMap[field.id];
              return (
                <div 
                  key={field.id}
                  className="px-6 py-4 sm:py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Field Label */}
                  <div className="sm:w-1/3">
                    <span className="text-xs font-mono tracking-wide uppercase text-zinc-400">
                      {field.label}
                    </span>
                  </div>

                  {/* Value and Copy Button */}
                  <div className="sm:w-2/3 flex items-center justify-between sm:justify-end gap-4">
                    <span 
                      className={`text-sm sm:text-base font-semibold [font-variant-numeric:tabular-nums] tracking-wide transition-colors ${
                        isCopied ? 'text-[#10B981]' : 'text-white'
                      }`}
                    >
                      {field.value}
                    </span>

                    <button
                      onClick={() => handleCopySingle(field)}
                      aria-label={`Copy ${field.label}`}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 select-none ${
                        isCopied 
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
                          : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================== SUBSECTION 2: BENEFICIARY INFORMATION ==================== */}
          <div className="bg-white/[0.02] px-6 py-3.5 border-t border-b border-white/[0.07] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              Beneficiary Information
            </h3>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {BENEFICIARY_INFO_FIELDS.map((field) => {
              const isCopied = !!copiedMap[field.id];
              return (
                <div 
                  key={field.id}
                  className="px-6 py-4 sm:py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Field Label */}
                  <div className="sm:w-1/3">
                    <span className="text-xs font-mono tracking-wide uppercase text-zinc-400">
                      {field.label}
                    </span>
                  </div>

                  {/* Value and Copy Button */}
                  <div className="sm:w-2/3 flex items-center justify-between sm:justify-end gap-4">
                    <span 
                      className={`text-sm sm:text-base font-semibold font-mono tracking-wider break-all sm:break-normal [font-variant-numeric:tabular-nums] transition-colors ${
                        isCopied ? 'text-[#10B981]' : 'text-white'
                      }`}
                    >
                      {field.value}
                    </span>

                    <button
                      onClick={() => handleCopySingle(field)}
                      aria-label={`Copy ${field.label}`}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 select-none ${
                        isCopied 
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
                          : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* "Copy All Details" Action Bar */}
          <div className="p-6 bg-black/40 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 font-sans text-center sm:text-left">
              Single-click to copy all banking parameters in standard wire transfer format.
            </div>

            <button
              onClick={handleCopyAll}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg select-none ${
                allCopied
                  ? 'bg-[#10B981] text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                  : 'bg-[#00F0FF] text-slate-950 hover:bg-[#67e8f9] shadow-[0_0_25px_rgba(0,240,255,0.35)]'
              }`}
            >
              {allCopied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>All Details Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 stroke-[2.5]" />
                  <span>Copy All Details</span>
                </>
              )}
            </button>
          </div>

        </section>

        {/* =========================================================================
            F. "NEED HELP?" AREA
            ========================================================================= */}
        <section aria-label="Transfer Verification Help" className="mt-12 text-center">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-8 max-w-xl mx-auto">
            <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
              Need help with your transfer?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              For verification or wire questions, call our team directly.
            </p>
            <div className="mt-5">
              <a
                href="tel:+14097976986"
                className="btn-call-glowing inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-slate-950 font-display font-bold text-xs sm:text-sm transition-all shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer group"
              >
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Call Propello: +1 (409) 797-6986</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================================
          G. FOOTER
          Minimal dark footer with Propello mark, verification note, and contact details
          ========================================================================= */}
      <footer className="border-t border-white/[0.07] bg-[#05070A] py-10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div 
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else window.location.href = '/';
              }} 
              className="cursor-pointer"
            >
              <PropelloLogo size="sm" />
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <p className="text-xs text-zinc-400 font-sans">
              Official wire instructions for Propello clients. Citibank N.A. Member FDIC.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <a 
              href="mailto:payments@propellonline.com" 
              className="hover:text-cyan-400 transition-colors"
            >
              payments@propellonline.com
            </a>
            <span className="text-zinc-700">•</span>
            <a 
              href="tel:+14097976986" 
              className="hover:text-cyan-400 transition-colors"
            >
              +1 (409) 797-6986
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
