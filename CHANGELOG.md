# Changelog — Louis Engineering Portal

All notable changes to this project are documented here.

---

## [v1.0] — 2026-06-25

### Added
- New standalone repository `louis-engineering-portal` — independent of Factory Dashboard and AIOS.
- Repo layout: `portal/{index.html, style.css, app.js, assets/icons/}` with root `README.md` and `CHANGELOG.md`.
- **Homepage**: Welcome Louis, current date, and a live ticking clock (zh-TW locale).
- **Section 1 — Today's Focus**: priority task list with status marks (mock).
- **Section 2 — Applications**: 11 launch cards — 宜蘭廠區工作控管, 工務報工, 品評分析, 研發專案, 需求取號, AI Development Center, SOP Center, BI Dashboard, Equipment Center, Teams, SharePoint. Each card has icon, title, department code, description, launch button, and URL placeholder.
- **Section 3 — AI Status**: ChatGPT, Claude, Gemini, Copilot with Running / Idle / Waiting / Completed status chips (mock).
- **Section 4 — Notification Center**: latest notifications with info / ok / warn / alert levels (mock).
- **Section 5 — Quick Links**: GitHub, Factory Dashboard, Development Center, Teams.
- `assets/icons/favicon.svg` browser tab icon and an icons folder README.

### Architecture
- Single source of truth: all content defined as plain JS arrays/objects in `app.js`.
- Data-driven rendering — adding an app, link, or notification requires only a new data entry.
- URL wiring is a one-field edit (`url` in `APPS` / `QUICK_LINKS`); unlinked items show **Not linked**.

### Design
- Enterprise / modern / minimal / fast. Glass panels, cyan signal accent, monospace telemetry.
- Mobile-first responsive grids (1 → 2 → 3/4 columns).
- Accessibility: visible keyboard focus, `prefers-reduced-motion` respected.

### Technology
- Pure HTML + CSS + JavaScript. No framework, no Firebase, no database, no build step.

---

## Roadmap (not yet implemented)

- Wire real URLs into `APPS` and `QUICK_LINKS`.
- Optional: real usage tracking and per-application live status.
- Optional: replace emoji with custom SVG icons in `assets/icons/`.
