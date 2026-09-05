import Link from 'next/link';
import SonarHero from '../components/SonarHero';
import Reveal from '../components/Reveal';

export default function HomePage() {
  return (
    <>
      <section className="hero" style={{ borderTop: 'none', paddingTop: 60 }}>
        <div className="wrap">
          <div>
            <span className="eyebrow">
              <span className="blip" style={{ animation: 'none' }}></span> AI/ML ENGINEERING STUDENT · BANGALORE
            </span>
            <h1 style={{ marginTop: 16 }}>
              Building systems that operate <span className="accent">where people can&rsquo;t.</span>
            </h1>
            <p className="lede">
              I&rsquo;m Dhruv — an AI/ML student who spends most of his time getting machines to sense, decide, and
              move on their own. My focus sits at the edge of autonomy: underwater vehicles, robot fleet allocation,
              and the ML that makes them trustworthy.
            </p>
            <div className="tags">
              <span>Autonomous Vehicles</span>
              <span>Machine Learning</span>
              <span>Full-Stack Systems</span>
              <span>Robotics</span>
            </div>
            <div className="cta-row">
              <Link href="/projects" className="btn primary">
                View missions →
              </Link>
              <Link href="/resume" className="btn">
                Open resume
              </Link>
            </div>
          </div>

          <SonarHero />
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Signal profile</h2>
            <p className="note">// education &amp; current coordinates</p>
          </Reveal>
          <div className="about-grid">
            <ul className="fact-list">
              <li>
                <span className="k">EDUCATION</span>
                <span className="v">
                  B.E. in Artificial Intelligence &amp; Machine Learning
                  <small>Dr. Ambedkar Institute of Technology, Bangalore — 2023 to 2027</small>
                </span>
              </li>
              <li>
                <span className="k">COURSEWORK</span>
                <span className="v">
                  Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems, Computer Networks
                </span>
              </li>
              <li>
                <span className="k">FOCUS</span>
                <span className="v">Autonomous &amp; unmanned systems, applied ML, full-stack engineering</span>
              </li>
              <li>
                <span className="k">CODING</span>
                <span className="v">
                  200+ DSA problems solved on LeetCode
                  <small>Active across AI/ML and full-stack GitHub repositories</small>
                </span>
              </li>
            </ul>
            <div>
              <p style={{ maxWidth: '52ch' }}>
                I lead the Machine Learning team on an autonomous underwater vehicle project at NeptuneX Club, and
                I&rsquo;m consistently drawn to problems where software has to make decisions with incomplete sensor
                data — underwater, on a factory floor, or in a fleet of robots that can&rsquo;t wait for a human in
                the loop.
              </p>
              <p style={{ maxWidth: '52ch' }}>
                Outside of coursework, I&rsquo;ve placed in the top 10% at multiple AI and software engineering
                hackathons, and advanced through the institute-level screening for Smart India Hackathon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Onboard systems</h2>
            <p className="note">// languages, frameworks, tooling</p>
          </Reveal>
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
      </section>

      <section id="featured">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Featured missions</h2>
            <p className="note">// three of five — full log on the projects page</p>
          </Reveal>
          <div className="project-list">
            <div className="project-card">
              <div className="meta">
                <span className="id">MISSION 01</span>
                <h3>Autonomous Underwater Vehicle</h3>
                <span className="period">Aug 2025 – Mar 2026</span>
              </div>
              <div className="body">
                <p>
                  An AUV built on Jetson Orin Nano and Pixhawk, integrating five hardware modules for real-time
                  obstacle detection, depth monitoring, and stable underwater maneuvering across four thrusters.
                </p>
                <div className="stack">
                  <span>Jetson Orin Nano</span><span>Pixhawk</span><span>PyMAVLink</span><span>Ping Sonar</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="meta">
                <span className="id">MISSION 02</span>
                <h3>DORA — Robot Fleet Allocation</h3>
                <span className="period">Concept build</span>
              </div>
              <div className="body">
                <p>
                  A decision-support tool for dark-factory robot fleets: simulates demand against fleet size, flags
                  under-provisioning before it causes queueing, and recommends a fleet size in real time.
                </p>
                <div className="stack">
                  <span>Simulation</span><span>Fleet Sizing</span><span>Synthetic Data</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="meta">
                <span className="id">MISSION 03</span>
                <h3>NPL — Cricket Tournament Management Platform</h3>
                <span className="period">Dec 2025 – Feb 2026</span>
              </div>
              <div className="body">
                <p>
                  Full-stack tournament management platform supporting 100+ player registrations, team
                  administration, and automated auction and squad management workflows.
                </p>
                <div className="stack">
                  <span>Flask</span><span>JavaScript</span><span>MySQL</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 36 }}>
            <Link href="/projects" className="btn">
              See all 5 missions →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
