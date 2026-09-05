'use client';

import { useMemo, useState } from 'react';

const CAPACITY_PER_ROBOT = 60; // task-minutes available per robot per hour (synthetic)
const TARGET_UTIL = 0.75;

function synthDemandSeries(baseDemand) {
  const series = [];
  for (let i = 0; i < 12; i++) {
    const noise = Math.sin(i * 1.7) * 0.18 + (i % 3 === 0 ? 0.12 : -0.05);
    series.push(Math.max(4, baseDemand * (1 + noise)));
  }
  return series;
}

export default function DoraDemo() {
  const [demand, setDemand] = useState(40); // tasks/hour
  const [duration, setDuration] = useState(6); // avg minutes per task
  const [fleet, setFleet] = useState(6); // robots

  const stats = useMemo(() => {
    const requiredMinutes = demand * duration;
    const availableMinutes = fleet * CAPACITY_PER_ROBOT;
    const utilization = Math.min(2, requiredMinutes / availableMinutes);
    const suggestedFleet = Math.max(1, Math.ceil(requiredMinutes / (CAPACITY_PER_ROBOT * TARGET_UTIL)));
    const buffer = fleet - suggestedFleet;

    let level = 'ok';
    if (utilization >= 0.95) level = 'bad';
    else if (utilization >= 0.85) level = 'warn';

    let message;
    if (level === 'bad') {
      message = `AVAILABILITY ALERT — fleet at ${Math.round(utilization * 100)}% load. Add ${Math.max(
        1,
        -buffer
      )} robot(s) or demand will queue.`;
    } else if (level === 'warn') {
      message = `Approaching capacity (${Math.round(utilization * 100)}%). Recommended fleet size: ${suggestedFleet}.`;
    } else {
      message = `Fleet healthy at ${Math.round(utilization * 100)}% load. Recommended fleet size: ${suggestedFleet} (current: ${fleet}).`;
    }

    return { utilization, suggestedFleet, buffer, level, message };
  }, [demand, duration, fleet]);

  const chart = useMemo(() => {
    const w = 560,
      h = 120,
      pad = 8;
    const series = synthDemandSeries(demand);
    const capacityLine = (fleet * CAPACITY_PER_ROBOT) / duration; // tasks/hr this fleet can sustain
    const maxVal = Math.max(...series, capacityLine) * 1.15;
    const stepX = (w - pad * 2) / (series.length - 1);
    const points = series.map((v, i) => {
      const x = pad + i * stepX;
      const y = h - pad - (v / maxVal) * (h - pad * 2);
      return { x, y };
    });
    const capY = h - pad - (capacityLine / maxVal) * (h - pad * 2);
    return { w, h, pad, points, capY };
  }, [demand, duration, fleet]);

  const fillColor = stats.level === 'bad' ? 'var(--red)' : stats.level === 'warn' ? 'var(--amber)' : 'var(--accent)';
  const alertClass = stats.level === 'bad' ? 'alert-msg bad' : stats.level === 'warn' ? 'alert-msg warn' : 'alert-msg ok';
  const cellClass = (extra) => `cell${stats.level !== 'ok' ? ` ${stats.level === 'bad' ? 'danger' : 'alert'}` : ''}${extra ? ` ${extra}` : ''}`;

  return (
    <div className="demo-panel" id="dora-demo">
      <div className="demo-head">
        <span>
          <span className="dot"></span>LIVE SIMULATION
        </span>
        <span>synthetic data</span>
      </div>
      <div className="demo-body">
        <div className="demo-grid">
          <div>
            <div className="field">
              <label>
                Task demand <span className="val">{demand} tasks/hr</span>
              </label>
              <input
                type="range"
                min="10"
                max="120"
                step="1"
                value={demand}
                onChange={(e) => setDemand(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="field">
              <label>
                Avg. task duration <span className="val">{duration} min</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="field">
              <label>
                Fleet size <span className="val">{fleet} robots</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={fleet}
                onChange={(e) => setFleet(parseInt(e.target.value, 10))}
              />
            </div>

            <div className="readout">
              <div className={cellClass()}>
                <div className="label">UTILIZATION</div>
                <div className="num">{Math.round(stats.utilization * 100)}%</div>
              </div>
              <div className="cell">
                <div className="label">SUGGESTED FLEET</div>
                <div className="num">{stats.suggestedFleet}</div>
              </div>
              <div className={cellClass()}>
                <div className="label">BUFFER</div>
                <div className="num">
                  {stats.buffer > 0 ? '+' : ''}
                  {stats.buffer}
                </div>
              </div>
            </div>
            <div className="util-bar">
              <div
                className="fill"
                style={{ width: `${Math.min(100, stats.utilization * 100)}%`, background: fillColor }}
              ></div>
            </div>
            <div className={alertClass}>{stats.message}</div>
          </div>

          <div>
            <div className="chart-wrap">
              <svg viewBox={`0 0 ${chart.w} ${chart.h}`}>
                <line
                  x1={chart.pad}
                  y1={chart.capY.toFixed(1)}
                  x2={chart.w - chart.pad}
                  y2={chart.capY.toFixed(1)}
                  stroke="var(--muted-2)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={chart.w - chart.pad}
                  y={(chart.capY - 6).toFixed(1)}
                  textAnchor="end"
                  className="sonar-label"
                  fill="var(--muted-2)"
                  fontSize="9"
                >
                  fleet capacity
                </text>
                <polyline
                  points={chart.points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {chart.points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x.toFixed(1)}
                    cy={p.y.toFixed(1)}
                    r="2.5"
                    fill="var(--bg)"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
            <p className="chart-note">
              Synthetic demand across 12 shifts, plotted against the current fleet&rsquo;s sustainable throughput
              (dashed line).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
