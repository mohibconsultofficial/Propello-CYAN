import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import ScrollRevealProvider from './components/ScrollRevealProvider';
import PropelloLogo from './components/PropelloLogo';
import Hero from './components/Hero';
import Offer from './components/Offer';
import HowItWorks from './components/HowItWorks';
import ReviewsWidget from './components/ReviewsWidget';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaymentDetails from './components/PaymentDetails';
import AccountProfile from './components/AccountProfile';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkIsPaymentRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    return (
      path === '/payment-details' ||
      path === '/payment-details/' ||
      path === '/payment' ||
      path === '/payment/' ||
      path.endsWith('/payment-details') ||
      path.endsWith('/payment-details/') ||
      path.endsWith('/payment') ||
      path.endsWith('/payment/') ||
      hash === '#/payment-details' ||
      hash === '#payment-details' ||
      hash === '#/payment' ||
      hash === '#payment' ||
      search.includes('page=payment-details') ||
      search.includes('page=payment')
    );
  };

  const checkIsAccountRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    return (
      path === '/account/profile' ||
      path === '/account/profile/' ||
      path === '/account' ||
      path === '/account/' ||
      path === '/profile' ||
      path === '/profile/' ||
      path.endsWith('/account/profile') ||
      path.endsWith('/account/profile/') ||
      path.endsWith('/profile') ||
      path.endsWith('/profile/') ||
      hash === '#/account/profile' ||
      hash === '#account/profile' ||
      hash === '#/profile' ||
      hash === '#profile' ||
      search.includes('page=account-profile') ||
      search.includes('page=profile')
    );
  };

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (checkIsAccountRoute()) return '/account/profile';
    if (checkIsPaymentRoute()) return '/payment-details';
    return '/';
  });

  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAccountRoute()) {
        setCurrentRoute('/account/profile');
      } else if (checkIsPaymentRoute()) {
        setCurrentRoute('/payment-details');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    setMobileMenuOpen(false);
    if (path === '/account/profile' || path === '/profile' || path === '/account') {
      try {
        window.history.pushState({}, '', '/account/profile');
      } catch {
        window.location.hash = '/account/profile';
      }
      setCurrentRoute('/account/profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/payment-details' || path === '/payment') {
      try {
        window.history.pushState({}, '', '/payment-details');
      } catch {
        window.location.hash = '/payment-details';
      }
      setCurrentRoute('/payment-details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      try {
        window.history.pushState({}, '', '/');
      } catch {
        window.location.hash = '';
      }
      setCurrentRoute('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentRoute('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dedicated standalone page route for /account/profile
  if (currentRoute === '/account/profile') {
    return (
      <AccountProfile 
        onNavigateHome={() => navigateTo('/')} 
        onNavigateToPayment={() => navigateTo('/payment-details')}
      />
    );
  }

  // Dedicated standalone page route for /payment-details (or /payment)
  if (currentRoute === '/payment-details') {
    return (
      <PaymentDetails 
        onNavigateHome={() => navigateTo('/')} 
        onNavigateToProfile={() => navigateTo('/account/profile')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#030508] text-zinc-100 relative font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Continuous Atmospheric Background (Hardware-accelerated cyan lighting & depth) */}
      <AmbientBackground />
      <CustomCursor />
      <ScrollRevealProvider />

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
              <button
                onClick={() => navigateTo('/payment-details')}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
              >
                Payment Details
              </button>
            </nav>

            {/* Prominent Glowing Call Action */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+14099655019"
                target="_top"
                rel="noopener noreferrer"
                className="btn-call-glowing text-xs font-display font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.6)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
                </span>
                <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>Call: +1 (409) 965-5019</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="tel:+14099655019"
                className="p-2.5 rounded-lg btn-call-glowing text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center"
                aria-label="Call Propello"
              >
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
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
            <button
              onClick={() => navigateTo('/payment-details')}
              className="block w-full text-left py-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Payment Details
            </button>
            <div className="pt-3 border-t border-white/[0.08]">
              <a
                href="tel:+14099655019"
                className="btn-call-glowing w-full py-3.5 rounded-lg font-display font-bold text-center flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(6,182,212,0.6)] text-sm"
              >
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Call +1 (409) 965-5019</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Clean 7-Section Architecture */}
      <main className="relative z-10">
        {/* 1. HERO (with Infinite Niche Scroller) */}
        <div className="scroll-reveal"><Hero onScrollToOffer={() => handleScrollTo('offer')} /></div>

        {/* 2. WHAT WE OFFER */}
        <div className="scroll-reveal"><Offer /></div>

        {/* 3. HOW IT WORKS */}
        <div className="scroll-reveal"><HowItWorks /></div>

        {/* 4. TESTIMONIALS / PROOF */}
        <div className="scroll-reveal"><ReviewsWidget /></div>

        {/* 5. ABOUT PROPELLO.ONLINE */}
        <div className="scroll-reveal"><About /></div>

        {/* 6. CONTACT / CALL CTA */}
        <div className="scroll-reveal"><Contact /></div>
      </main>

      {/* 7. FOOTER */}
      <div className="scroll-reveal">
        <Footer 
          onScrollToSection={handleScrollTo} 
          onNavigateToPayment={() => navigateTo('/payment-details')}
          onNavigateToProfile={() => navigateTo('/account/profile')}
        />
      </div>

    </div>
  );
}
