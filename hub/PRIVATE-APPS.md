# Private Projects & Financing Architecture

This repository (`AustnG/austng.github.io`) is **public** and deploys as a static site on GitHub Pages. Because static pages cannot enforce real server-side authentication — and anything committed to a public repository is readable in git history — private projects and personal financing tools follow a strict boundary.

## What stays out of this repo

- Personal financial data, budgets, account balances, tax details, or spreadsheet links that expose private data.
- API keys, tokens, passwords, or client-side "password gates" (a password checked in browser JavaScript is not real security).
- Private employer systems, vendors, clients, or plans (see [`AGENTS.md`](../AGENTS.md) rule 8).

## How to handle private tools and financing

### 1. Keep private data in authenticated tools today
- **Google Sheets / Drive / Apps Script:** Keep personal finance sheets and private tracking docs in Google Drive locked to your Google account. You can still log a high-level, non-sensitive project entry in this hub (e.g., "Personal Finance Automation") without pasting private sheet URLs or numbers.
- **Separate private GitHub repo:** When you want private Markdown notes, scripts, or code for finance or personal projects, create a private repo (for example, `AustnG/private-hub`) so the code and history stay private.

### 2. Hosting private apps behind a real login later
When you are ready to host private web apps (financing dashboards, personal utilities, or private AI Studio exports) and navigate to them cleanly:

- **Cloudflare Pages + Cloudflare Access (Zero Trust):** Free for personal use, connects to a private GitHub repo, and puts real Google/email OTP login in front of an entire app or path (for example, `app.yourdomain.com`) before a single byte of HTML is served.
- **Firebase Hosting / Cloud Run + Firebase Auth (or Google Identity):** Good fit if you are already building in Google AI Studio and connecting to Google Sheets or Firestore.
- **Google Apps Script Web App (`Execute as: Me`, `Who has access: Only myself`):** Zero-server way to put a private UI directly over Google Sheets, gated by your Google sign-in.

## Future navigation pattern

Once a private app is hosted behind real authentication, you can:
- Keep it bookmarked from your personal launcher or browser, or
- Point a clean, unlisted redirect or link (for example on a future custom domain like `app.austingreer.com`) straight to the login-protected host — while `austng.github.io` stays fast, static, and strictly public-safe.
