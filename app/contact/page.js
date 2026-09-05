import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact — Dhruv Singh Bisht',
};

export default function ContactPage() {
  return (
    <>
      <section style={{ paddingTop: 64, borderTop: 'none' }}>
        <div className="wrap">
          <span className="eyebrow">OPEN CHANNEL</span>
          <h1 style={{ marginTop: 14, fontSize: 'clamp(1.9rem,4vw,2.6rem)', maxWidth: '16ch' }}>
            Send a transmission.
          </h1>
          <p style={{ marginTop: 12, maxWidth: '56ch' }}>
            Open to internships, collaboration on autonomous systems, and anything involving robots that have to
            make their own decisions. Reach out directly, or use the form below.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap contact-grid">
          <div>
            <ul className="contact-list">
              <li>
                <span className="k">EMAIL</span>
                <a href="mailto:dhruvbist123@gmail.com">dhruvbist123@gmail.com</a>
              </li>
              <li>
                <span className="k">LINKEDIN</span>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/dhruvsinghbisht
                </a>
              </li>
              <li>
                <span className="k">GITHUB</span>
                <a href="https://github.com/Dhruv-Bisht" target="_blank" rel="noopener noreferrer">
                  github.com/Dhruv-Bisht
                </a>
              </li>
              <li>
                <span className="k">LEETCODE</span>
                <a href="https://leetcode.com/dhruvbist2306" target="_blank" rel="noopener noreferrer">
                  leetcode.com/dhruvbist2306
                </a>
              </li>
              <li>
                <span className="k">LOCATION</span>
                <span className="v">Bangalore, Karnataka, India</span>
              </li>
            </ul>
            <p style={{ maxWidth: '48ch' }}>
              LinkedIn link coming soon — swap in the real URL once you have it.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
