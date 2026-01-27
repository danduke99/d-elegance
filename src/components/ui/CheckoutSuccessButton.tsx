"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Particle = {
  x: number; // CSS px
  y: number; // CSS px
  vx: number; // CSS px / frame
  vy: number; // CSS px / frame
  r: number; // radius in CSS px
  type: "check" | "dollar";
  color: string;
};

export function CheckoutSuccessButton() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Always simulate in CSS pixels
    let w = 0; // CSS width
    let h = 0; // CSS height
    let dpr = 1;

    const GOLD = "#e7c726";
    const BLACK = "#111111";
    const GREEN = "#16a34a";

    const countPerIcon = 15;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);

      dpr = Math.max(1, window.devicePixelRatio || 1);

      // Render surface in device pixels, but we draw in CSS pixels
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed particles to ensure they are within new bounds
      seedParticles();
    };

    const seedParticles = () => {
      const makeParticle = (type: Particle["type"]): Particle => {
        const isCheck = type === "check";
        const r = 10; // radius in CSS px (tweak for density)

        return {
          x: rand(r, w - r),
          y: rand(r, h - r),
          vx: rand(-1, 1) * 1.2,
          vy: rand(-1, 1) * 1.2,
          r,
          type,
          color: isCheck ? (Math.random() > 0.5 ? GOLD : BLACK) : GREEN,
        };
      };

      particlesRef.current = Array.from({ length: countPerIcon * 2 }).map(
        (_, i) => makeParticle(i % 2 === 0 ? "check" : "dollar"),
      );
    };

    const bounceWalls = (p: Particle) => {
      if (p.x - p.r < 0) {
        p.x = p.r;
        p.vx *= -1;
      } else if (p.x + p.r > w) {
        p.x = w - p.r;
        p.vx *= -1;
      }

      if (p.y - p.r < 0) {
        p.y = p.r;
        p.vy *= -1;
      } else if (p.y + p.r > h) {
        p.y = h - p.r;
        p.vy *= -1;
      }
    };

    const resolveCollisions = () => {
      const ps = particlesRef.current;

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist2 = dx * dx + dy * dy;
          const minDist = a.r + b.r;

          if (dist2 > 0 && dist2 < minDist * minDist) {
            const dist = Math.sqrt(dist2);
            const nx = dx / dist;
            const ny = dy / dist;

            // push apart
            const overlap = minDist - dist;
            a.x -= nx * (overlap / 2);
            a.y -= ny * (overlap / 2);
            b.x += nx * (overlap / 2);
            b.y += ny * (overlap / 2);

            // basic impulse to look "bouncy"
            const relVx = b.vx - a.vx;
            const relVy = b.vy - a.vy;
            const velAlongNormal = relVx * nx + relVy * ny;

            if (velAlongNormal > 0) continue;

            const restitution = 0.9;
            const impulse = -(1 + restitution) * velAlongNormal;

            const ix = impulse * nx;
            const iy = impulse * ny;

            a.vx -= ix * 0.5;
            a.vy -= iy * 0.5;
            b.vx += ix * 0.5;
            b.vy += iy * 0.5;

            bounceWalls(a);
            bounceWalls(b);
          }
        }
      }
    };

    const draw = () => {
      // clear in CSS pixels (because transform scales)
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;

      // move + wall bounce
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        bounceWalls(p);
      }

      // collisions
      resolveCollisions();

      // draw
      for (const p of ps) {
        ctx.save();
        ctx.translate(p.x, p.y);

        ctx.fillStyle = p.color;
        ctx.font = "18px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(p.type === "check" ? "✔" : "$", 0, 0);

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    // Use ResizeObserver so it reacts to button width changes too (not only window resize)
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Link
      href="/checkout/success"
      className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 active:scale-[0.99]"
    >
      {/* Canvas must match button box */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      />

      <span className="relative z-10 font-semibold">
        I&apos;ve paid (continue)
      </span>
    </Link>
  );
}
