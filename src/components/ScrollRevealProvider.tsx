import { useEffect } from 'react';

export default function ScrollRevealProvider() {
  useEffect(() => {
    // If reduced motion is requested or in SSR, reveal everything immediately
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealSelector = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale-up';

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll(revealSelector).forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Keep it revealed once in view
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px 40px 0px',
        threshold: 0.02,
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(revealSelector);
      elements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    };

    // Initial check
    observeAll();

    // In case dynamic elements mount or route updates
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Fallback timer to ensure initial above-the-fold content is revealed instantly
    const initialTimer = setTimeout(() => {
      document.querySelectorAll(revealSelector).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('revealed');
        }
      });
    }, 150);

    return () => {
      clearTimeout(initialTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
