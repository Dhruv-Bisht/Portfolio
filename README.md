# Dhruv Singh Bisht — Portfolio (Next.js)

Built with Next.js 14 (App Router), React 18, and a Node.js API route for the
contact form. No CSS framework — a single design-system stylesheet
(`app/globals.css`) drives everything.

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Project structure
```
app/
  layout.js          shared header, footer, depth-rail, fonts
  page.js             Home
  projects/page.js     Projects (AUV diagram, DORA demo, spam demo)
  resume/page.js        Resume (tabs + PDF download)
  contact/page.js       Contact (form → Node.js API route)
  api/contact/route.js  Node.js serverless function handling form submissions
  globals.css           design tokens + all component styles
components/            all interactive React client components
public/                static assets (resume PDF)
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Go to vercel.com/new, import the repo. Vercel auto-detects Next.js —
   no config needed.
3. Deploy.

Or via CLI from inside this folder:
```bash
npm i -g vercel
vercel
```

## Before you publish
- **resumeFut** (`app/projects/page.js`) is a placeholder description —
  send the real details and I'll swap in the copy.
- Replace the placeholder `#` links for LinkedIn, GitHub, and LeetCode in
  `components/Footer.js` and `app/contact/page.js`.
- The contact form posts to `app/api/contact/route.js`, a real Node.js
  serverless function. Right now it just logs the message — wire in an
  email provider (Resend, Nodemailer + SMTP, SendGrid, etc.) where the
  `TODO` comment is, and add any API keys as environment variables in the
  Vercel project settings.
- The spam-detection demo on the projects page is a simplified in-browser
  keyword heuristic — it stands in for the real trained TF-IDF + Naive
  Bayes model, which runs in your separate Flask app.
