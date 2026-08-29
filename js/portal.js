(function () {
  const KEY = "llc_member_session";

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
          : "—";
        return `<tr class="${href ? "doc-row" : ""}">
          <td>${href ? `<a href="${href}" target="_blank" rel="noopener">${d.title}</a>` : d.title}</td>
          <td>${d.date}</td>
          <td>${(d.kind || "").toUpperCase()}</td>
          <td>${open}</td>
        </tr>`;
      })
      .join("");
  }

  function renderBoard() {
    const box = document.getElementById("board");
    if (!box) return;
    const posts = window.LLC_DATA.board || [];
    box.innerHTML = posts
      .map(
        (p) => `<article class="post">
          <div class="meta">${p.author} · ${p.date}</div>
          <h3>${p.title}</h3>
          <p>${p.body}</p>
        </article>`
      )
      .join("");

    const form = document.getElementById("board-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const post = {
        author: "Medlem",
        date: new Date().toISOString().slice(0, 10),
        title: String(fd.get("title") || "Opslag"),
        body: String(fd.get("body") || ""),
      };
      const stored = JSON.parse(localStorage.getItem("llc_board") || "[]");
      stored.unshift(post);
      localStorage.setItem("llc_board", JSON.stringify(stored));
      form.reset();
      const extra = stored
        .map(
          (p) => `<article class="post">
            <div class="meta">${p.author} · ${p.date} · kun på denne enhed</div>
            <h3>${p.title}</h3>
            <p>${p.body}</p>
          </article>`
        )
        .join("");
      box.insertAdjacentHTML("afterbegin", extra);
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
            <td>${f.amount ? f.amount + " " + unit : "—"}</td>
            <td>${f.note || ""}</td>
          </tr>`;
        }
        return `<tr>
          <td>${f.player}</td>
          <td>${f.reason}${f.note ? " — " + f.note : ""}</td>
          <td>${f.amount ? f.amount + " kr" : "—"}</td>
          <td>${f.paid ? "Betalt" : "Åben"}</td>
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
        if (!cfg().teamsboxUrl) link.textContent = "Åbn Holdsport";
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
        card.innerHTML = `<p class="kicker">Ølliste</p><h3>Sæsonen er kørt</h3><p>Ingen flere vagter på listen.</p>`;
      } else {
        const when = next.date === today ? "I dag" : next.weekday + " " + fmtDate(next.date);
        const who = next.lars || "Ingen tildelt";
        card.innerHTML = `
          <p class="kicker">${next.date === today ? "Dagens vagt" : "Næste vagt"}</p>
          <h3>${who}</h3>
          <p><strong>${when}</strong> · runde ${next.round}<br>
          ${next.home} – ${next.away}</p>
          <p class="form-note">Kolde øl og rent tøj med til kamp.</p>`;
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
        const lars = r.lars || "—";
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
        <p class="lede">Klubben kører Holdsport. Åbn appen eller gå til klubbens side.</p>
        <a class="btn btn-primary" href="${cfg().holdsportUrl}" rel="noopener">Åbn Holdsport</a>`;
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
