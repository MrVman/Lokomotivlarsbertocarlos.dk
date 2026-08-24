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
      .map(
        (d) => `<tr>
          <td>${d.title}</td>
          <td>${d.date}</td>
          <td>${d.kind.toUpperCase()}</td>
          <td>${d.file === "#" ? "<span class='form-note'>Læg filen i /medlem/docs og ret data.js</span>" : `<a href="${d.file}">Hent</a>`}</td>
        </tr>`
      )
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
    tb.innerHTML = (window.LLC_DATA.fines || [])
      .map(
        (f) => `<tr>
          <td>${f.player}</td>
          <td>${f.reason}${f.note ? " — " + f.note : ""}</td>
          <td>${f.amount ? f.amount + " kr" : "—"}</td>
          <td>${f.paid ? "Betalt" : "Åben"}</td>
          <td>${f.date}</td>
        </tr>`
      )
      .join("");
    const link = document.getElementById("teamsbox-link");
    if (link) {
      const url = cfg().teamsboxUrl;
      if (url) {
        link.href = url;
        link.hidden = false;
      }
    }
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
  });
})();
