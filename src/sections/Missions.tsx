import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import SectionHeader from "../components/SectionHeader";
import { ArrowIcon, Sparkle } from "../components/Icons";
import { missions } from "../constants/constant";
import type { Mission } from "../constants/constant";

const hueVars = (m: Mission) => ({ ["--h" as string]: m.hue }) as CSSProperties;

function Planet({ m, big = false }: { m: Mission; big?: boolean }) {
  return (
    <div className={`planet ${big ? "planet-big" : ""}`} style={hueVars(m)} aria-hidden="true">
      <span className="planet-core" />
      <span className="planet-ring" />
    </div>
  );
}

// Full-screen viewer for a gallery shot (portal to <body> so the panel's transforms can't trap it)
function Lightbox({ m, i, setI, onClose }: { m: Mission; i: number; setI: (n: number) => void; onClose: () => void }) {
  const imgs = m.images!;
  const label = (k: number) => m.galleryLabels?.[k] ?? `Screen ${k + 1}`;
  useEffect(() => {
    // capture phase so the Missions arrow-key handler doesn't also switch projects
    const onKey = (e: KeyboardEvent) => {
      if (!["Escape", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.stopImmediatePropagation();
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((i + 1) % imgs.length);
      if (e.key === "ArrowLeft") setI((i - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [i, imgs.length, onClose, setI]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${m.title} screenshots`} onClick={onClose} data-lenis-prevent style={hueVars(m)}>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img key={imgs[i]} src={imgs[i]} alt={`${m.title}: ${label(i)}`} className="lightbox-img" />
        <figcaption className="mt-4 flex items-center justify-between gap-4">
          <span className="text-sm text-white/80">
            <span className="mission-accent font-semibold">{m.title}</span> · {label(i)}
            <span className="ml-3 font-mono text-xs text-white/40">
              {i + 1} / {imgs.length}
            </span>
          </span>
          <span className="flex gap-2">
            <button onClick={() => setI((i - 1 + imgs.length) % imgs.length)} className="btn-icon" aria-label="Previous screenshot">
              <ArrowIcon dir="left" className="w-4 h-4" />
            </button>
            <button onClick={() => setI((i + 1) % imgs.length)} className="btn-icon" aria-label="Next screenshot">
              <ArrowIcon className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="btn-icon" aria-label="Close">
              ✕
            </button>
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}

// Wide app screenshots: one at a time, with tabs to flip between views; click to enlarge
function Gallery({ m }: { m: Mission }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const imgs = m.images!;
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <button className="gallery-frame cursor-zoom-in" onClick={() => setOpen(true)} aria-label="Enlarge screenshot">
        {imgs.map((src, k) => (
          <img
            key={src}
            src={src}
            alt={`${m.title}: ${m.galleryLabels?.[k] ?? `screen ${k + 1}`}`}
            className={`gallery-img ${k === i ? "is-on" : ""}`}
            loading={k === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <span className="gallery-zoom" aria-hidden="true">
          ⤢ Click to enlarge
        </span>
      </button>
      {open && <Lightbox m={m} i={i} setI={setI} onClose={() => setOpen(false)} />}
      <div className="flex flex-wrap justify-center gap-1.5">
        {imgs.map((src, k) => (
          <button
            key={src}
            onClick={() => setI(k)}
            className={`gallery-tab ${k === i ? "is-on" : ""}`}
          >
            {m.galleryLabels?.[k] ?? k + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Missions() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const m = missions[index];

  const go = (i: number) => setIndex((i + missions.length) % missions.length);

  // Arrow keys switch missions while this section is on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (inView.current = e.intersectionRatio > 0.35), {
      threshold: [0, 0.35, 0.6],
    });
    io.observe(sectionRef.current!);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % missions.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + missions.length) % missions.length);
    };
    // Stat cards in the hero can open a specific mission
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const i = missions.findIndex((mm) => mm.id === id);
      if (i >= 0) setIndex(i);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("select-mission", onSelect);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("select-mission", onSelect);
    };
  }, []);

  // Keep the selected tile visible on small screens
  useEffect(() => {
    const rail = railRef.current;
    const tile = rail?.children[index] as HTMLElement | undefined;
    if (rail && tile) rail.scrollTo({ left: tile.offsetLeft - rail.clientWidth / 2 + tile.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  return (
    <section id="missions" ref={sectionRef} className="relative px-5 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="MISSION LOG" title="Things I've built" sub="Pick a mission, or use ← → on your keyboard." />

        {/* Mission select rail */}
        <div ref={railRef} className="reveal mission-rail" style={{ ["--d" as string]: "200ms" }} role="tablist">
          {missions.map((mm, i) => (
            <button
              key={mm.id}
              role="tab"
              aria-selected={i === index}
              onClick={() => go(i)}
              className={`mission-tile ${i === index ? "is-active" : ""}`}
              style={hueVars(mm)}
            >
              <Planet m={mm} />
              <span className="mt-3 text-sm font-semibold leading-tight text-center">{mm.title}</span>
              <span className="mt-1 text-[11px] font-mono uppercase tracking-wider text-white/40">
                {mm.kind}
              </span>
            </button>
          ))}
        </div>

        {/* Mission detail */}
        <div className="reveal relative mt-8" style={{ ["--d" as string]: "300ms" }}>
          <div key={m.id} className="mission-panel glass" style={hueVars(m)}>
            <div className="mission-visual">
              {m.gallery && m.images ? (
                <Gallery m={m} />
              ) : m.images ? (
                <div className={`flex items-center justify-center gap-4 h-full w-full ${m.images.length > 1 ? "px-2" : ""}`}>
                  {m.images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${m.title} screenshot ${i + 1}`}
                      className="mission-shot"
                      decoding="async"
                      style={{ animationDelay: `${i * 0.6}s`, maxWidth: m.images!.length > 1 ? "46%" : "100%" }}
                    />
                  ))}
                </div>
              ) : (
                <Planet m={m} big />
              )}
            </div>

            <div className="p-6 sm:p-9 flex flex-col">
              <div className="panel-line flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/45" style={{ ["--i" as string]: 0 }}>
                <span className="mission-dot" /> {m.kind}{m.year && ` · ${m.year}`}
              </div>
              <h3 className="panel-line mt-3 text-2xl sm:text-4xl font-bold leading-tight" style={{ ["--i" as string]: 1 }}>
                {m.title}
              </h3>
              <p className="panel-line mt-3 text-white/65 leading-relaxed" style={{ ["--i" as string]: 2 }}>
                {m.tagline}
              </p>

              {m.stats && (
                <div className="panel-line mt-6 grid gap-2 sm:gap-3" style={{ ["--i" as string]: 3, gridTemplateColumns: `repeat(${m.stats.length}, minmax(0, 1fr))` }}>
                  {m.stats.map((s) => (
                    <div key={s.label} className="stat-chip">
                      <div className="text-lg sm:text-2xl font-semibold mission-accent">{s.value}</div>
                      <div className="mt-0.5 text-[11px] sm:text-xs text-white/50 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <ul className="mt-6 space-y-2.5">
                {m.bullets.map((b, i) => (
                  <li key={b} className="panel-line flex gap-3 text-sm sm:text-[15px] text-white/75 leading-relaxed" style={{ ["--i" as string]: 4 + i }}>
                    <Sparkle className="mt-1.5 w-2.5 h-2.5 shrink-0 mission-accent" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="panel-line mt-6 flex flex-wrap gap-2" style={{ ["--i" as string]: 7 }}>
                {m.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-7 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/35">
                    {String(index + 1).padStart(2, "0")} / {String(missions.length).padStart(2, "0")}
                  </span>
                  {m.live && (
                    <a href={m.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2 !px-4 text-sm">
                      <span className="pulse-dot" /> Try it live <ArrowIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => go(index - 1)} className="btn-icon" aria-label="Previous mission">
                    <ArrowIcon dir="left" className="w-4 h-4" />
                  </button>
                  <button onClick={() => go(index + 1)} className="btn-icon" aria-label="Next mission">
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
