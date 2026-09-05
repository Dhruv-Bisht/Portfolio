'use client';

import { useRouter } from 'next/navigation';

const BLIPS = [
  { href: '/projects#auv', cx: 150, cy: 120, label: 'AUV', labelX: 160, labelY: 118 },
  { href: '/projects#dora', cx: 270, cy: 150, label: 'DORA', labelX: 280, labelY: 148 },
  { href: '/projects#resumefut', cx: 280, cy: 260, label: 'resumeFut', labelX: 290, labelY: 258 },
  { href: '/projects#cricket', cx: 140, cy: 270, label: 'Cricket Platform', labelX: 98, labelY: 288 },
  { href: '/projects#spam', cx: 200, cy: 330, label: 'Spam Detection', labelX: 150, labelY: 350 },
];

export default function SonarHero() {
  const router = useRouter();

  return (
    <div className="sonar" role="img" aria-label="Interactive sonar display linking to projects">
      <svg viewBox="0 0 400 400">
        <circle className="sonar-ring" cx="200" cy="200" r="60" />
        <circle className="sonar-ring" cx="200" cy="200" r="110" />
        <circle className="sonar-ring" cx="200" cy="200" r="160" />
        <line x1="200" y1="30" x2="200" y2="370" stroke="var(--line)" strokeWidth="1" />
        <line x1="30" y1="200" x2="370" y2="200" stroke="var(--line)" strokeWidth="1" />

        <g className="sonar-sweep-group">
          <path d="M200,200 L200,30 A170,170 0 0,1 260,45 Z" fill="url(#sweepGrad)" />
        </g>
        <defs>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {BLIPS.map((b) => (
          <g
            key={b.label}
            className="sonar-blip"
            onClick={() => router.push(b.href)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') router.push(b.href);
            }}
          >
            <circle className="ping" cx={b.cx} cy={b.cy} r="6" />
            <circle className="core" cx={b.cx} cy={b.cy} r="4" />
            <text className="sonar-label" x={b.labelX} y={b.labelY}>
              {b.label}
            </text>
          </g>
        ))}

        <circle className="sonar-center" cx="200" cy="200" r="4" />
      </svg>
    </div>
  );
}
