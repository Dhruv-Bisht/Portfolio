import ResumeTabs from '../../components/ResumeTabs';

export const metadata = {
  title: 'Resume — Dhruv Singh Bisht',
};

export default function ResumePage() {
  return (
    <>
      <section style={{ paddingTop: 64, borderTop: 'none' }}>
        <div className="wrap resume-top">
          <div>
            <span className="eyebrow">CREW MANIFEST</span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(1.9rem,4vw,2.6rem)' }}>Dhruv Singh Bisht</h1>
            <p style={{ marginTop: 8 }}>AI/ML Engineering Student · Bangalore, Karnataka</p>
          </div>
          <a className="btn primary" href="/dhruv_singh_bisht_resume.pdf" download>
            Download PDF ↓
          </a>
        </div>
      </section>

      <section>
        <div className="wrap">
          <ResumeTabs />
        </div>
      </section>
    </>
  );
}
