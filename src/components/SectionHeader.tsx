import { Sparkle } from "./Icons";

export default function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="reveal eyebrow">
        <Sparkle className="w-3 h-3 text-cyan-300" /> {eyebrow}
      </p>
      <h2 className="reveal section-title" style={{ ["--d" as string]: "80ms" }}>
        {title}
      </h2>
      {sub && (
        <p className="reveal mt-3 text-white/55 max-w-xl" style={{ ["--d" as string]: "160ms" }}>
          {sub}
        </p>
      )}
    </div>
  );
}
