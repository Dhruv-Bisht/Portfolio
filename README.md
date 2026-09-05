# Dhruv Singh Bisht — Portfolio

Static multi-page site. No build step, no dependencies.

## Pages
- `index.html` — home (hero sonar sweep, about, skills, featured projects)
- `projects.html` — all 5 projects, including live DORA and spam-classifier demos
- `resume.html` — tabbed resume with timeline + PDF download
- `contact.html` — contact links and form

## Deploy to Vercel
1. Push this folder to a GitHub repo (or drag-and-drop the folder at vercel.com/new).
2. In Vercel, "Framework Preset" → **Other** (no build command needed).
3. Deploy — Vercel serves static files as-is.

Or via CLI from inside this folder:
```
npm i -g vercel
vercel
```

## Before you publish
- Replace the placeholder `#` links for LinkedIn, GitHub, and LeetCode in the header-less footer/contact list (search for `target="_blank"` in each HTML file).
- `resumeFut` on the projects page is a placeholder description — send the real details and swap in the copy.
- The contact form uses a `mailto:` action (no backend). For in-page submission, wire it to Formspree or a Vercel serverless function.
- The spam-detection demo on the projects page is a simplified keyword heuristic for the browser — it stands in for the real trained TF-IDF + Naive Bayes model.
