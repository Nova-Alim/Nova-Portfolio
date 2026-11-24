import { useId } from "react";

// A tiny chrome starship that rides the orbit ring around the profile photo.
// It points along its direction of travel (the ring spins clockwise, so at the top it heads right).
// Blinking nav lights (red port, green starboard), a white strobe on the nose,
// a flickering ion engine, and a glint that sweeps across the hull.
export default function Spaceship() {
  const id = useId().replace(/:/g, "");
  const hull = `hull-${id}`;
  const glass = `glass-${id}`;
  const flame = `flame-${id}`;
  const clip = `clip-${id}`;
  const shine = `shine-${id}`;

  const body = "M8 16 C 12 9.5, 26 8.5, 44 13.2 C 48 14.3, 50 15.4, 51 16 C 50 16.6, 48 17.7, 44 18.8 C 26 23.5, 12 22.5, 8 16 Z";

  return (
    <span className="orbit-ship" aria-hidden="true">
      <span className="ship-trail" />
      <svg viewBox="0 0 56 32" className="ship-svg">
        <defs>
          <linearGradient id={hull} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#d9e3f3" />
            <stop offset="0.55" stopColor="#8c9bb5" />
            <stop offset="0.8" stopColor="#c7d3e8" />
            <stop offset="1" stopColor="#5b6782" />
          </linearGradient>
          <radialGradient id={glass} cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#e0fbff" />
            <stop offset="0.45" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#0e3a5c" />
          </radialGradient>
          <linearGradient id={flame} x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.25" stopColor="#a5f3fc" />
            <stop offset="0.7" stopColor="#60a5fa" stopOpacity="0.5" />
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clip}>
            <path d={body} />
          </clipPath>
        </defs>

        {/* Ion engine */}
        <g className="ship-flame">
          <ellipse cx="5" cy="16" rx="7" ry="3.2" fill={`url(#${flame})`} />
          <ellipse cx="6.5" cy="16" rx="3" ry="1.4" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Wings */}
        <path d="M20 10.5 L 30 3 L 34 3 L 30 11.4 Z" fill="#7d8aa6" />
        <path d="M20 21.5 L 30 29 L 34 29 L 30 20.6 Z" fill="#5f6b86" />
        <path d="M30 3 L 34 3 L 33 5 L 29.2 5 Z" fill="#e8eef9" />

        {/* Hull + sweeping glint */}
        <path d={body} fill={`url(#${hull})`} />
        <g clipPath={`url(#${clip})`}>
          <rect className="ship-glint" x="-14" y="6" width="10" height="20" fill={`url(#${shine})`} transform="skewX(-20)" />
        </g>
        <path d="M14 15.2 L 40 13.6" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.8" strokeLinecap="round" />

        {/* Cockpit */}
        <ellipse cx="36" cy="15.4" rx="5.6" ry="2.7" fill={`url(#${glass})`} />
        <ellipse cx="35" cy="14.5" rx="2" ry="0.8" fill="#ffffff" opacity="0.85" />

        {/* Nav lights: red port (top wing), green starboard (bottom wing), white strobe on the nose */}
        <g className="ship-light ship-light-red">
          <circle cx="32" cy="3.6" r="3.2" fill="#ff3b5c" opacity="0.35" />
          <circle cx="32" cy="3.6" r="1.3" fill="#ff6b81" />
        </g>
        <g className="ship-light ship-light-green">
          <circle cx="32" cy="28.4" r="3.2" fill="#22ff99" opacity="0.35" />
          <circle cx="32" cy="28.4" r="1.3" fill="#7dffc4" />
        </g>
        <g className="ship-light ship-light-strobe">
          <circle cx="51" cy="16" r="4" fill="#ffffff" opacity="0.4" />
          <circle cx="51" cy="16" r="1.4" fill="#ffffff" />
        </g>
      </svg>
    </span>
  );
}
