/* =========================================================
   Louis Engineering Portal — app.js
   Portal v1.0
   Pure JavaScript. No framework. No backend. Mock data only.

   ARCHITECTURE
   - All content lives in the data blocks below = single source of truth.
   - Connect a real application later: edit only its `url` in APPS.
   - Wire Quick Links later: edit only the `url` in QUICK_LINKS.
   - Rendering is data-driven; add an entry and it appears automatically.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   APPLICATIONS (Section 2) — launch cards
   url "#" = placeholder (shows "Not linked" until wired)
   --------------------------------------------------------- */
const APPS = [
  { icon: "🏭", title: "宜蘭廠區工作控管", code: "MF_KANBAN",
    desc: "雙週看板、任務追蹤、重複偵測與會議記錄解析。", url: "#" },
  { icon: "🔧", title: "工務報工",         code: "MA_MAINT",
    desc: "派工與報工流程、保養排程、設備與庫存管理。",     url: "#" },
  { icon: "🧪", title: "品評分析",         code: "RD_PINPAN",
    desc: "QR 評分、趨勢分析與保存試驗多輪比對。",          url: "#" },
  { icon: "📋", title: "研發專案",         code: "RD_PROJ",
    desc: "研發專案進度、文件與 AI 流程優化追蹤。",         url: "#" },
  { icon: "🎫", title: "需求取號",         code: "RD_TICKET",
    desc: "產品開發需求編號、專案卡與軟刪除還原。",         url: "#" },
  { icon: "🤖", title: "AI Development Center", code: "AI_DEV",
    desc: "AI 專案架構、Persona 與跨部門導入管理。",        url: "#" },
  { icon: "📚", title: "SOP Center",       code: "OPS_SOP",
    desc: "標準作業程序文件庫與版本管理。",                url: "#" },
  { icon: "📊", title: "BI Dashboard",     code: "BI_DASH",
    desc: "營運指標、產線數據與決策視覺化。",              url: "#" },
  { icon: "⚙",  title: "Equipment Center", code: "MA_EQUIP",
    desc: "設備主檔、保養計畫與稽核紀錄。",                url: "#" },
  { icon: "💬", title: "Teams",            code: "EXT_TEAMS",
    desc: "部門協作、會議與即時訊息。",                    url: "#" },
  { icon: "📁", title: "SharePoint",       code: "EXT_SP",
    desc: "企業文件儲存、共享與權限管理。",                url: "#" }
];

/* ---------------------------------------------------------
   TODAY'S FOCUS (Section 1) — mock
   --------------------------------------------------------- */
const FOCUS = {
  headline: "三項主線任務進行中",
  sub: "聚焦今日須推進的工作，其餘排入待辦。",
  items: [
    { text: "完成工務報工庫存盤點驗收",       meta: "due 11:00 · 高優先", done: false },
    { text: "確認研發 AI 手冊章節審閱意見",   meta: "due 14:00",          done: false },
    { text: "品評系統保存試驗資料匯出",        meta: "已完成 · 08:47",      done: true  }
  ]
};

/* ---------------------------------------------------------
   AI STATUS (Section 3) — Running / Idle / Waiting / Completed (mock)
   --------------------------------------------------------- */
const AI_STATUS = [
  { name: "ChatGPT", icon: "🟢", status: "completed", meta: "RFQ draft · 2m ago" },
  { name: "Claude",  icon: "🔵", status: "running",   meta: "Portal v1.0 build" },
  { name: "Gemini",  icon: "🟣", status: "waiting",   meta: "queued · data import" },
  { name: "Copilot", icon: "⚪", status: "idle",      meta: "no active task" }
];

/* ---------------------------------------------------------
   NOTIFICATION CENTER (Section 4) — mock
   level: info | warn | ok | alert
   --------------------------------------------------------- */
const NOTIFICATIONS = [
  { level: "alert", title: "庫存低水位警示", desc: "工務報工：3 項耗材低於安全庫存。", time: "09:12" },
  { level: "ok",    title: "品評資料已匯出", desc: "保存試驗第 3 輪 CSV 已產生。",      time: "08:47" },
  { level: "info",  title: "研發 AI 手冊更新", desc: "審閱意見已回覆。",                time: "Yesterday" },
  { level: "warn",  title: "Teams 權限待確認", desc: "RD_ 專案 Private 邀請待 IT 核可。", time: "Yesterday" }
];

/* ---------------------------------------------------------
   QUICK LINKS (Section 5) — external shortcuts
   url "#" = placeholder; fill in the real destination later.
   --------------------------------------------------------- */
