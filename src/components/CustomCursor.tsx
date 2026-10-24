import { useEffect, useRef } from 'react';

type CursorMode = 'default' | 'button' | 'card' | 'text' | 'link';

/**
 * CustomCursor:
 * - Desktop-only high-precision interactive cursor tracker.
 * - Retains the tiny glowing orb aesthetic requested by the user.
 * - Dynamically & uniquely morphs when hovering over:
 *   1. Buttons: expands into energetic magnetic aura ring with radiant core.
 *   2. Cards: opens into wide soft holographic radar lens.
 *   3. Text / Headers: morphs into a sleek vertical high-precision beam.
 *   4. Links: agile cyan snap ring.
 * - Completely inactive on mobile & touch devices to guarantee zero Safari/iOS lag.
 */
export default function CustomCursor() {
  const sparkRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Completely disable on mobile and touch devices to prevent any Safari/iOS lag
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const spark = sparkRef.current;
    const ring = ringRef.current;
    if (!spark || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let currentMode: CursorMode = 'default';
    let animId: number;

    const applyModeStyles = (mode: CursorMode) => {
      if (!spark || !ring) return;

      if (mode === 'button') {
        // Button: magnetic energy ring expansion & vibrant glowing core
        spark.style.width = '10px';
        spark.style.height = '10px';
        spark.style.borderRadius = '9999px';
        spark.style.boxShadow = '0 0 14px #22d3ee, 0 0 28px #06b6d4, 0 0 42px rgba(6,182,212,0.8)';

        ring.style.width = '38px';
        ring.style.height = '38px';
        ring.style.borderColor = 'rgba(34, 211, 238, 0.95)';
        ring.style.backgroundColor = 'rgba(6, 182, 212, 0.12)';
        ring.style.boxShadow = '0 0 22px rgba(6, 182, 212, 0.5)';
      } else if (mode === 'card') {
        // Card: soft diffused luminous radar disc / tech lens
        spark.style.width = '6px';
        spark.style.height = '6px';
        spark.style.borderRadius = '9999px';
        spark.style.boxShadow = '0 0 8px #22d3ee, 0 0 16px rgba(6,182,212,0.6)';

        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = 'rgba(6, 182, 212, 0.45)';
        ring.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
        ring.style.boxShadow = '0 0 26px rgba(6, 182, 212, 0.25)';
      } else if (mode === 'text') {
        // Text: sleek vertical precision beam / reading focus
        spark.style.width = '2.5px';
        spark.style.height = '18px';
        spark.style.borderRadius = '9999px';
        spark.style.boxShadow = '0 0 10px #22d3ee, 0 0 20px rgba(6,182,212,0.7)';

        ring.style.width = '16px';
        ring.style.height = '16px';
        ring.style.borderColor = 'rgba(6, 182, 212, 0.3)';
        ring.style.backgroundColor = 'transparent';
        ring.style.boxShadow = 'none';
      } else if (mode === 'link') {
        // Link: agile cyan ring snap
        spark.style.width = '8px';
        spark.style.height = '8px';
        spark.style.borderRadius = '9999px';
        spark.style.boxShadow = '0 0 10px #22d3ee, 0 0 20px #06b6d4';

        ring.style.width = '28px';
        ring.style.height = '28px';
        ring.style.borderColor = 'rgba(34, 211, 238, 0.85)';
        ring.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
        ring.style.boxShadow = '0 0 14px rgba(6, 182, 212, 0.35)';
      } else {
        // Default: tiny glowing orb + micro trailing aura
        spark.style.width = '8px';
        spark.style.height = '8px';
        spark.style.borderRadius = '9999px';
        spark.style.boxShadow = '0 0 8px #22d3ee, 0 0 16px #06b6d4, 0 0 24px rgba(6,182,212,0.8)';

        ring.style.width = '20px';
        ring.style.height = '20px';
        ring.style.borderColor = 'rgba(6, 182, 212, 0.35)';
        ring.style.backgroundColor = 'rgba(6, 182, 212, 0.04)';
        ring.style.boxShadow = '0 0 12px rgba(6, 182, 212, 0.25)';
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        spark.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Check element under cursor
      const target = e.target as HTMLElement | null;
      let newMode: CursorMode = 'default';

      if (target) {
        if (
          target.closest('button, [role="button"], .btn-call-glowing, .btn-cta-illuminated, [data-cursor="button"]')
        ) {
          newMode = 'button';
        } else if (
          target.closest('[data-cursor="card"], .glass-panel-deep, .glass-panel-interactive, [class*="glass-panel"], article')
        ) {
          newMode = 'card';
        } else if (
          target.closest('h1, h2, h3, h4, p, [data-cursor="header-text"], [data-cursor="text"]')
        ) {
          newMode = 'text';
        } else if (
          target.tagName === 'A' ||
          target.closest('a') !== null ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('[data-cursor="pointer"]') !== null
        ) {
          newMode = 'link';
        }
      }

      if (newMode !== currentMode) {
        currentMode = newMode;
        applyModeStyles(currentMode);
      }

      // Immediately place spark at pointer coordinates
      spark.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      spark.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      spark.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Smooth lerp loop for the trailing micro-aura / lens
    const updateRing = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Tiny Glowing Orb (Direct contact point with unique morphing capability) */}
      <div
        ref={sparkRef}
        style={{
          width: '8px',
          height: '8px',
          boxShadow: '0 0 8px #22d3ee, 0 0 16px #06b6d4, 0 0 24px rgba(6,182,212,0.8)'
        }}
        className="fixed top-0 left-0 rounded-full bg-gradient-to-tr from-cyan-300 via-white to-cyan-100 opacity-0 transition-[width,height,border-radius,box-shadow,opacity] duration-200 ease-out pointer-events-none will-change-transform"
      />

      {/* Trailing Micro-Aura / Radar Lens Ring */}
      <div
        ref={ringRef}
        style={{
          width: '20px',
          height: '20px',
          borderColor: 'rgba(6, 182, 212, 0.35)',
          backgroundColor: 'rgba(6, 182, 212, 0.04)',
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.25)'
        }}
        className="fixed top-0 left-0 rounded-full border opacity-0 transition-[width,height,border-color,background-color,box-shadow,opacity] duration-250 ease-out pointer-events-none will-change-transform"
      />
    </div>
  );
}
