'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not reach the server.');
    }
  };

  return (
    <form className="console-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label htmlFor="c-name">NAME</label>
        <input type="text" id="c-name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="field-row">
        <label htmlFor="c-email">EMAIL</label>
        <input type="email" id="c-email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
      </div>
      <div className="field-row">
        <label htmlFor="c-msg">MESSAGE</label>
        <textarea id="c-msg" name="message" placeholder="What would you like to talk about?" value={form.message} onChange={handleChange} required></textarea>
      </div>
      <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Transmitting…' : 'Transmit message →'}
      </button>

      {status === 'sent' && (
        <p className="form-note" style={{ color: 'var(--accent)' }}>
          Message received — thanks, I&rsquo;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="form-note" style={{ color: 'var(--red)' }}>
          {errorMsg} Try emailing directly instead.
        </p>
      )}
    </form>
  );
}
