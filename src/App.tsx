import { useEffect } from "react";
import Starfield from "./components/Starfield";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Missions from "./sections/Missions";
import Experience from "./sections/Experience";
import Stack from "./sections/Stack";
import About from "./sections/About";
import { startSmoothScroll } from "./lib/smooth";

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll();

    // Fade + rise anything marked .reveal as it scrolls into view
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      stop();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <Starfield />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Missions />
        <Experience />
        <Stack />
        <About />
      </main>
    </>
  );
}
