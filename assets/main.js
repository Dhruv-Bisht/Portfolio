// ============================================================
// Shared chrome: header, mobile nav, depth rail, reveal-on-scroll
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
    updateDepthRail();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Depth rail fill reflects scroll progress through the page
  function updateDepthRail() {
    const fill = document.querySelector('.depth-rail .fill');
    if (!fill) return;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
    fill.style.height = pct + '%';
  }

  // Reveal-on-scroll for section heads only (single restrained motion moment)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Sonar blips navigate to project anchors
  document.querySelectorAll('.sonar-blip').forEach(b => {
    b.addEventListener('click', () => {
      const href = b.getAttribute('data-href');
      if (href) window.location.href = href;
    });
    b.style.cursor = 'pointer';
  });

  initDoraDemo();
  initSpamDemo();
  initResumeTabs();
  initAuvDiagram();
});

// ============================================================
// DORA demo — Data-driven Optimized Robot Allocation
// Synthetic simulation: given task demand + task duration,
// compute fleet utilization for the current fleet size, suggest
// an optimal fleet size to hit a target utilization band, and
// raise an availability alert when the fleet is under-provisioned.
// ============================================================
function initDoraDemo() {
  const root = document.getElementById('dora-demo');
  if (!root) return;

  const demandEl = root.querySelector('#dora-demand');
  const durationEl = root.querySelector('#dora-duration');
  const fleetEl = root.querySelector('#dora-fleet');
  const demandVal = root.querySelector('#dora-demand-val');
  const durationVal = root.querySelector('#dora-duration-val');
  const fleetVal = root.querySelector('#dora-fleet-val');

  const utilCell = root.querySelector('#dora-util');
  const suggestedCell = root.querySelector('#dora-suggested');
  const bufferCell = root.querySelector('#dora-buffer');
  const utilFill = root.querySelector('#dora-util-fill');
  const alertBox = root.querySelector('#dora-alert');
  const chartSvg = root.querySelector('#dora-chart');

  const CAPACITY_PER_ROBOT = 60; // task-minutes available per robot per hour (synthetic)
  const TARGET_UTIL = 0.75;

  // Synthetic 12-shift demand history seeded from current demand, for the chart
  function synthDemandSeries(baseDemand) {
    const series = [];
    let seed = baseDemand;
    for (let i = 0; i < 12; i++) {
      const noise = (Math.sin(i * 1.7) * 0.18) + ((i % 3 === 0) ? 0.12 : -0.05);
      seed = Math.max(4, baseDemand * (1 + noise));
      series.push(seed);
    }
    return series;
  }

  function render() {
    const demand = parseInt(demandEl.value, 10);      // tasks per hour
    const duration = parseInt(durationEl.value, 10);   // avg minutes per task
    const fleet = parseInt(fleetEl.value, 10);         // robots available

    demandVal.textContent = demand + ' tasks/hr';
    durationVal.textContent = duration + ' min';
    fleetVal.textContent = fleet + ' robots';

    const requiredMinutes = demand * duration;
    const availableMinutes = fleet * CAPACITY_PER_ROBOT;
    const utilization = Math.min(2, requiredMinutes / availableMinutes); // cap for display sanity

    const suggestedFleet = Math.max(1, Math.ceil(requiredMinutes / (CAPACITY_PER_ROBOT * TARGET_UTIL)));
    const buffer = fleet - suggestedFleet;

    utilCell.textContent = Math.round(utilization * 100) + '%';
    suggestedCell.textContent = suggestedFleet;
    bufferCell.textContent = (buffer > 0 ? '+' : '') + buffer;

    utilFill.style.width = Math.min(100, utilization * 100) + '%';

    utilCell.parentElement.classList.remove('alert', 'danger');
    bufferCell.parentElement.classList.remove('alert', 'danger');

    if (utilization >= 0.95) {
      utilFill.style.background = 'var(--red)';
      utilCell.parentElement.classList.add('danger');
      bufferCell.parentElement.classList.add('danger');
      alertBox.className = 'alert-msg bad';
      alertBox.textContent = `AVAILABILITY ALERT — fleet at ${Math.round(utilization*100)}% load. Add ${Math.max(1, -buffer)} robot(s) or demand will queue.`;
    } else if (utilization >= 0.85) {
      utilFill.style.background = 'var(--amber)';
      utilCell.parentElement.classList.add('alert');
      bufferCell.parentElement.classList.add('alert');
      alertBox.className = 'alert-msg warn';
      alertBox.textContent = `Approaching capacity (${Math.round(utilization*100)}%). Recommended fleet size: ${suggestedFleet}.`;
    } else {
      utilFill.style.background = 'var(--accent)';
      alertBox.className = 'alert-msg ok';
      alertBox.textContent = `Fleet healthy at ${Math.round(utilization*100)}% load. Recommended fleet size: ${suggestedFleet} (current: ${fleet}).`;
    }

    drawChart(synthDemandSeries(demand), fleet, duration);
  }

  function drawChart(series, fleet, duration) {
    const w = 560, h = 120, pad = 8;
    const capacityLine = (fleet * CAPACITY_PER_ROBOT) / duration; // tasks/hr this fleet can sustain
    const maxVal = Math.max(...series, capacityLine) * 1.15;
    const stepX = (w - pad * 2) / (series.length - 1);

    const pts = series.map((v, i) => {
      const x = pad + i * stepX;
      const y = h - pad - (v / maxVal) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const capY = h - pad - (capacityLine / maxVal) * (h - pad * 2);

    chartSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    chartSvg.innerHTML = `
      <line x1="${pad}" y1="${capY.toFixed(1)}" x2="${w-pad}" y2="${capY.toFixed(1)}"
        stroke="var(--muted-2)" stroke-width="1" stroke-dasharray="3 4" />
      <text x="${w-pad}" y="${(capY-6).toFixed(1)}" text-anchor="end" class="sonar-label" fill="var(--muted-2)" font-size="9">fleet capacity</text>
      <polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      ${series.map((v,i) => {
        const x = pad + i * stepX;
        const y = h - pad - (v / maxVal) * (h - pad * 2);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" fill="var(--bg)" stroke="var(--accent)" stroke-width="1.5" />`;
      }).join('')}
    `;
  }

  [demandEl, durationEl, fleetEl].forEach(el => el.addEventListener('input', render));
  render();
}

// ============================================================
// Spam Detection demo — simplified client-side heuristic
// standing in for the trained TF-IDF + Naive Bayes model,
// so the concept is explorable without shipping a backend.
// ============================================================
function initSpamDemo() {
  const root = document.getElementById('spam-demo');
  if (!root) return;
  const input = root.querySelector('#spam-input');
  const btn = root.querySelector('#spam-classify');
  const result = root.querySelector('#spam-result');

  const SPAM_SIGNALS = [
    'free', 'winner', 'urgent', 'click here', 'act now', 'limited time',
    'congratulations', 'claim your', 'guarantee', 'no cost', 'risk-free',
    'earn money', 'cash prize', '100% free', 'unsubscribe', 'lottery',
    'verify your account', 'wire transfer', 'viagra', 'weight loss'
  ];

  function scoreText(text) {
    const lower = text.toLowerCase();
    let hits = 0;
    SPAM_SIGNALS.forEach(sig => { if (lower.includes(sig)) hits++; });
    const exclaims = (text.match(/!/g) || []).length;
    const capsWords = (text.match(/\b[A-Z]{3,}\b/g) || []).length;
    const score = hits * 2 + exclaims * 0.5 + capsWords * 0.7;
    return { score, hits };
  }

  function classify() {
    const text = input.value.trim();
    if (!text) {
      result.innerHTML = '<span class="tag ham">—</span> enter a message to classify';
      return;
    }
    const { score } = scoreText(text);
    const isSpam = score >= 2;
    const confidence = Math.min(97, 55 + score * 9).toFixed(0);
    result.innerHTML = isSpam
      ? `<span class="tag spam">SPAM</span> ${confidence}% confidence (simplified demo heuristic)`
      : `<span class="tag ham">NOT SPAM</span> ${confidence}% confidence (simplified demo heuristic)`;
  }

  btn.addEventListener('click', classify);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.metaKey) classify(); });
}

// ============================================================
// Resume tabs
// ============================================================
function initResumeTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ============================================================
// AUV thruster diagram — click a thruster to see its spec
// ============================================================
function initAuvDiagram() {
  const root = document.getElementById('auv-diagram');
  if (!root) return;
  const nodes = root.querySelectorAll('[data-thruster]');
  const out = root.querySelector('#auv-spec-out');
  const specs = {
    fwd_left: 'Forward-left thruster — pitch & yaw trim, driven via PyMAVLink servo output.',
    fwd_right: 'Forward-right thruster — mirrored trim channel for forward-left.',
    aft_left: 'Aft-left thruster — primary forward/reverse thrust.',
    aft_right: 'Aft-right thruster — primary forward/reverse thrust, paired with aft-left for yaw.',
    sonar: 'Ping Sonar — real-time depth monitoring & obstacle range for autonomous navigation.',
    compute: 'Jetson Orin Nano + Pixhawk — onboard compute and flight controller pairing.'
  };
  nodes.forEach(n => {
    n.addEventListener('click', () => {
      nodes.forEach(x => x.classList.remove('active-node'));
      n.classList.add('active-node');
      const key = n.getAttribute('data-thruster');
      out.textContent = specs[key] || '';
    });
  });
}
