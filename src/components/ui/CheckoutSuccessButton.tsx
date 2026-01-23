"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CheckIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "check" | "dollar";
};

export function CheckoutSuccessButton() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticles = () => {
      const particles: Particle[] = [];
      const countPerIcon = 15;

      for (let i = 0; i < countPerIcon; i++) {
        particles.push(makeParticle("check"));
        particles.push(makeParticle("dollar"));
      }

      return particles;
    };

    const makeParticle = (type: Particle["type"]): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: 16,
        type,
      };
    };

    particlesRef.current = createParticles();

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ps = particlesRef.current;

      // move particles
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;

        // wall bounce
        if (p.x < 0 || p.x > canvas.width - p.size) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height - p.size) p.vy *= -1;
      }

      // collisions
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < a.size) {
            const nx = dx / dist;
            const ny = dy / dist;

            a.vx -= nx * 0.2;
            a.vy -= ny * 0.2;
            b.vx += nx * 0.2;
            b.vy += ny * 0.2;
          }
        }
      }

      // draw icons
      for (const p of ps) {
        ctx.save();
        ctx.translate(p.x, p.y);

        ctx.fillStyle = "#111111";

        ctx.font = "16px sans-serif";
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
      {/* Background physics layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Button label */}
      <span className="relative z-10 font-semibold">
        I&apos;ve paid (continue)
      </span>
    </Link>
  );
}
