'use client';

import { useState } from 'react';

const SPECS = {
  fwd_left: 'Forward-left thruster — pitch & yaw trim, driven via PyMAVLink servo output.',
  fwd_right: 'Forward-right thruster — mirrored trim channel for forward-left.',
  aft_left: 'Aft-left thruster — primary forward/reverse thrust.',
  aft_right: 'Aft-right thruster — primary forward/reverse thrust, paired with aft-left for yaw.',
  sonar: 'Ping Sonar — real-time depth monitoring & obstacle range for autonomous navigation.',
  compute: 'Jetson Orin Nano + Pixhawk — onboard compute and flight controller pairing.',
};

const NODES = [
  { key: 'fwd_left', cx: 90, cy: 80, r: 12, shape: 'circle', label: 'FWD-L', labelX: 90, labelY: 65 },
  { key: 'fwd_right', cx: 90, cy: 160, r: 12, shape: 'circle', label: 'FWD-R', labelX: 90, labelY: 185 },
  { key: 'aft_left', cx: 310, cy: 80, r: 12, shape: 'circle', label: 'AFT-L', labelX: 310, labelY: 65 },
  { key: 'aft_right', cx: 310, cy: 160, r: 12, shape: 'circle', label: 'AFT-R', labelX: 310, labelY: 185 },
  { key: 'sonar', cx: 200, cy: 60, r: 10, shape: 'circle', label: 'SONAR', labelX: 200, labelY: 45 },
];

export default function AuvDiagram() {
  const [active, setActive] = useState('fwd_left');

  return (
    <div className="demo-panel" id="auv-diagram">
      <div className="demo-head">
        <span>
          <span className="dot"></span>THRUSTER &amp; SENSOR LAYOUT
        </span>
        <span>click a node</span>
      </div>
      <div className="demo-body">
        <svg
          viewBox="0 0 400 240"
          style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto' }}
        >
          <ellipse cx="200" cy="120" rx="150" ry="60" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />

          {NODES.map((n) => (
            <circle
              key={n.key}
              data-thruster={n.key}
              className={active === n.key ? 'active-node' : ''}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="var(--panel-2)"
              stroke={active === n.key ? 'var(--accent)' : 'var(--line-strong)'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => setActive(n.key)}
            />
          ))}

          <rect
            data-thruster="compute"
            className={active === 'compute' ? 'active-node' : ''}
            x="176"
            y="104"
            width="48"
            height="32"
            rx="4"
            fill="var(--panel-2)"
            stroke={active === 'compute' ? 'var(--accent)' : 'var(--line-strong)'}
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
            onClick={() => setActive('compute')}
          />

          {NODES.map((n) => (
            <text key={`${n.key}-label`} x={n.labelX} y={n.labelY} textAnchor="middle" className="sonar-label" fontSize="10">
              {n.label}
            </text>
          ))}
          <text x="200" y="150" textAnchor="middle" className="sonar-label" fontSize="10">
            COMPUTE
          </text>
        </svg>

        <p
          className="mono"
          style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '0.82rem', marginTop: 10 }}
        >
          {SPECS[active]}
        </p>
      </div>
    </div>
  );
}
