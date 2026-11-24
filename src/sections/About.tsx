import { useState } from "react";
import profilePic from "../assets/profile.jpg";
import SectionHeader from "../components/SectionHeader";
import Spaceship from "../components/Spaceship";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../components/Icons";
import { aboutMe, links } from "../constants/constant";

export default function About() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <section id="about" className="relative px-5 pt-24 sm:pt-32 pb-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="GROUND CONTROL" title="A little about me" />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
          <div className="reveal glass about-card flex flex-col items-center text-center">
            <div className="avatar-orbit avatar-orbit-lg">
              <img src={profilePic} alt="Nova Alim with a golden retriever" className="avatar" />
              <span className="orbit-ring" aria-hidden="true">
                <Spaceship />
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-bold">Nova Alim</h3>
            <p className="mt-1 text-sm text-white/50">Software Engineer · New York</p>
            <p className="mt-5 text-white/70 leading-relaxed max-w-md">{aboutMe}</p>
          </div>

          <div className="reveal glass about-card contact-card flex flex-col justify-center" style={{ ["--d" as string]: "120ms" }}>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">Open channel</p>
            <h3 className="mt-3 text-3xl sm:text-5xl font-bold leading-tight">
              Let's build something <span className="text-gradient">out of this world.</span>
            </h3>
            <p className="mt-4 text-white/60 max-w-lg">
              I'm looking for software engineering roles where I can ship real products and keep learning fast. My inbox is always open.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={copyEmail} className="btn btn-primary">
                <MailIcon className="w-4 h-4" /> {copied ? "Email copied ✓" : "Copy my email"}
              </button>
              <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FileIcon className="w-4 h-4" /> Resume
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <LinkedInIcon className="w-4 h-4" /> LinkedIn
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon className="w-4 h-4" /> GitHub
              </a>
            </div>
            <p className={`mt-4 font-mono text-xs text-cyan-200/80 transition-opacity duration-500 ${copied ? "opacity-100" : "opacity-0"}`} aria-live="polite">
              {copied ? `${links.email} is on your clipboard` : ""}
            </p>
          </div>
        </div>

        <footer className="mt-20 text-center text-xs text-white/35 font-mono">
          Built with React, TypeScript, and a few thousand stars · © {new Date().getFullYear()} Nova Alim
        </footer>
      </div>
    </section>
  );
}
