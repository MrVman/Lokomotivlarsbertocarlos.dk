(function () {
  const C = () => window.LLC_CONFIG || {};
  const D = () => window.LLC_DATA || {};

  function fmtDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("da-DK", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  function scoreParts(result) {
    if (!result || !/–/.test(result)) return null;
    const [a, b] = result.split("–").map((n) => Number(n.trim()));
    if (Number.isNaN(a) || Number.isNaN(b)) return null;
    return [a, b];
  }

  function nextFixture() {
    const today = new Date().toISOString().slice(0, 10);
    return (D().fixtures || [])
      .filter((f) => !f.result && !f.cancelled && f.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0];
  }

  function renderHome() {
    const next = nextFixture();
    const el = document.getElementById("next-match");
    if (el && next) {
      el.innerHTML = `
        <p class="kicker">Næste kamp</p>
        <h2>${next.home ? "LLC" : next.opponent} – ${next.home ? next.opponent : "LLC"}</h2>
        <p class="lede">${fmtDate(next.date)} kl. ${next.time} · ${next.venue}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="kampe.html">Kampprogram</a>
          <a class="btn btn-ghost" href="kalender.html">Kalender</a>
        </div>`;
    }

    const ig = document.getElementById("insta-feed");
    if (ig) {
      if (C().instagramEmbed) {
        ig.innerHTML = C().instagramEmbed;
      } else {
        ig.innerHTML = (D().instagram || [])
          .map(
            (p) => `<figure class="insta-item tone-${p.tone || "kamp"}">
              ${p.src ? `<img src="${p.src}" alt="${p.caption}">` : ""}
              <figcaption>@${C().instagramUser} · ${p.date}<br>${p.caption}</figcaption>
            </figure>`
          )
          .join("");
      }
    }
  }

  function renderHold() {
    const box = document.getElementById("squad");
    if (!box) return;
    const groups = ["Målmand", "Wing Back", "Forsvar", "Midtbane", "Angreb", "Utility"];
    box.innerHTML = groups
      .map((g) => {
        const players = (D().squad || []).filter((p) => p.pos === g);
        if (!players.length) return "";
        return `<section class="section-tight">
          <h3 class="kicker" style="display:block">${g}</h3>
          <div class="squad">${players
            .map(
              (p) => `<article class="player">
                <div><b>${p.name}${p.captain ? " · C" : ""}</b><br><span>Hos os siden ${p.since}</span></div>
              </article>`
            )
            .join("")}</div>
        </section>`;
      })
      .join("");

    const coaches = document.getElementById("coaches");
    if (coaches) {
      coaches.innerHTML = (D().coaches || [])
        .map((c) => `<article class="card"><p class="kicker">${c.role}</p><h3>${c.name}</h3></article>`)
        .join("");
    }
  }

  function renderOm() {
    const tl = document.getElementById("hall-of-fame");
    if (tl) {
      tl.innerHTML = (D().hallOfFame || [])
        .map(
          (h) => `<article class="tl-item">
            <div class="year">${h.year}</div>
            <div><h3>${h.title}</h3><p>${h.text}</p></div>
          </article>`
        )
        .join("");
    }
    const kits = document.getElementById("kits");
    if (kits) {
      kits.innerHTML = (D().kits || [])
        .map(
          (k) => `<article class="kit-card kit-${k.id}">
            <div class="jersey" aria-hidden="true"><span class="collar"></span></div>
            <div class="shorts" aria-hidden="true"></div>
            <h3>${k.name}</h3>
            <p>${k.years}<br>${k.shirt} / ${k.shorts}<br>${k.note}</p>
          </article>`
        )
        .join("");
    }
  }

  function renderKampe() {
    const upcoming = document.getElementById("upcoming");
    const results = document.getElementById("results");
    const table = document.getElementById("table");
    const fixtures = D().fixtures || [];
    if (upcoming) {
      upcoming.innerHTML = fixtures
        .filter((f) => f.season === "efterar" && !f.cancelled)
        .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
        .map(
          (f) => `<tr>
            <td>${fmtDate(f.date)} · ${f.time}</td>
            <td>${f.home ? "Hjemme" : "Ude"}</td>
            <td>${f.opponent}</td>
            <td>${f.venue}</td>
          </tr>`
        )
        .join("");
    }
    if (results) {
      results.innerHTML = fixtures
        .filter((f) => f.season === "forar")
        .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
        .map((f) => {
          const parts = scoreParts(f.result);
          let cls = "";
          if (parts) {
            const us = f.home ? parts[0] : parts[1];
            const them = f.home ? parts[1] : parts[0];
            cls = us > them ? "tag-won" : us < them ? "tag-lost" : "";
          }
          const label = f.result || f.note || "—";
          const extra = f.result && f.note ? ` <span class="form-note">${f.note}</span>` : "";
          return `<tr>
            <td>${fmtDate(f.date)}</td>
            <td>${f.home ? "LLC" : f.opponent} – ${f.home ? f.opponent : "LLC"}</td>
            <td class="${cls}"><strong>${label}</strong>${extra}</td>
          </tr>`;
        })
        .join("");
    }
    if (table) {
      table.innerHTML = (D().table || [])
        .map(
          (r) => `<tr class="${r.team.includes("Lokomotiv") ? "is-us" : ""}">
            <td>${r.pos}</td><td>${r.team}</td><td>${r.p}</td><td>${r.w}</td>
            <td>${r.d}</td><td>${r.l}</td><td>${r.gf}–${r.ga}</td><td><strong>${r.pts}</strong></td>
          </tr>`
        )
        .join("");
    }

    const frame = document.getElementById("dai-frame");
    if (frame) {
      const url = C().daiIframeUrl;
      if (url) {
        frame.innerHTML = `<iframe title="DAI kampe og stilling" src="${url}" loading="lazy"></iframe>
          <p class="form-note">Kilde: DAI. <a href="${C().daiClubUrl}" rel="noopener">Åbn hos DAI</a></p>`;
      }
    }
  }

  function renderKalender() {
    const list = document.getElementById("event-list");
    if (list) {
      list.innerHTML = (D().events || [])
        .map(
          (e) => `<article class="card">
            <p class="kicker">${e.kind}</p>
            <h3>${e.title}</h3>
            <p>${fmtDate(e.date)} kl. ${e.time}<br>${e.place}</p>
          </article>`
        )
        .join("");
    }
    const gcal = document.getElementById("gcal");
    if (gcal && C().googleCalendarId) {
      const src = encodeURIComponent(C().googleCalendarId);
      const tz = encodeURIComponent(C().googleCalendarTz || "Europe/Copenhagen");
      gcal.innerHTML = `<iframe title="Google Kalender" src="https://calendar.google.com/calendar/embed?src=${src}&ctz=${tz}&mode=AGENDA&showTitle=0&showPrint=0&showCalendars=0" loading="lazy"></iframe>`;
    }
  }

  function renderGalleri() {
    const grid = document.getElementById("gallery");
    if (!grid) return;
    const items = D().gallery || [];
    function paint(cat) {
      const shown = cat === "alle" ? items : items.filter((i) => i.cat === cat);
      grid.innerHTML = shown
        .map(
          (i) => `<figure class="tone-${i.tone || "kamp"}">
            ${i.src ? `<img src="${i.src}" alt="${i.title}">` : ""}
            <figcaption>${i.title} · ${i.year}</figcaption>
          </figure>`
        )
        .join("");
    }
    paint("alle");
    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
        paint(btn.dataset.filter);
      });
    });
  }

  function renderSponsorer() {
    const grid = document.getElementById("sponsors");
    if (grid) {
      grid.innerHTML = (D().sponsors || [])
        .map(
          (s) => `<article class="card">
            <p class="kicker">${s.tier}</p>
            <h3>${s.name}</h3>
            <p>${s.blurb}</p>
          </article>`
        )
        .join("");
    }
  }

  function renderShop() {
    const grid = document.getElementById("shop-grid");
    if (!grid) return;
    const enabled = C().shopEnabled;
    grid.innerHTML = (D().shop || [])
      .map(
        (p) => `<article class="card">
          <p class="kicker">${p.tag}</p>
          <h3>${p.name}</h3>
          <p>${p.price}</p>
          <button class="btn btn-ghost" type="button" ${enabled ? "" : "disabled"}>${enabled ? "Læg i kurv" : "Kommer snart"}</button>
        </article>`
      )
      .join("");
  }

  async function handleForm(form) {
    const ok = form.parentElement.querySelector(".form-ok");
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = C().formEndpoint;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (_) {}
    } else {
      const subject = encodeURIComponent(data.subject || "Henvendelse til LLC");
      const body = encodeURIComponent(
        Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      );
      window.location.href = `mailto:${C().email}?subject=${subject}&body=${body}`;
    }
    form.hidden = true;
    if (ok) ok.style.display = "block";
  }

  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || !form.hasAttribute("data-llc-form")) return;
    e.preventDefault();
    handleForm(form);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    if (page === "home") renderHome();
    if (page === "hold") renderHold();
    if (page === "om") renderOm();
    if (page === "kampe") renderKampe();
    if (page === "kalender") renderKalender();
    if (page === "galleri") renderGalleri();
    if (page === "sponsorer") renderSponsorer();
    if (page === "shop") renderShop();
  });
})();
