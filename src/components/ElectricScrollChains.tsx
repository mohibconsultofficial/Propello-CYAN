import { useEffect, useRef } from 'react';

/**
 * ElectricScrollChains:
 * Implements the immersive electric scrolling experience where animated lightning chains
 * visibly emerge along the left and right outer edges during page scrolling,
 * and elegantly dissolve through a deliberate exit animation when scrolling stops.
 */
export default function ElectricScrollChains() {
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!leftCanvas || !rightCanvas) return;

    const leftCtx = leftCanvas.getContext('2d');
    const rightCtx = rightCanvas.getContext('2d');
    if (!leftCtx || !rightCtx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;

    const resize = () => {
      isMobile = window.innerWidth < 768;
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.min(Math.max(window.innerWidth < 640 ? 32 : 80, 28), 90);
      height = window.innerHeight;

      leftCanvas.width = Math.floor(width * dpr);
      leftCanvas.height = Math.floor(height * dpr);
      leftCanvas.style.width = `${width}px`;
      leftCanvas.style.height = `${height}px`;

      rightCanvas.width = Math.floor(width * dpr);
      rightCanvas.height = Math.floor(height * dpr);
      rightCanvas.style.width = `${width}px`;
      rightCanvas.style.height = `${height}px`;

      leftCtx.scale(dpr, dpr);
      rightCtx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let isScrolling = false;
    let scrollStopTimer: any = null;
    let animFrameId: number | null = null;
    let currentAlpha = 0;
    let targetAlpha = 0;

    interface Point {
      x: number;
      y: number;
    }

    // Procedural multi-strand electric lightning arc
    const drawBolt = (
      ctx: CanvasRenderingContext2D,
      isRight: boolean,
      alpha: number,
      time: number
    ) => {
      ctx.clearRect(0, 0, width, height);
      if (alpha <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = alpha;

      const originX = isRight ? width - 4 : 4;
      const inwardDirection = isRight ? -1 : 1;
      const maxReach = width * 0.85;

      // 2 intertwining electric lightning chains
      for (let strand = 0; strand < 2; strand++) {
        const segCount = Math.floor(height / 40);
        const segH = height / segCount;
        const pts: Point[] = [{ x: originX, y: 0 }];

        for (let i = 1; i < segCount; i++) {
          const y = i * segH;
          const sineWave = Math.sin(y * 0.018 + time * 0.008 + strand * 3.5) * (maxReach * 0.4);
          const jitter = (Math.random() - 0.5) * (maxReach * 0.55);
          const x = originX + Math.abs(sineWave + jitter) * inwardDirection;
          pts.push({ x: Math.max(2, Math.min(width - 2, x)), y });
        }
        pts.push({ x: originX, y: height });

        // Outer Neon Cyan Halo Line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.strokeStyle = strand === 0 ? '#00f2fe' : '#22d3ee';
        ctx.lineWidth = strand === 0 ? 3.5 : 2;
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = isMobile ? 3 : 18;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Inner Ultra-Bright White Hot Core
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = isMobile ? 2 : 6;
        ctx.stroke();

        // High-energy branching lightning discharges
        if (Math.random() > 0.3) {
          const branchIdx = Math.floor(Math.random() * (pts.length - 2)) + 1;
          const root = pts[branchIdx];
          const midX = root.x + (Math.random() * 16 + 6) * inwardDirection;
          const midY = root.y + (Math.random() * 24 - 12);
          const endX = midX + (Math.random() * 14 + 4) * inwardDirection;
          const endY = midY + (Math.random() * 20 - 10);

          ctx.beginPath();
          ctx.moveTo(root.x, root.y);
          ctx.lineTo(midX, midY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = 'rgba(165, 243, 252, 0.9)';
          ctx.lineWidth = 1;
          ctx.shadowColor = '#22d3ee';
          ctx.shadowBlur = isMobile ? 2 : 8;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const loop = (timestamp: number) => {
      // Fast attack when scrolling, smooth deliberate dissolution when stopping
      const rate = isScrolling ? 0.3 : 0.08;
      currentAlpha += (targetAlpha - currentAlpha) * rate;

      drawBolt(leftCtx, false, currentAlpha, timestamp);
      drawBolt(rightCtx, true, currentAlpha, timestamp + 250);

      if (isScrolling || currentAlpha > 0.01) {
        animFrameId = requestAnimationFrame(loop);
      } else {
        currentAlpha = 0;
        leftCtx.clearRect(0, 0, width, height);
        rightCtx.clearRect(0, 0, width, height);
        animFrameId = null;
      }
    };

    const onScroll = () => {
      isScrolling = true;
      targetAlpha = 0.95;

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(loop);
      }

      if (scrollStopTimer) clearTimeout(scrollStopTimer);

      // Debounce: trigger deliberate dissolution exit 160ms after scrolling ceases
      scrollStopTimer = setTimeout(() => {
        isScrolling = false;
        targetAlpha = 0;
      }, 160);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-35 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Left Outer Edge Lightning Canvas */}
      <canvas
        ref={leftCanvasRef}
        className="fixed top-0 left-0 h-full pointer-events-none"
      />

      {/* Right Outer Edge Lightning Canvas */}
      <canvas
        ref={rightCanvasRef}
        className="fixed top-0 right-0 h-full pointer-events-none"
      />
    </div>
  );
}
