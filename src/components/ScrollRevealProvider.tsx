import { useEffect } from 'react';

export default function ScrollRevealProvider() {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Remove revealed when scrolling out so it animates both in and out dynamically
          entry.target.classList.remove('revealed');
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const updateObservers = () => {
      const elements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale-up'
      );
      elements.forEach((el) => observer.observe(el));
    };

    updateObservers();

    // Periodic check for newly rendered elements (dynamic routing / tabs)
    const interval = setInterval(updateObservers, 1500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}
