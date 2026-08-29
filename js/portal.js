(function () {
  const KEY = "llc_member_session";
  const BOARD_KEY = "llc_board";
  const NAME_KEY = "llc_board_name";

  function cfg() {
    return window.LLC_CONFIG || {};
  }

  function validSession() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const s = JSON.parse(raw);
      return s.ok && s.exp > Date.now();
    } catch {
      return false;
    }
  }

  function login(password) {
    const expected = String(cfg().memberPassword || "");
    if (!expected || password !== expected) return false;
    const hours = Number(cfg().memberSessionHours || 12);
    localStorage.setItem(KEY, JSON.stringify({ ok: true, exp: Date.now() + hours * 3600 * 1000 }));
    return true;
  }

  function logout() {
    localStorage.removeItem(KEY);
    location.href = "login.html";
  }

  function guard() {
    const page = document.body.dataset.page;
    if (page === "login") {
      if (validSession()) location.replace("index.html");
      return;
    }
    if (!validSession()) {
      location.replace("login.html");
    }
  }

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  function renderPlayers() {
    const tb = document.getElementById("player-rows");
    if (!tb) return;
    tb.innerHTML = (window.LLC_DATA.squad || [])
      .map(
        (p) => `<tr>
          <td><strong>${p.number}</strong></td>
          <td>${p.name}${p.captain ? " (C)" : ""}</td>
          <td>${p.pos}</td>
          <td>${p.license}</td>
          <td>${p.since}</td>
        </tr>`
      )
      .join("");
  }

  function renderDocs() {
    const tb = document.getElementById("doc-rows");
    if (!tb) return;
    tb.innerHTML = (window.LLC_DATA.documents || [])
      .map((d) => {
        const href = d.file && d.file !== "#" ? d.file : "";
        const open = href
          ? `<a href="${href}" target="_blank" rel="noopener">Åbn</a>`
          : "\u2014";
        return `<tr class="${href ? "doc-row" : ""}">
          <td>${href ? `<a href="${href}" target="_blank" rel="noopener">${d.title}</a>` : d.title}</td>
          <td>${d.date}</td>
          <td>${(d.kind || "").toUpperCase()}</td>
          <td>${open}</td>
        </tr>`;
      })
      .join("");
  }

  function loadBoard() {
    try {
      const stored = JSON.parse(localStorage.getItem(BOARD_KEY) || "[]");
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  }

  function saveBoard(posts) {
    localStorage.setItem(BOARD_KEY, JSON.stringify(posts));
  }

  function postHtml(p) {
    return `<article class="post">
      <div class="meta">${esc(p.author)} \u00b7 ${esc(p.date)}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body)}</p>
    </article>`;
  }

  function paintBoard(box, posts) {
    if (!posts.length) {
      box.innerHTML = `<p class="notice">V\u00e6ggen er tom. Skriv det f\u00f8rste opslag.</p>`;
      return;
    }
    box.innerHTML = posts.map(postHtml).join("");
  }

  function renderBoard() {
    const box = document.getElementById("board");
    if (!box) return;
    const posts = loadBoard();
    paintBoard(box, posts);

    const form = document.getElementById("board-form");
    const nameInput = form?.querySelector('[name="author"]');
    if (nameInput) {
      nameInput.value = localStorage.getItem(NAME_KEY) || "";
    }
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const author = String(fd.get("author") || "").trim();
      const title = String(fd.get("title") || "").trim();
      const body = String(fd.get("body") || "").trim();
      if (!author || !title || !body) return;
      localStorage.setItem(NAME_KEY, author);
      const post = {
        author,
        date: new Date().toISOString().slice(0, 10),
        title,
        body,
      };
      const next = [post, ...loadBoard()];
      saveBoard(next);
      form.reset();
      if (nameInput) nameInput.value = author;
      paintBoard(box, next);
    });
  }

  function renderFines() {
    const tb = document.getElementById("fine-rows");
    if (!tb) return;
    const list = window.LLC_DATA.fines || [];
    const isTypes = list.length && list[0].name;
    tb.innerHTML = list
      .map((f) => {
        if (isTypes) {
          const unit = f.unit || "kr";
          return `<tr>
            <td>${f.name}</td>
            <td>${f.amount ? f.amount + " " + unit : "\u2014"}</td>
            <td>${f.note || ""}</td>
          </tr>`;
        }
        return `<tr>
          <td>${f.player}</td>
          <td>${f.reason}${f.note ? " \u2014 " + f.note : ""}</td>
          <td>${f.amount ? f.amount + " kr" : "\u2014"}</td>
          <td>${f.paid ? "Betalt" : "\u00c5ben"}</td>
          <td>${f.date}</td>
        </tr>`;
      })
      .join("");
    const link = document.getElementById("teamsbox-link");
    if (link) {
      const url = cfg().teamsboxUrl || cfg().holdsportUrl;
      if (url) {
        link.href = url;
        link.hidden = false;
        if (!cfg().teamsboxUrl) link.textContent = "\u00c5bn Holdsport";
      }
    }
  }

  function fmtDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function todayIso() {
    const n = new Date();
    const y = n.getFullYear();
    const m = String(n.getMonth() + 1).padStart(2, "0");
    const d = String(n.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function renderBeer() {
    const list = window.LLC_DATA.beerList || [];
    const today = todayIso();
    const next = list.find((r) => !r.cancelled && r.date >= today) || null;

    const card = document.getElementById("beer-next");
    if (card) {
      if (!next) {
        card.innerHTML = `<p class="kicker">\u00d8lliste</p><h3>S\u00e6sonen er k\u00f8rt</h3><p>Ingen flere vagter p\u00e5 listen.</p>`;
      } else {
        const when = next.date === today ? "I dag" : next.weekday + " " + fmtDate(next.date);
        const who = next.lars || "Ingen tildelt";
        card.innerHTML = `
          <p class="kicker">${next.date === today ? "Dagens vagt" : "N\u00e6ste vagt"}</p>
          <h3>${who}</h3>
          <p><strong>${when}</strong> \u00b7 runde ${next.round}<br>
          ${next.home} \u2013 ${next.away}</p>
          <p class="form-note">Kolde \u00f8l og rent t\u00f8j med til kamp.</p>`;
      }
    }

    const tb = document.getElementById("beer-rows");
    if (!tb) return;
    tb.innerHTML = list
      .map((r) => {
        const past = r.date < today;
        const now = next && r.round === next.round && r.date === next.date;
        const cls = [
          r.cancelled ? "is-off" : "",
          !r.cancelled && past ? "is-past" : "",
          now ? "is-us" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const lars = r.lars || "\u2014";
        const note = r.cancelled ? " <span class=\"tag-lost\">Aflyst</span>" : "";
        return `<tr class="${cls}">
          <td>${r.round}</td>
          <td>${r.weekday}</td>
          <td>${fmtDate(r.date)}</td>
          <td class="beer-lars">${lars}${note}</td>
          <td>${r.home}</td>
          <td>${r.away}</td>
        </tr>`;
      })
      .join("");
  }

  function renderHoldsport() {
    const box = document.getElementById("holdsport");
    if (!box) return;
    if (cfg().holdsportWidget) {
      box.innerHTML = cfg().holdsportWidget;
      return;
    }
    if (cfg().holdsportUrl) {
      box.innerHTML = `
        <p class="lede">Klubben k\u00f8rer Holdsport. \u00c5bn appen eller g\u00e5 til klubbens side.</p>
        <a class="btn btn-primary" href="${cfg().holdsportUrl}" rel="noopener">\u00c5bn Holdsport</a>`;
      return;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    guard();
    const page = document.body.dataset.page;
    document.getElementById("logout-btn")?.addEventListener("click", logout);

    const form = document.getElementById("login-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const pw = form.querySelector('[name="password"]').value;
      const err = document.getElementById("login-err");
      if (login(pw)) {
        location.href = "index.html";
      } else if (err) {
        err.hidden = false;
      }
    });

    if (page === "portal-home" || page === "portal-spillere") renderPlayers();
    if (page === "portal-docs") renderDocs();
    if (page === "portal-board") renderBoard();
    if (page === "portal-fines") renderFines();
    if (page === "portal-holdsport") renderHoldsport();
    if (page === "portal-beer") renderBeer();
  });
})();
