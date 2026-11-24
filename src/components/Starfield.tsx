import { useEffect, useRef } from "react";

// A layered, twinkling starfield drawn on one canvas.
// Near stars are bigger, brighter, and move more with the mouse and scroll (parallax).
// A few bright stars get a soft four-point sparkle, and shooting stars streak by now and then.

type Star = {
  x: number;
  y: number;
  z: number; // depth 0 (far) .. 1 (near)
  r: number;
  phase: number;
  speed: number;
  tint: number;
  flare: boolean;
};

type Shooter = { x: number; y: number; vx: number; vy: number; life: number; max: number };

const TINTS = ["255,255,255", "186,214,255", "255,234,208", "206,194,255", "170,240,255"];

function makeSprite(rgb: string): HTMLCanvasElement {
  const s = document.createElement("canvas");
  s.width = s.height = 64;
  const g = s.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.1, `rgba(${rgb},0.95)`);
  grad.addColorStop(0.3, `rgba(${rgb},0.28)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return s;
}

// The four-point sparkle, pre-drawn once so each frame is just an image copy
function makeFlare(rgb: string): HTMLCanvasElement {
  const s = document.createElement("canvas");
  s.width = s.height = 64;
  const g = s.getContext("2d")!;
  for (const [x0, y0, x1, y1] of [
    [0, 32, 64, 32],
    [32, 0, 32, 64],
  ]) {
    const grad = g.createLinearGradient(x0, y0, x1, y1);
    grad.addColorStop(0, `rgba(${rgb},0)`);
    grad.addColorStop(0.5, `rgba(${rgb},0.9)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.strokeStyle = grad;
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.stroke();
  }
  return s;
}

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = TINTS.map(makeSprite);
    const flares = TINTS.map(makeFlare);

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const shooters: Shooter[] = [];
    let nextShooter = 1500;
    let raf = 0;
    let lastT = 0;
    // Frame-time watchdog: if this device can't keep up, switch the whole page to a lighter mode once
    const startedAt = performance.now();
    const samples: number[] = [];
    let checked = "lite" in document.documentElement.dataset;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(650, Math.floor((w * h) / 2600));
      stars = Array.from({ length: count }, () => {
        const z = Math.random() ** 2.2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.5 + z * 2.1,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.8,
          tint: Math.random() < 0.55 ? 0 : 1 + Math.floor(Math.random() * (TINTS.length - 1)),
          flare: z > 0.55 && Math.random() < 0.35,
        };
      });
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / w) * 2 - 1;
      mouse.ty = (e.clientY / h) * 2 - 1;
    };

    const draw = (t: number) => {
      const dt = lastT ? t - lastT : 16.7;
      lastT = t;
      const k = Math.min(dt / 16.7, 3); // keeps shooting stars the same speed on 60 Hz and 180 Hz screens
      if (!checked && t - startedAt > 1500) {
        samples.push(dt);
        if (samples.length >= 90) {
          checked = true;
          samples.sort((a, b) => a - b);
          if (samples[45] > 22) {
            document.documentElement.dataset.lite = "";
            stars = stars.filter((_, i) => i % 2 === 0);
          }
        }
      }
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const scroll = window.scrollY;

      for (const s of stars) {
        const tw = reduced ? 1 : 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        const alpha = (0.3 + 0.7 * s.z) * (0.35 + 0.65 * tw);
        const px = s.x - mouse.x * s.z * 22;
        let py = s.y - scroll * (0.03 + s.z * 0.12) - mouse.y * s.z * 22;
        py = ((py % h) + h) % h;

        const size = s.r * 7;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprites[s.tint], px - size / 2, py - size / 2, size, size);

        if (s.flare && tw > 0.6) {
          const len = s.r * 14 * tw;
          ctx.globalAlpha = alpha * 0.7 * tw;
          ctx.drawImage(flares[s.tint], px - len, py - len, len * 2, len * 2);
        }
      }

      // Shooting stars
      if (!reduced && t > nextShooter) {
        const angle = (Math.PI / 180) * (25 + Math.random() * 20);
        const speed = 9 + Math.random() * 6;
        shooters.push({
          x: Math.random() * w * 0.8 + w * 0.2,
          y: Math.random() * h * 0.4,
          vx: -Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          max: 55 + Math.random() * 30,
        });
        nextShooter = t + 2600 + Math.random() * 5000;
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const m = shooters[i];
        m.x += m.vx * k;
        m.y += m.vy * k;
        m.life += k;
        const fade = Math.sin((m.life / m.max) * Math.PI);
        const tail = 14;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
        grad.addColorStop(0.3, `rgba(170,220,255,${0.45 * fade})`);
        grad.addColorStop(1, "rgba(170,220,255,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx.stroke();
        ctx.globalAlpha = fade;
        ctx.drawImage(sprites[4], m.x - 6, m.y - 6, 12, 12);
        if (m.life >= m.max) shooters.splice(i, 1);
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    if (reduced) {
      draw(0);
      window.addEventListener("scroll", () => draw(0), { passive: true });
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="nebula" />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
