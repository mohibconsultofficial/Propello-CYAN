import { Phone, Mail, ArrowUp } from 'lucide-react';
import PropelloLogo from './PropelloLogo';

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
              High-quality websites built for businesses of all kinds. Fast turnaround, transparent pricing, and zero agency runaround.
            </p>
            <div className="text-[11px] font-mono text-zinc-400">
              Founder: Mo Radford • +1 (409) 965-5019
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
                  onClick={() => onScrollToSection('reviews')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Client Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  About Propello
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white block">
              Direct Contact
            </span>
            <div className="space-y-2.5 text-xs">
              <a 
                href="tel:+14099655019" 
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono">+1 (409) 965-5019</span>
              </a>
              <a 
                href="mailto:mo.radford@propello.online" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>mo.radford@propello.online</span>
              </a>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">
                48-Hour Live Mobile Delivery
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} Propello. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
