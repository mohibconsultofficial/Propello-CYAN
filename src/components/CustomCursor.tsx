import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -500,
      y: -500,
      targetX: -500,
      targetY: -500,
      active: false,
      isClicking: false
    };

    interface ExpandingShockCurrent {
      originX: number;
      originY: number;
      angle: number;
      maxDist: number;
      currentDist: number;
      speed: number;
      alpha: number;
    }

    const expandingCurrents: ExpandingShockCurrent[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseDown = () => { 
      mouse.isClicking = true; 
      const count = 10;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        expandingCurrents.push({
          originX: mouse.x,
          originY: mouse.y,
          angle,
          maxDist: 70 + Math.random() * 40,
          currentDist: 5,
          speed: 7 + Math.random() * 3,
          alpha: 1.0
        });
      }
    };

    const handleMouseUp = () => { mouse.isClicking = false; };
    const handleMouseLeave = () => { mouse.active = false; };
    const handleMouseEnter = () => { mouse.active = true; };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;

    // Helper to draw jagged fractal lightning between two points
    const drawJaggedSegment = (
      context: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displacement: number,
      detail: number,
      alpha: number,
      widthMultiplier: number,
      isCallSuperCharged: boolean
    ) => {
      const points: { x: number; y: number }[] = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      for (let step = 0; step < detail; step++) {
        const newPoints: { x: number; y: number }[] = [];
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * displacement;
          const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * displacement;
          newPoints.push(p1, { x: midX, y: midY });
        }
        newPoints.push(points[points.length - 1]);
        points.splice(0, points.length, ...newPoints);
        displacement *= 0.5;
      }

      if (points.length < 2) return;

      // Outer glow pass
      context.strokeStyle = isCallSuperCharged ? `rgba(34, 211, 238, ${alpha})` : `rgba(6, 182, 212, ${alpha * 0.7})`;
      context.lineWidth = (isCallSuperCharged ? 3.5 : 2) * widthMultiplier;
      context.shadowColor = isCallSuperCharged ? '#ffffff' : '#06b6d4';
      context.shadowBlur = isCallSuperCharged ? 25 : 12;
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.stroke();

      // Inner core pass
      context.strokeStyle = isCallSuperCharged ? '#ffffff' : `rgba(34, 211, 238, ${alpha})`;
      context.lineWidth = (isCallSuperCharged ? 1.8 : 1) * widthMultiplier;
      context.shadowColor = '#22d3ee';
      context.shadowBlur = isCallSuperCharged ? 15 : 6;
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.stroke();
    };

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.85;
      mouse.y += (mouse.targetY - mouse.y) * 0.85;

      ctx.clearRect(0, 0, width, height);

      if (mouse.active && mouse.x > 0) {
        // Render shooting outward expanding shock currents
        for (let i = expandingCurrents.length - 1; i >= 0; i--) {
          const ec = expandingCurrents[i];
          ec.currentDist += ec.speed;
          ec.alpha = Math.max(0, 1 - ec.currentDist / ec.maxDist);

          if (ec.alpha <= 0 || ec.currentDist >= ec.maxDist) {
            expandingCurrents.splice(i, 1);
            continue;
          }

          const startX = ec.originX + Math.cos(ec.angle) * (ec.currentDist - ec.speed * 2);
          const startY = ec.originY + Math.sin(ec.angle) * (ec.currentDist - ec.speed * 2);
          const endX = ec.originX + Math.cos(ec.angle) * ec.currentDist;
          const endY = ec.originY + Math.sin(ec.angle) * ec.currentDist;

          ctx.save();
          drawJaggedSegment(ctx, startX, startY, endX, endY, 15, 3, ec.alpha, 1.2, false);
          ctx.restore();
        }

        // Target UI elements for Tesla arcing
        const elements = document.querySelectorAll('button, a, input, textarea, [role="button"], .card, .glass-panel, h1, h2, h3, h4, .btn-call-glowing');
        const targets: { x: number; y: number; isCall: boolean }[] = [];
        const range = 130;

        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 5 && rect.height > 5) {
            const cx = Math.max(rect.left, Math.min(mouse.x, rect.right));
            const cy = Math.max(rect.top, Math.min(mouse.y, rect.bottom));
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < range) {
              const isCall = 
                el.classList.contains('btn-call-glowing') ||
                el.closest('.btn-call-glowing') !== null ||
                (el as HTMLAnchorElement).href?.includes('tel:') ||
                el.closest('a[href^="tel:"]') !== null;
              targets.push({ x: cx, y: cy, isCall: !!isCall });
            }
          }
        });

        ctx.save();

        targets.sort((a, b) => {
          const da = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          const db = Math.hypot(b.x - mouse.x, b.y - mouse.y);
          return da - db;
        });

        // Only supercharge glow when an electric shock bolt is ACTIVELY ATTACHED to a call button
        if (targets.length > 0) {
          const t = targets[0];
          drawJaggedSegment(ctx, mouse.x, mouse.y, t.x, t.y, t.isCall ? 28 : 20, 3, 0.85, t.isCall ? 1.8 : 0.9, t.isCall);

          ctx.fillStyle = t.isCall ? '#ffffff' : '#22d3ee';
          ctx.shadowColor = t.isCall ? '#ffffff' : '#06b6d4';
          ctx.shadowBlur = t.isCall ? 20 : 8;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.isCall ? 3.5 : 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Ambient corona sparks (subtle)
        const coronaCount = 2;
        for (let i = 0; i < coronaCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 6 + Math.random() * 12;
          const endX = mouse.x + Math.cos(angle) * dist;
          const endY = mouse.y + Math.sin(angle) * dist;
          drawJaggedSegment(ctx, mouse.x, mouse.y, endX, endY, 8, 2, 0.4, 0.5, false);
        }

        // NO CENTRAL CIRCLE/BLOB AT ALL: ONLY SHOCKS AND ARCING BOLTS REMAINING

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
    />
  );
}
