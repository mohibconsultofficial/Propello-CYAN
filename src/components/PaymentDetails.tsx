import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowLeft, 
  User, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Printer, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Lock,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import PropelloLogo from './PropelloLogo';
import { BANKING_DETAILS } from '../data/profileData';

interface PaymentDetailsProps {
  onNavigateHome: () => void;
  onNavigateToProfile: () => void;
}

export default function PaymentDetails({ onNavigateHome, onNavigateToProfile }: PaymentDetailsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCopyAll = () => {
    const fullText = `
PROPELLO - OFFICIAL WIRE & ACH PAYMENT INSTRUCTIONS
===================================================
Beneficiary Name: ${BANKING_DETAILS.beneficiaryName}
Bank Name:        ${BANKING_DETAILS.bankName}
Bank Address:     ${BANKING_DETAILS.bankAddress}
Account Number:   ${BANKING_DETAILS.accountNumber}
Routing Number:   ${BANKING_DETAILS.routingNumber}
SWIFT / BIC Code: ${BANKING_DETAILS.swiftCode}
Account Type:     ${BANKING_DETAILS.accountType}

Remittance Confirmation: payments@propellonline.com
Direct Support: +1 (409) 797-6986
Website: https://propello.online
===================================================
`.trim();

    navigator.clipboard.writeText(fullText);
    setCopyAllStatus(true);
    setTimeout(() => {
      setCopyAllStatus(false);
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030508] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background Ambience: Subtle deep tech grid & faint glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.12) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px'
        }}
      />

      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#030508]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Back button & Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateHome}
                type="button"
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors py-1.5 px-3 rounded-lg border border-white/[0.08] hover:border-cyan-500/30 bg-white/[0.02] cursor-pointer"
                title="Back to Propello Home"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back Home</span>
              </button>

              <div 
                onClick={onNavigateHome}
                className="cursor-pointer group flex items-center"
              >
                <PropelloLogo size="md" />
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={onNavigateToProfile}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-colors py-2 px-3 rounded-lg border border-white/[0.08] hover:border-cyan-500/30 bg-white/[0.02] cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Account Profile</span>
              </button>

              <a
                href="tel:+14097976986"
                className="btn-call-glowing text-xs font-display font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span className="hidden sm:inline">Call Founder:</span>
                <span>+1 (409) 797-6986</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTENT AREA
          ========================================================================= */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        
        {/* Page Heading & Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIRECT SETTLEMENT & WIRE PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Banking & Wire Transfer Details
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Direct ACH, domestic wire, or international SWIFT transfer instructions for Propello invoices and turnkey project setups.
          </p>
        </div>

        {/* Action Bar (Print / Copy All) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-zinc-300">
              Citibank Verified Corporate Account Active
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span>Print Wire Slip</span>
            </button>

            <button
              onClick={handleCopyAll}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              {copyAllStatus ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>All Details Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Instructions</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* FinTech Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bank Card (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Holographic Industrial Card Chassis */}
            <div className="glass-panel-deep rounded-2xl p-6 sm:p-8 border border-cyan-500/25 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-bank-card-entrance">
              
              {/* Corner Watermark */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Bank Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-white tracking-wide">
                      {BANKING_DETAILS.bankName}
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      United States Member FDIC
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Entity</span>
                </div>
              </div>

              {/* Account Data Fields */}
              <div className="mt-6 space-y-4">
                
                {/* Beneficiary Name */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors group">
                  <div className="mb-2 sm:mb-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Beneficiary Account Name
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white mt-0.5">
                      {BANKING_DETAILS.beneficiaryName}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(BANKING_DETAILS.beneficiaryName, 'beneficiary')}
                    className="self-end sm:self-auto inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-cyan-300 py-1 px-2 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    {copiedKey === 'beneficiary' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Number */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors group">
                  <div className="mb-2 sm:mb-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <span>Account Number</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        {BANKING_DETAILS.accountType}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-cyan-300 mt-0.5 tabular-nums-fintech tracking-wider">
                      {BANKING_DETAILS.accountNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(BANKING_DETAILS.accountNumber, 'accountNumber')}
                    className="self-end sm:self-auto inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-cyan-300 py-1 px-2 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    {copiedKey === 'accountNumber' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Routing & SWIFT in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Routing Number (ACH / Domestic Wire) */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors group flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        Routing (ABA / ACH)
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-white mt-1 tabular-nums-fintech">
                        {BANKING_DETAILS.routingNumber}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(BANKING_DETAILS.routingNumber, 'routing')}
                      className="mt-3 self-start inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-cyan-300 py-1 px-2 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      {copiedKey === 'routing' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* SWIFT / BIC Code */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors group flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        SWIFT / BIC Code
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-white mt-1 tabular-nums-fintech">
                        {BANKING_DETAILS.swiftCode}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(BANKING_DETAILS.swiftCode, 'swift')}
                      className="mt-3 self-start inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-cyan-300 py-1 px-2 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      {copiedKey === 'swift' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Bank Physical Address */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors group">
                  <div className="mb-2 sm:mb-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Bank Physical Address
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300 mt-0.5 font-sans">
                      {BANKING_DETAILS.bankAddress}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(BANKING_DETAILS.bankAddress, 'bankAddress')}
                    className="self-end sm:self-auto inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-cyan-300 py-1 px-2 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    {copiedKey === 'bankAddress' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Wire Remittance Notification Footer */}
              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>256-bit Secure Banking Channel</span>
                </div>
                <span>USD Currency Only</span>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing Transparency & Remittance Note (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Package Summary Card */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/[0.08] space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Transparent Invoicing
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Fixed Pricing
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display font-semibold text-white text-sm block">
                        Turnkey Setup Package
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                        First Month Hosting Included Free
                      </span>
                    </div>
                    <span className="font-mono font-bold text-cyan-300 text-lg">
                      $1,500
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Complete build, mobile speed tuning, local trade SEO & working prototype review prior to final balance. First month hosting included free.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display font-semibold text-white text-sm block">
                        Managed Hosting & Care
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Begins in Month 2
                      </span>
                    </div>
                    <span className="font-mono font-bold text-white text-lg">
                      $97 <span className="text-xs text-zinc-400 font-normal">/ mo</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enterprise CDN, continuous SSL, unlimited quick updates & direct phone line with founder Mo Radford.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.08] space-y-3">
                <div className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Zero long-term lock-in contracts</span>
                </div>
                <div className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Working interactive prototype review included</span>
                </div>
                <div className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% full code & domain ownership</span>
                </div>
              </div>
            </div>

            {/* Remittance Advice Card */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Remittance Advice
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Once your wire or ACH transfer has been initiated, please email confirmation or payment reference to:
              </p>
              <a 
                href="mailto:payments@propellonline.com?subject=Propello%20Payment%20Remittance%20Notice"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors bg-cyan-950/50 px-3 py-2 rounded-lg border border-cyan-500/30"
              >
                <span>payments@propellonline.com</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
              <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-cyan-500/20">
                Direct accounting questions? Call Mo Radford at +1 (409) 797-6986.
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer minimal bar */}
      <footer className="border-t border-white/[0.08] bg-zinc-950/80 py-6 text-center text-xs font-mono text-zinc-400 relative z-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Propello.online • Citibank Wire Routing: {BANKING_DETAILS.routingNumber}
          </div>
          <button
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Homepage
          </button>
        </div>
      </footer>

    </div>
  );
}
