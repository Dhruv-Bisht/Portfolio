import AuvDiagram from '../../components/AuvDiagram';
import DoraDemo from '../../components/DoraDemo';
import SpamDemo from '../../components/SpamDemo';

export const metadata = {
  title: 'Projects — Dhruv Singh Bisht',
  description:
    'Projects by Dhruv Singh Bisht: autonomous underwater vehicle, DORA robot fleet allocation simulator, spam detection classifier, cricket tournament platform, and resumeFut.',
};

export default function ProjectsPage() {
  return (
    <>
      <section style={{ paddingTop: 64, borderTop: 'none' }}>
        <div className="wrap">
          <span className="eyebrow">MISSION LOG</span>
          <h1 style={{ marginTop: 14, fontSize: 'clamp(2rem,4vw,2.8rem)', maxWidth: '18ch' }}>
            Five builds, one thread: autonomy under uncertainty.
          </h1>
          <p style={{ marginTop: 16, maxWidth: '60ch' }}>
            Each project below either senses its environment, allocates resources under constraints, or automates a
            workflow end-to-end. Two of them — DORA and the spam classifier — have live demos built into the page.
          </p>
        </div>
      </section>

      <section id="auv">
        <div className="wrap">
          <div className="project-card" style={{ margin: 0, padding: 0 }}>
            <div className="meta">
              <span className="id">MISSION 01</span>
              <h3>Autonomous Underwater Vehicle</h3>
              <span className="period">Aug 2025 – Mar 2026</span>
            </div>
            <div className="body">
              <ul>
                <li>Engineered an AUV by integrating 5 hardware modules using Jetson Orin Nano and Pixhawk.</li>
                <li>
                  Implemented real-time obstacle detection and depth monitoring for autonomous navigation using
                  Ping Sonar.
                </li>
                <li>
                  Controlled 4 thrusters through MAVLink and PyMAVLink communication for stable underwater
                  maneuvering.
                </li>
              </ul>
              <div className="stack">
                <span>Jetson Orin Nano</span><span>Pixhawk</span><span>MAVLink</span><span>PyMAVLink</span>
                <span>Ping Sonar</span>
              </div>

              <AuvDiagram />
            </div>
          </div>
        </div>
      </section>

      <section id="dora">
        <div className="wrap">
          <div className="project-card" style={{ margin: 0, padding: 0 }}>
            <div className="meta">
              <span className="id">MISSION 02</span>
              <h3>DORA</h3>
              <span className="period">Concept build</span>
            </div>
            <div className="body">
              <p style={{ maxWidth: '70ch', color: 'var(--muted)' }}>
                Data-driven Optimized Robot Allocation for a dark factory floor. DORA is a decision-support tool
                focused on{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>dynamic fleet sizing</strong>: it takes
                incoming task demand and average task duration, simulates the load against the current robot fleet,
                and raises an availability alert before the fleet falls behind — all demonstrated here on synthetic
                data.
              </p>
              <div className="stack">
                <span>Simulation</span><span>Fleet Sizing</span><span>Availability Alerts</span>
                <span>Synthetic Data</span>
              </div>
              <p style={{ marginTop: 12 }}>
                <a className="btn primary" href="https://dora-phi-ruby.vercel.app" target="_blank" rel="noopener noreferrer">
                  Live demo ↗
                </a>
              </p>

              <DoraDemo />
            </div>
          </div>
        </div>
      </section>

      <section id="cricket">
        <div className="wrap">
          <div className="project-card" style={{ margin: 0, padding: 0 }}>
            <div className="meta">
              <span className="id">MISSION 03</span>
              <h3>NPL — Cricket Tournament Management Platform</h3>
              <span className="period">Dec 2025 – Feb 2026</span>
            </div>
            <div className="body">
              <ul>
                <li>
                  Full-stack tournament management platform supporting 100+ player registrations and team
                  administration.
                </li>
                <li>
                  Designed a MySQL database of 5 relational tables for players, teams, auctions, and match records.
                </li>
                <li>Automated auction and squad management workflows using Flask, JavaScript, and MySQL.</li>
              </ul>
              <div className="stack">
                <span>Flask</span><span>JavaScript</span><span>MySQL</span>
              </div>
              <p style={{ marginTop: 12 }}>
                <a className="btn primary" href="https://npl-website-iota.vercel.app" target="_blank" rel="noopener noreferrer">
                  Live demo ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="spam">
        <div className="wrap">
          <div className="project-card" style={{ margin: 0, padding: 0 }}>
            <div className="meta">
              <span className="id">MISSION 04</span>
              <h3>Spam Detection Website</h3>
              <span className="period">Sep 2025 – Nov 2025</span>
            </div>
            <div className="body">
              <ul>
                <li>NLP-based spam detection system trained on 30,000+ email samples from the Enron dataset.</li>
                <li>Achieved 96% classification accuracy using TF-IDF vectorization and Multinomial Naive Bayes.</li>
                <li>Flask web application capable of classifying email messages in real time.</li>
              </ul>
              <div className="stack">
                <span>NLP</span><span>TF-IDF</span><span>Naive Bayes</span><span>Flask</span>
              </div>

              <SpamDemo />
            </div>
          </div>
        </div>
      </section>

      <section id="resumefut">
        <div className="wrap">
          <div className="project-card" style={{ margin: 0, padding: 0 }}>
            <div className="meta">
              <span className="id">MISSION 05</span>
              <h3>resumeFut</h3>
              <span className="period">In progress</span>
            </div>
            <div className="body">
              <p style={{ maxWidth: '65ch' }}>
                An AI-assisted resume tool concept — parsing a candidate&rsquo;s experience and tailoring it against
                a target role, then suggesting concrete edits rather than generic advice.
              </p>
              <div className="stack">
                <span>Python</span><span>NLP</span>
              </div>
              <p style={{ marginTop: 12 }}>
                <a className="btn primary" href="https://resumefut.vercel.app" target="_blank" rel="noopener noreferrer">
                  Live demo ↗
                </a>
              </p>
              <p className="chart-note" style={{ marginTop: 6 }}>
                Placeholder summary — send over the real description and I&rsquo;ll swap this in.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
