# Louis Engineering Portal

**Version:** Portal v1.0
**Repository:** `louis-engineering-portal`
**Type:** Standalone web application — the single entry point for all Louis Engineering applications.

> ⚠️ This is a brand-new, **completely independent** project.
> It does **not** modify, import, or depend on **Factory Dashboard**, **AIOS**, or any existing repository.

---

## What it does

The Portal contains **no business logic** — it is purely a launcher and status surface:

1. **Today's Focus** — today's priority tasks (mock).
2. **Applications** — launch cards for every Louis Engineering system.
3. **AI Status** — ChatGPT / Claude / Gemini / Copilot activity (mock).
4. **Notification Center** — latest alerts (mock).
5. **Quick Links** — GitHub, Factory Dashboard, Development Center, Teams.

The homepage shows **Welcome Louis**, the current **date**, and a live **clock**.

All data is **mock**. No backend, no database, no Firebase.

---

## Folder structure

```
louis-engineering-portal/
├── README.md
├── CHANGELOG.md
└── portal/
    ├── index.html        # five-section shell, populated at runtime
    ├── style.css         # enterprise / minimal / responsive styling
    ├── app.js            # single source of truth (data) + rendering
    └── assets/
        └── icons/
            ├── favicon.svg
            └── README.md
```

---

## Run / deploy

No build step, no dependencies.

**Local:**
```bash
cd portal
python3 -m http.server 8080
# open http://localhost:8080
```

**GitHub Pages:** push the repo, then enable Pages.
- If serving from the repo root, the site lives at `…/portal/`.
- To serve the Portal at the site root instead, set Pages source to the `/portal` folder (Settings → Pages), or move the `portal/` contents to the repo root.

All paths inside `portal/` are relative, so it works under any base path.

---

## Connecting real applications (future integration)

Applications are defined once in the `APPS` array at the top of `portal/app.js`:

```js
{ icon: "🔧", title: "工務報工", code: "MA_MAINT",
  desc: "派工與報工流程、保養排程、設備與庫存管理。", url: "#" }
```

To link a system, **change only its `url`** from `"#"` to the real address. The card
becomes launchable immediately; until then it shows **Not linked**.

Quick Links work the same way — edit the `url` fields in the `QUICK_LINKS` array.

Adding a new application = append one object to `APPS`. No other code changes.

| Field   | Meaning                                                          |
|---------|------------------------------------------------------------------|
| `icon`  | Emoji shown on the card.                                         |
| `title` | Display name.                                                   |
| `code`  | Department/system prefix for future routing (`MA_`, `RD_`, …).   |
| `desc`  | One-line description.                                           |
| `url`   | Launch target. `"#"` = placeholder (not yet linked).            |

Other mock datasets you can edit freely in `app.js`: `FOCUS`, `AI_STATUS`,
`NOTIFICATIONS`, `QUICK_LINKS`.

---

## Design

Enterprise · Modern · Minimal · Fast · Responsive (mobile first).
Glass panels, cyan signal accent, monospace telemetry. Keyboard focus visible;
`prefers-reduced-motion` respected.

---

## Definition of Done — status

- [x] Portal is completely independent
- [x] No dependency on any existing project (Factory Dashboard / AIOS)
- [x] Ready for GitHub (repo layout + README + CHANGELOG)
- [x] Mock data only
- [x] Ready for future integration (one-field URL wiring, data-driven rendering)
