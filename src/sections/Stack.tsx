import SectionHeader from "../components/SectionHeader";
import { stack } from "../constants/constant";

export default function Stack() {
  return (
    <section id="stack" className="relative px-5 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="TOOLKIT" title="What I build with" />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stack.map((g, i) => (
            <div
              key={g.group}
              className={`reveal glass stack-card ${i === stack.length - 1 ? "lg:col-span-1" : ""}`}
              style={{ ["--d" as string]: `${i * 90}ms` }}
            >
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">{g.group}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <span key={t} className="chip chip-hover">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="reveal glass stack-card flex flex-col justify-center" style={{ ["--d" as string]: `${stack.length * 90}ms` }}>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">Certified</p>
            <p className="mt-3 text-xl font-semibold">CompTIA Security+</p>
            <p className="mt-1 text-sm text-white/50">Security fundamentals baked into how I build.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
