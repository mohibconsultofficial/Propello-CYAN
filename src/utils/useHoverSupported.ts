import { useState, useEffect } from 'react';

/**
 * useHoverSupported:
 * Returns true only on devices with fine pointer input (mouse / trackpad)
 * that support true hover. Returns false on touchscreens / mobile devices.
 * 
 * Prevents mobile touch scrolls from firing Framer Motion's whileHover,
 * which causes cards to jump, stutter, and shift position under user fingers.
 */
export function useHoverSupported(): boolean {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasHover(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return hasHover;
}
