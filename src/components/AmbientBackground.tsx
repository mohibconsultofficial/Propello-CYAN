import { useEffect, useRef } from 'react';

/**
 * Living Digital Infrastructure Ambient Background
 * Multi-layer continuous depth environment:
 * - Architectural technical grid matrix with slow continuous drift
 * - Soft cyan luxury showroom lighting fields with multi-cycle orbits
 * - Dynamic HTML5 canvas micro-constellation & subtle data-stream telemetry
 * - Faint topographical contour patterns
 * Infinite, seamless, hardware-accelerated.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Micro-nodes constellation & subtle technical data streaks
    const NODE_COUNT = Math.min(38, Math.floor(width / 40));
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.25 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Occasional subtle horizontal data streaks
    interface DataStreak {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
    }

    const streaks: DataStreak[] = [
      { x: -200, y: height * 0.22, length: 180, speed: 1.1, alpha: 0.18 },
      { x: -350, y: height * 0.58, length: 240, speed: 0.85, alpha: 0.14 },
      { x: -500, y: height * 0.84, length: 160, speed: 1.3, alpha: 0.16 }
    ];

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render subtle node constellation
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Seamless wrap-around
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        const currentAlpha = node.baseAlpha + Math.sin(time * node.pulseSpeed * 60 + node.pulseOffset) * 0.08;

        ctx.fillStyle = `rgba(6, 182, 212, ${Math.max(0.05, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes with hairline data links
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 130 * 130) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // Render slow ambient data streaks
      for (let s = 0; s < streaks.length; s++) {
        const streak = streaks[s];
        streak.x += streak.speed;
        if (streak.x - streak.length > width) {
          streak.x = -streak.length - Math.random() * 300;
          streak.y = Math.random() * height;
        }

        const grad = ctx.createLinearGradient(streak.x - streak.length, streak.y, streak.x, streak.y);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.8, `rgba(6, 182, 212, ${streak.alpha})`);
        grad.addColorStop(1, `rgba(34, 211, 238, ${streak.alpha * 1.5})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(streak.x - streak.length, streak.y);
        ctx.lineTo(streak.x, streak.y);
        ctx.stroke();

        // Tiny leading photon dot
        ctx.fillStyle = `rgba(255, 255, 255, ${streak.alpha * 2})`;
        ctx.beginPath();
        ctx.arc(streak.x, streak.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep carbon foundation */}
      <div className="absolute inset-0 bg-[#030508]" />

      {/* 2. Topographical geometric contour rings */}
      <div className="absolute inset-0 contour-lines opacity-60 mix-blend-screen" />

      {/* 3. Architectural drifting grid matrix */}
      <div className="absolute inset-0 tech-grid-matrix opacity-70 mix-blend-screen" />

      {/* 4. Fine telemetry micro-dot texture */}
      <div className="absolute inset-0 tech-dot-matrix opacity-40 mix-blend-screen" />

      {/* 5. Luxury Showroom Cyan Lighting Field 1 (Upper Left Ambient Glow) */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[950px] h-[950px] rounded-full bg-gradient-to-br from-cyan-500/20 via-cyan-800/10 to-transparent blur-[160px] animate-ambient-slow mix-blend-screen pointer-events-none"
      />

      {/* 6. Luxury Showroom Cyan Lighting Field 2 (Center Right Horizon Glow) */}
      <div 
        className="absolute top-[35%] -right-[15%] w-[900px] h-[900px] rounded-full bg-gradient-to-bl from-cyan-400/18 via-teal-700/10 to-transparent blur-[170px] animate-ambient-reverse mix-blend-screen pointer-events-none"
      />

      {/* 7. Luxury Showroom Cyan Lighting Field 3 (Lower Center Floor Glow) */}
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[1100px] h-[850px] rounded-full bg-gradient-to-t from-cyan-500/15 via-cyan-950/10 to-transparent blur-[180px] animate-ambient-slow mix-blend-screen pointer-events-none"
        style={{ animationDelay: '-14s' }}
      />

      {/* 8. Hardware-accelerated interactive canvas micro-data streams */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-75"
      />

      {/* 9. Subtle cinematic top and bottom edge vignettes to frame typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/60 via-transparent to-[#030508]/80 pointer-events-none" />
    </div>
  );
}
