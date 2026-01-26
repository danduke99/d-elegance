"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "check" | "dollar";
  color: string;
};

export function CheckoutSuccessButton() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const countPerIcon = 15;

    const GOLD = "#e7c726";
    const BLACK = "#111111";
    const GREEN = "#16a34a";

    const makeParticle = (type: Particle["type"]): Particle => {
      const isCheck = type === "check";

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        size: 36,
        type,
        color: isCheck
          ? Math.random() > 0.5
            ? GOLD
            : BLACK
          : GREEN,
      };
    };

    particlesRef.current = Array.from({ length: countPerIcon * 2 }).map(
      (_, i) => makeParticle(i % 2 === 0 ? "check" : "dollar")
    );

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ps = particlesRef.current;

      // Move + bounce
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;

        const r = p.size;

        if (p.x < r) {
          p.x = r;
          p.vx *= -1;
        }
        if (p.x > canvas.width / dpr - r) {
          p.x = canvas.width / dpr - r;
          p.vx *= -1;
        }
        if (p.y < r) {
          p.y = r;
          p.vy *= -1;
        }
        if (p.y > canvas.height / dpr - r) {
          p.y = canvas.height / dpr - r;
          p.vy *= -1;
        }
      }

      // Particle collisions
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0 && dist < a.size) {
            const nx = dx / dist;
            const ny = dy / dist;

            a.vx -= nx * 0.15;
            a.vy -= ny * 0.15;
            b.vx += nx * 0.15;
            b.vy += ny * 0.15;
          }
        }
      }

      // Draw icons
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

      requestAnimationFrame(step);
    };

    step();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Link
      href="/checkout/success"
      className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 active:scale-[0.99]"
    >
      {/* Background physics */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full opacity-40"
      />

      {/* Label */}
      <span className="relative z-10 font-semibold">
        I&apos;ve paid (continue)
      </span>
    </Link>
  );
}