const QUICK_LINKS = [
  { icon: "🐙", title: "GitHub",              meta: "repository", url: "#" },
  { icon: "🏭", title: "Factory Dashboard",   meta: "external",   url: "#" },
  { icon: "🧭", title: "Development Center",   meta: "external",   url: "#" },
  { icon: "💬", title: "Teams",               meta: "external",   url: "#" }
];

/* ========================================================= */
/* Helpers                                                    */
/* ========================================================= */
const $  = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

function openUrl(name, url) {
  if (!url || url === "#") {
    alert(`「${name}」尚未連結 URL。\n請於 app.js 設定對應的 url 欄位後再啟動。`);
    return;
  }
  window.open(url, "_blank", "noopener");
}

/* ========================================================= */
/* Rendering                                                  */
/* ========================================================= */

/* Homepage clock */
function startClock() {
  const timeEl = $("#clockTime");
  const dateEl = $("#clockDate");
  const tick = () => {
    const now = new Date();
    const p = n => String(n).padStart(2, "0");
    timeEl.textContent = `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;
    dateEl.textContent = now.toLocaleDateString("zh-TW", {
      year: "numeric", month: "long", day: "numeric", weekday: "long"
    });
  };
  tick();
  setInterval(tick, 1000);
}

/* Section 1 — Today's Focus */
function renderFocus() {
  $("#focusHeadline").textContent = FOCUS.headline;
  $("#focusSub").textContent = FOCUS.sub;
  const list = $("#focusList");
  FOCUS.items.forEach(it => {
    const node = el("div", `focus-item${it.done ? " done" : ""}`);
    node.innerHTML =
      `<span class="mark"></span>
       <div><div class="ft">${it.text}</div><div class="fm">${it.meta}</div></div>`;
    list.appendChild(node);
  });
}

/* Section 2 — Applications */
function renderApps() {
  const grid = $("#appsGrid");
  $("#appsCount").textContent = `${APPS.length} apps`;
  APPS.forEach(app => {
    const linked = app.url && app.url !== "#";
    const card = el("article", "app-card glass");
    card.innerHTML = `
      <div class="ac-top">
        <div class="ac-ico">${app.icon}</div>
        <div style="min-width:0">
          <h3 class="ac-title">${app.title}</h3>
          <div class="ac-code">${app.code}</div>
        </div>
      </div>
      <p class="ac-desc">${app.desc}</p>
      <div class="url-hint">URL — ${linked ? app.url : "placeholder（待連結）"}</div>
      <div class="ac-foot">
        <button class="btn-launch" ${linked ? "" : "disabled"}>
          ${linked ? "Launch" : "Not linked"}
        </button>
      </div>`;
    card.querySelector(".btn-launch").addEventListener("click", () => openUrl(app.title, app.url));
    grid.appendChild(card);
  });
}

/* Section 3 — AI Status */
function renderAIStatus() {
  const grid = $("#aiGrid");
  AI_STATUS.forEach(a => {
    const node = el("article", "ai-card glass");
    node.appendChild(el("div", "",
      `<div class="ai-name"><span class="ico">${a.icon}</span>${a.name}</div>
       <div class="ai-meta">${a.meta}</div>`));
    node.appendChild(el("span", `chip ${a.status}`, a.status));
    grid.appendChild(node);
  });
}

/* Section 4 — Notification Center */
function renderNotifications() {
  const list = $("#notifList");
  NOTIFICATIONS.forEach(n => {
    const node = el("div", "notif");
    node.appendChild(el("span", `dot ${n.level}`));
    node.appendChild(el("div", "",
      `<div class="n-title">${n.title}</div>
       <div class="n-desc">${n.desc}</div>
       <div class="n-time">${n.time}</div>`));
    list.appendChild(node);
  });
}

/* Section 5 — Quick Links */
function renderQuickLinks() {
  const list = $("#linksList");
  QUICK_LINKS.forEach(lk => {
    const item = el("div", "link-item");
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.innerHTML =
      `<span class="li-ico">${lk.icon}</span>
       <span class="li-title">${lk.title}</span>
       <span class="li-meta">${lk.meta}</span>`;
    const go = () => openUrl(lk.title, lk.url);
    item.addEventListener("click", go);
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
    list.appendChild(item);
  });
}

/* ========================================================= */
/* Init                                                       */
/* ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  startClock();
  renderFocus();
  renderApps();
  renderAIStatus();
  renderNotifications();
  renderQuickLinks();
});
