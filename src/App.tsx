import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import AmbientBackground from './components/AmbientBackground';
import PropelloLogo from './components/PropelloLogo';
import Hero from './components/Hero';
import Offer from './components/Offer';
import HowItWorks from './components/HowItWorks';
import ReviewsWidget from './components/ReviewsWidget';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] text-zinc-100 relative font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Continuous Atmospheric Background (Hardware-accelerated cyan lighting & depth) */}
      <AmbientBackground />

      {/* Simplified High-End Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.08] bg-[#030508]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo with Animated Bolt */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer select-none group"
            >
              <PropelloLogo size="md" />
            </div>

            {/* Streamlined Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
              <button
                onClick={() => handleScrollTo('offer')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                What We Offer
              </button>
              <button
                onClick={() => handleScrollTo('how-it-works')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => handleScrollTo('reviews')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>

            {/* Prominent Call Action */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+14099655019"
                target="_top"
                rel="noopener noreferrer"
                className="btn-cta-illuminated text-xs font-display font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950" />
                <span>Call: +1 (409) 965-5019</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="tel:+14099655019"
                className="p-2.5 rounded-lg border border-cyan-500/30 text-cyan-400 bg-cyan-950/40"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg border border-white/[0.1] text-zinc-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-zinc-950/95 px-6 py-5 space-y-3 text-xs font-mono backdrop-blur-xl">
            <button
              onClick={() => handleScrollTo('offer')}
              className="block w-full text-left py-2 text-zinc-300 hover:text-cyan-300"
            >
              What We Offer
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="block w-full text-left py-2 text-zinc-300 hover:text-cyan-300"
            >
              How It Works
            </button>
            <button
              onClick={() => handleScrollTo('reviews')}
              className="block w-full text-left py-2 text-zinc-300 hover:text-cyan-300"
            >
              Reviews
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="block w-full text-left py-2 text-zinc-300 hover:text-cyan-300"
            >
              About
            </button>
            <div className="pt-3 border-t border-white/[0.08]">
              <a
                href="tel:+14099655019"
                className="btn-cta-illuminated w-full py-3 rounded-lg font-display font-semibold text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 fill-slate-950" />
                <span>Call +1 (409) 965-5019</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Clean 7-Section Architecture */}
      <main className="relative z-10">
        {/* 1. HERO (with Infinite Niche Scroller) */}
        <Hero onScrollToOffer={() => handleScrollTo('offer')} />

        {/* 2. WHAT WE OFFER */}
        <Offer />

        {/* 3. HOW IT WORKS */}
        <HowItWorks />

        {/* 4. TESTIMONIALS / PROOF */}
        <ReviewsWidget />

        {/* 5. ABOUT PROPELLO */}
        <About />

        {/* 6. CONTACT / CALL CTA */}
        <Contact />
      </main>

      {/* 7. FOOTER */}
      <Footer onScrollToSection={handleScrollTo} />

      {/* Interactive Ambient AI Assistant */}
      <AIChatbot />

    </div>
  );
}
