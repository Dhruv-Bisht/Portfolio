'use client';

import { useState } from 'react';

const SPAM_SIGNALS = [
  'free', 'winner', 'urgent', 'click here', 'act now', 'limited time',
  'congratulations', 'claim your', 'guarantee', 'no cost', 'risk-free',
  'earn money', 'cash prize', '100% free', 'unsubscribe', 'lottery',
  'verify your account', 'wire transfer', 'viagra', 'weight loss',
];

function scoreText(text) {
  const lower = text.toLowerCase();
  let hits = 0;
  SPAM_SIGNALS.forEach((sig) => {
    if (lower.includes(sig)) hits++;
  });
  const exclaims = (text.match(/!/g) || []).length;
  const capsWords = (text.match(/\b[A-Z]{3,}\b/g) || []).length;
  return hits * 2 + exclaims * 0.5 + capsWords * 0.7;
}

export default function SpamDemo() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const classify = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setResult(null);
      return;
    }
    const score = scoreText(trimmed);
    const isSpam = score >= 2;
    const confidence = Math.min(97, 55 + score * 9).toFixed(0);
    setResult({ isSpam, confidence });
  };

  return (
    <div className="demo-panel" id="spam-demo">
      <div className="demo-head">
        <span>
          <span className="dot"></span>TRY THE CONCEPT
        </span>
        <span>simplified client-side demo</span>
      </div>
      <div className="demo-body">
        <textarea
          className="demo-input"
          placeholder="Paste an email snippet, e.g. 'CONGRATULATIONS! You are a WINNER — click here to claim your free prize now!!!'"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={classify}>
            Classify message
          </button>
          <div className="classify-result">
            {result ? (
              <>
                <span className={`tag ${result.isSpam ? 'spam' : 'ham'}`}>
                  {result.isSpam ? 'SPAM' : 'NOT SPAM'}
                </span>{' '}
                {result.confidence}% confidence (simplified demo heuristic)
              </>
            ) : (
              <>
                <span className="tag ham">—</span> enter a message to classify
              </>
            )}
          </div>
        </div>
        <p className="chart-note" style={{ marginTop: 12 }}>
          This in-browser demo uses a lightweight keyword heuristic to illustrate the idea — the deployed Flask app
          runs the trained TF-IDF + Naive Bayes model instead.
        </p>
      </div>
    </div>
  );
}
