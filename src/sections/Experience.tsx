import SectionHeader from "../components/SectionHeader";
import { experience } from "../constants/constant";

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="FLIGHT PATH" title="My journey so far" />

        <ol className="relative timeline">
          {experience.map((r, i) => (
            <li key={r.org} className="reveal relative pl-10 sm:pl-14 pb-12 last:pb-0" style={{ ["--d" as string]: `${i * 120}ms` }}>
              <span className="timeline-node" aria-hidden="true" />
              <div className="glass timeline-card">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold">{r.role}</h3>
                  <span className="font-mono text-xs text-white/45">{r.when}</span>
                </div>
                <p className="mt-1 text-sm text-gradient font-semibold">
                  {r.org} <span className="text-white/35 font-normal">· {r.where}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm sm:text-[15px] text-white/70 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-300/80 shrink-0 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
