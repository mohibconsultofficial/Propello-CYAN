import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Building2, 
  Globe, 
  Check, 
  X, 
  ArrowLeft, 
  ExternalLink, 
  CreditCard, 
  Server, 
  HardDrive, 
  RefreshCw
} from 'lucide-react';
import PropelloLogo from './PropelloLogo';
import { BusinessProfile, INITIAL_BUSINESS_PROFILE } from '../data/profileData';

interface AccountProfileProps {
  onNavigateHome: () => void;
  onNavigateToPayment: () => void;
}

export default function AccountProfile({ onNavigateHome, onNavigateToPayment }: AccountProfileProps) {
  // Current Profile State
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem('propello_business_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
    return INITIAL_BUSINESS_PROFILE;
  });

  // Storage destination tracker: 'server' or 'local'
  const [syncSource, setSyncSource] = useState<'server' | 'local'>('local');
  const [isLoading, setIsLoading] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Fetch from server on mount
  useEffect(() => {
    let isMounted = true;
    const fetchServerProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data && data.profile && isMounted) {
            setProfile(data.profile);
            setSyncSource(data.source === 'server' ? 'server' : 'local');
            try {
              localStorage.setItem('propello_business_profile', JSON.stringify(data.profile));
            } catch {
              // Ignore
            }
          }
        }
      } catch (e) {
        console.warn('Profile server fetch fallback to local cache:', e);
        if (isMounted) {
          setSyncSource('local');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchServerProfile();
    return () => {
      isMounted = false;
    };
  }, []);


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
          PAGE HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080B10]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Back button & Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateHome}
                type="button"
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors py-1.5 px-2.5 rounded-lg border border-white/[0.08] hover:border-cyan-500/30 bg-white/[0.02] cursor-pointer"
                title="Back to Propello Home"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back</span>
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
                onClick={onNavigateToPayment}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-colors py-2 px-3 rounded-lg border border-white/[0.08] hover:border-cyan-500/30 bg-white/[0.02] cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Payment Details</span>
              </button>

              <a
                href="https://propello.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors py-2 px-3 rounded-lg border border-transparent hover:border-white/[0.08]"
              >
                <span>Visit Main Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT CONTENT */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">

        {/* Success Alert Banner */}
        {successBanner && (
          <div 
            role="status" 
            aria-live="polite"
            className="mb-8 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-sans flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successBanner}</span>
            </div>
            <button 
              onClick={() => setSuccessBanner(null)}
              className="text-emerald-400/80 hover:text-emerald-200 cursor-pointer p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =========================================================================
            HERO / PAGE TITLE
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/35 bg-cyan-950/30 text-cyan-400 text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>BUSINESS ACCOUNT</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Account Profile
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Manage your business identity and account information.
          </p>
        </div>

        {/* =========================================================================
            PROFILE SUMMARY CARD
            ========================================================================= */}
        <section 
          aria-label="Profile Summary"
          className="relative rounded-2xl bg-[#0A0E15] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden mb-8"
        >
          {/* Cyan top gradient line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_12px_#00F0FF]" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
              
              {/* Avatar & Key Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-xl font-display font-bold text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] shrink-0">
                  {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AJ'}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      {profile.fullName}
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
                    {profile.businessName} • {profile.industry}
                  </p>
                </div>
              </div>



            </div>

            {/* Storage / Sync Status Indicator */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                {syncSource === 'server' ? (
                  <>
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-zinc-300">Server-persisted account data</span>
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-zinc-400">Local-only business profile storage</span>
                  </>
                )}
                {isLoading && (
                  <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin ml-1" />
                )}
              </div>
              <div className="text-[11px] text-zinc-500">
                Last updated: {new Date(profile.updatedAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            PROFILE DETAILS & BUSINESS IDENTITY SECTIONS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* SECTION 1: BUSINESS & CONTACT INFORMATION */}
          <section 
            aria-label="Contact Information"
            className="rounded-2xl bg-[#0A0E15] border border-white/[0.08] p-6 flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06] mb-5">
                <Mail className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-200 font-semibold">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Full Name
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {profile.fullName}
                  </span>
                </div>

                {/* Email Address */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Email Address
                  </span>
                  <a 
                    href={`mailto:${profile.email}`}
                    className="text-sm sm:text-base font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors break-all inline-flex items-center gap-1.5"
                    title={`Send email to ${profile.email}`}
                  >
                    <span>{profile.email}</span>
                    <ExternalLink className="w-3 h-3 text-cyan-500 shrink-0" />
                  </a>
                </div>

                {/* Primary Phone Number */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Primary Phone Number
                  </span>
                  <a 
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="text-sm sm:text-base font-semibold font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1.5"
                    title={`Call ${profile.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{profile.phone}</span>
                  </a>
                </div>

                {/* Industry or Trade */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Industry or Trade
                  </span>
                  <span className="text-sm sm:text-base font-medium text-zinc-200 leading-relaxed block">
                    {profile.industry}
                  </span>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-400">
              Primary communication contact for client accounts.
            </div>
          </section>

          {/* SECTION 2: BUSINESS IDENTITY & CLASSIFICATION */}
          <section 
            aria-label="Business Identity"
            className="rounded-2xl bg-[#0A0E15] border border-white/[0.08] p-6 flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06] mb-5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-200 font-semibold">
                  Business Identity
                </h3>
              </div>

              <div className="space-y-4">
                
                {/* Business Name */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Business Name
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {profile.businessName}
                  </span>
                </div>

                {/* Website */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Website
                  </span>
                  <a 
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>{profile.website}</span>
                    <ExternalLink className="w-3 h-3 text-cyan-500 shrink-0" />
                  </a>
                </div>

                {/* Account Holder / Beneficiary Name */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Account Holder / Beneficiary Name
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {profile.accountHolder || profile.fullName}
                  </span>
                </div>

                {/* Business Classification */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-zinc-400 block mb-1">
                    Business Classification
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Digital & IT Services / Web Solutions</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-400">
              Verified business identity parameters for Propello.online.
            </div>
          </section>

        </div>

        {/* =========================================================================
            LINK TO PAYMENT DETAILS CARD
            ========================================================================= */}
        <section 
          aria-label="Payment Details Reference"
          className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 via-transparent to-cyan-950/10 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mx-auto sm:mx-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                Citibank Payment & Wire Instructions
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5">
                Official Citibank ACH & Fedwire routing details for beneficiary {profile.fullName}.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToPayment}
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.25)] shrink-0"
          >
            <span>View Payment Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </section>

      </main>



      {/* =========================================================================
          PAGE FOOTER
          ========================================================================= */}
      <footer className="border-t border-white/[0.07] bg-[#05070A] py-10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div onClick={onNavigateHome} className="cursor-pointer">
              <PropelloLogo size="sm" />
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <p className="text-xs text-zinc-400 font-sans">
              Official business identity for Propello.online client accounts.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <button
              onClick={onNavigateToPayment}
              type="button"
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Payment Details
            </button>
            <span>•</span>
            <button
              onClick={onNavigateHome}
              type="button"
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Home
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
