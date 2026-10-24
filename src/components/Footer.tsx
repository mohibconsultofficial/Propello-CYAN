import PropelloLogo from './PropelloLogo';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/[0.08] relative z-10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div 
              onClick={scrollToTop}
              className="cursor-pointer inline-block group"
            >
              <PropelloLogo size="md" />
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              High-performance websites, brand assets, and digital visibility engineered specifically for contractors and specialty trade professionals.
            </p>
            <div className="text-[11px] font-mono text-zinc-500">
              Founder: Mo Radford • PROPELLO.ONLINE
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onScrollToSection('offer')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  What We Offer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('how-it-works')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('work')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Built With Purpose
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  About PROPELLO.ONLINE
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Start Your Project
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white block">
              Platform Standards
            </span>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>$1,500 Setup + $97/mo Service</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Working Prototype Review</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% Client Domain Ownership</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero Long-Term Contracts</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} PROPELLO.ONLINE. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Enterprise Cloud Architecture</span>
            <span>•</span>
            <span>SSL Secured</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
