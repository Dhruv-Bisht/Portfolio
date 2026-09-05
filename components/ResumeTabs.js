'use client';

import { useState } from 'react';

const TABS = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'skills', label: 'Skills' },
  { key: 'achievements', label: 'Achievements' },
];

export default function ResumeTabs() {
  const [active, setActive] = useState('timeline');

  return (
    <div>
      <div className="tab-row">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab-btn${active === t.key ? ' active' : ''}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={`tab-panel${active === 'timeline' ? ' active' : ''}`}>
        <div className="timeline">
          <div className="timeline-item">
            <span className="t-date mono">AUG 2023 — AUG 2027</span>
            <h4>B.E. in Artificial Intelligence &amp; Machine Learning</h4>
            <p>
              Dr. Ambedkar Institute of Technology, Bangalore, Karnataka. Coursework in Data Structures &amp;
              Algorithms, OOP, DBMS, Operating Systems, and Computer Networks.
            </p>
          </div>
          <div className="timeline-item">
            <span className="t-date mono">AUG 2025 — MAR 2026</span>
            <h4>Autonomous Underwater Vehicle (AUV) AI System</h4>
            <p>
              Led the Machine Learning team at NeptuneX Club; integrated 5 hardware modules on Jetson Orin Nano and
              Pixhawk with real-time obstacle detection and 4-thruster control via MAVLink.
            </p>
          </div>
          <div className="timeline-item">
            <span className="t-date mono">SEP 2025 — NOV 2025</span>
            <h4>Spam Detection Website</h4>
            <p>
              Built and trained an NLP spam classifier on 30,000+ Enron emails, reaching 96% accuracy, served
              through a real-time Flask app.
            </p>
          </div>
          <div className="timeline-item">
            <span className="t-date mono">DEC 2025 — FEB 2026</span>
            <h4>Cricket Tournament Management Platform</h4>
            <p>
              Full-stack platform for 100+ player registrations with a 5-table MySQL schema and automated auction
              workflows.
            </p>
          </div>
          <div className="timeline-item">
            <span className="t-date mono">ONGOING</span>
            <h4>DORA &amp; resumeFut</h4>
            <p>
              Concept builds in robot fleet allocation and AI-assisted resume tooling — see the Projects page for
              live demos.
            </p>
          </div>
        </div>
      </div>

      <div className={`tab-panel${active === 'skills' ? ' active' : ''}`}>
        <div className="skill-groups">
          <div className="skill-group">
            <h4>LANGUAGES</h4>
            <div className="chips">
              <span>Python</span><span>Java</span><span>SQL</span><span>JavaScript</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>WEB &amp; BACKEND</h4>
            <div className="chips">
              <span>React.js</span><span>Node.js</span><span>Flask</span><span>FastAPI</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>AI / ML</h4>
            <div className="chips">
              <span>Deep Learning</span><span>Natural Language Processing</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>GENERATIVE AI</h4>
            <div className="chips">
              <span>Transformers</span><span>LLMs</span><span>RAG</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>DATABASES &amp; CACHING</h4>
            <div className="chips">
              <span>MySQL</span><span>PostgreSQL</span><span>Redis</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>CLOUD &amp; DEVOPS</h4>
            <div className="chips">
              <span>AWS</span><span>Docker</span><span>Kubernetes</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>CORE CS</h4>
            <div className="chips">
              <span>Data Structures &amp; Algorithms</span><span>OOP</span><span>DBMS</span>
              <span>Operating Systems</span><span>Computer Networks</span><span>System Design</span>
            </div>
          </div>
          <div className="skill-group">
            <h4>TOOLS &amp; SYSTEMS</h4>
            <div className="chips">
              <span>Git</span><span>GitHub</span><span>Linux</span><span>MAVLink</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`tab-panel${active === 'achievements' ? ' active' : ''}`}>
        <ul className="achv-list">
          <li>Ranked within the top 10% in multiple hackathons focused on AI and software engineering.</li>
          <li>Advanced through institute-level screening in Smart India Hackathon (SIH).</li>
          <li>Led the Machine Learning team for an Autonomous Underwater Vehicle (AUV) project at NeptuneX Club.</li>
          <li>Built projects spanning AI/ML, NLP, full-stack development, AWS, and Docker.</li>
          <li>Solved 200+ Data Structures and Algorithms problems on LeetCode.</li>
        </ul>
      </div>
    </div>
  );
}
