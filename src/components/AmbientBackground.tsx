import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  axis: 'x' | 'y';
  pulseSpeed: number;
  pulsePhase: number;
  trailLength: number;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;

    // Grid spacing for straight lines & matrix nodes
    const gridSize = 56;

    const resize = () => {
      isMobile = window.innerWidth < 768;
      // Cap DPR to 1 on mobile to prevent GPU fillrate exhaustion on Retina iOS screens
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Mobile-optimized particle count (18 on phones vs 48 on desktop)
    const particleCount = isMobile ? 18 : Math.min(Math.floor((width * height) / 22000), 48);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const axis: 'x' | 'y' = Math.random() > 0.5 ? 'x' : 'y';
      const snapX = Math.round((Math.random() * width) / gridSize) * gridSize;
      const snapY = Math.round((Math.random() * height) / gridSize) * gridSize;
      const speed = 0.35 + Math.random() * 0.45;

      particles.push({
        x: snapX,
        y: snapY,
        vx: axis === 'x' ? (Math.random() > 0.5 ? speed : -speed) : 0,
        vy: axis === 'y' ? (Math.random() > 0.5 ? speed : -speed) : 0,
        size: 1.2 + Math.random() * 1.3,
        baseAlpha: 0.22 + Math.random() * 0.28,
        axis,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        pulsePhase: Math.random() * Math.PI * 2,
        trailLength: 20 + Math.random() * 30
      });
    }

    const maxDist = 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle technical grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.035)';

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw subtle grid intersection dots
      ctx.fillStyle = 'rgba(6, 182, 212, 0.09)';
      for (let x = 0; x <= width; x += gridSize * 2) {
        for (let y = 0; y <= height; y += gridSize * 2) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Update & render particles with straight-line motion & subtle trails
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move in straight lines along grid axes
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges seamlessly
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Subtle pulsing brightness
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(p.pulsePhase));

        // Draw straight-line light trail behind particle
        ctx.beginPath();
        if (p.axis === 'x') {
          const trailX = p.vx > 0 ? p.x - p.trailLength : p.x + p.trailLength;
          const grad = ctx.createLinearGradient(trailX, p.y, p.x, p.y);
          grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
          grad.addColorStop(1, `rgba(34, 211, 238, ${currentAlpha * 0.75})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.moveTo(trailX, p.y);
          ctx.lineTo(p.x, p.y);
        } else {
          const trailY = p.vy > 0 ? p.y - p.trailLength : p.y + p.trailLength;
          const grad = ctx.createLinearGradient(p.x, trailY, p.x, p.y);
          grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
          grad.addColorStop(1, `rgba(34, 211, 238, ${currentAlpha * 0.75})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, trailY);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Draw particle head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 252, ${currentAlpha})`;
        if (!isMobile) {
          ctx.shadowColor = 'rgba(6, 182, 212, 0.75)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        if (!isMobile) {
          ctx.shadowBlur = 0;
        }
      }

      // 4. Draw connecting straight lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Live Canvas Background with Particles in Straight Lines & Technical Grid */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none" 
      />

      {/* Primary Hardware-Accelerated Ambient Glow Orb (Cyan) */}
      <div 
        className="absolute -top-32 left-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-cyan-500/18 via-teal-500/10 to-transparent blur-[130px] animate-ambient-slow pointer-events-none" 
      />

      {/* Secondary Counter-Drifting Ambient Glow Orb (Teal / Deep Blue) */}
      <div 
        className="absolute top-1/2 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-cyan-600/15 via-sky-500/8 to-transparent blur-[140px] animate-ambient-reverse pointer-events-none" 
      />

      {/* Center Deep Atmospheric Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[600px] rounded-full bg-cyan-600/10 blur-[170px] pointer-events-none" 
      />

      {/* Bottom Subtle Grounding Glow */}
      <div 
        className="absolute -bottom-48 left-1/3 w-[750px] h-[550px] rounded-full bg-cyan-900/18 blur-[160px] pointer-events-none" 
      />
    </div>
  );
}
