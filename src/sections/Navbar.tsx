import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { scrollToId } from "../lib/smooth";

const items = [
  { id: "home", label: "Home" },
  { id: "missions", label: "Missions" },
  { id: "experience", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Highlight whichever section is in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Slide the glowing pill under the active link
  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 intro-fade no-blur" style={{ ["--d" as string]: "1.4s" }}>
      <div className="relative flex items-center gap-0.5 sm:gap-1 p-1.5 rounded-full glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
        <span
          className="absolute top-1.5 bottom-1.5 rounded-full nav-pill"
          style={{ left: pill.left, width: pill.width }}
          aria-hidden="true"
        />
        {items.map(({ id, label }) => (
          <button
            key={id}
            ref={(el) => {
              refs.current[id] = el;
            }}
            onClick={() => scrollToId(id)}
            className={`relative z-10 px-2.5 sm:px-4 py-1.5 text-[13px] sm:text-sm rounded-full transition-colors duration-300 cursor-pointer ${
              active === id ? "text-white" : "text-white/55 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
