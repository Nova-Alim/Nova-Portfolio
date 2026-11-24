import Lenis from "lenis";

// Buttery smooth scrolling (Lenis). Skipped for people who prefer reduced motion.
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  let raf = 0;
  const loop = (t: number) => {
    lenis?.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === "home" ? 0 : -24, duration: 1.5 });
  else el.scrollIntoView({ behavior: "smooth" });
}
