import profilePic from "../assets/profile.jpg";
import Counter from "../components/Counter";
import Spaceship from "../components/Spaceship";
import { ArrowIcon, FileIcon, GitHubIcon, LinkedInIcon } from "../components/Icons";
import { links, telemetry } from "../constants/constant";
import { scrollToId } from "../lib/smooth";

const NAME = "Nova Alim";

// [x, y, row] for each star in a double down-arrow (32px wide)
const CUE_STARS: [number, number, number][] = [
  [0, 0, 0], [8, 6, 1], [16, 12, 2], [24, 6, 1], [32, 0, 0],
  [0, 13, 2], [8, 19, 3], [16, 25, 4], [24, 19, 3], [32, 13, 2],
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col items-center justify-start md:justify-center px-5 pt-24 md:pt-28 pb-32">
      <div className="text-center max-w-4xl">
        <div className="intro-fade no-blur mx-auto mb-8 avatar-orbit avatar-orbit-hero" style={{ ["--d" as string]: "0.1s" }}>
          <img src={profilePic} alt="Nova Alim with a golden retriever" className="avatar" />
          <span className="orbit-ring" aria-hidden="true">
            <Spaceship />
          </span>
        </div>

        <p className="intro-fade status-chip" style={{ ["--d" as string]: "0.35s" }}>
          <span className="pulse-dot" /> Open to software engineering roles · New York
        </p>

        <h1 className="hero-name" aria-label={NAME}>
          {NAME.split("").map((ch, i) => (
            <span key={i} className="letter" style={{ animationDelay: `${0.5 + i * 0.07}s` }} aria-hidden="true">
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h1>

        <p className="intro-fade mt-5 text-lg sm:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto" style={{ ["--d" as string]: "1.15s" }}>
          Full-stack software engineer. I love to build things that are{" "}
          <span className="text-gradient font-semibold">fast, reliable, and fun to use.</span>
        </p>

        <div className="intro-fade mt-9 flex flex-wrap items-center justify-center gap-3" style={{ ["--d" as string]: "1.35s" }}>
          <button onClick={() => scrollToId("missions")} className="btn btn-primary">
            Explore my missions <ArrowIcon className="w-4 h-4" />
          </button>
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FileIcon className="w-4 h-4" /> Resume
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>

      {/* Telemetry: headline numbers */}
      <div className="intro-fade no-blur mt-14 sm:mt-16 w-full max-w-5xl" style={{ ["--d" as string]: "1.6s" }}>
        <p className="mb-3 font-mono text-[11px] tracking-[0.22em] uppercase text-white/40 text-center md:text-left">
          Mission highlights · tap one to open it
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {telemetry.map((s) => (
            <button
              key={s.missionId}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("select-mission", { detail: s.missionId }));
                scrollToId("missions");
              }}
              className="glass telemetry-card group text-left cursor-pointer"
              style={{ ["--h" as string]: s.hue }}
            >
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/55">
                <span className="mission-dot" /> {s.project}
              </div>
              <div className="mt-2.5 text-2xl sm:text-3xl font-semibold text-white">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-[13px] text-white/55 leading-snug">{s.label}</div>
              <div className="mt-3 flex items-center gap-1 text-xs mission-accent opacity-60 group-hover:opacity-100 transition-opacity">
                View mission <ArrowIcon className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToId("missions")}
        className="intro-fade no-blur scroll-cue"
        style={{ ["--d" as string]: "2s" }}
        aria-label="Scroll to missions"
      >
        {/* Two chevrons of stars; the twinkle cascades downward */}
        {CUE_STARS.map(([x, y, row], i) => (
          <span
            key={i}
            className={`cue-star ${x === 16 ? "cue-star-tip" : ""}`}
            style={{ left: x, top: y, animationDelay: `${row * 0.22}s` }}
          />
        ))}
      </button>
    </section>
  );
}
