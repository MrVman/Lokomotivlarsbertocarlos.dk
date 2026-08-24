(function () {
  const C = window.LLC_CONFIG || {};
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const file = path.split("/").pop() || "index.html";
  const inMember = path.includes("/medlem");

  const NAV = [
    { href: "index.html", label: "Forside" },
    { href: "om-klubben.html", label: "Om klubben" },
    { href: "hold.html", label: "Hold" },
    { href: "kampe.html", label: "Kampe" },
    { href: "kalender.html", label: "Kalender" },
    { href: "galleri.html", label: "Galleri" },
    { href: "sponsorer.html", label: "Sponsorer" },
    { href: "bliv-medlem.html", label: "Bliv medlem", cta: true },
    { href: "medlem/index.html", label: "Medlem" },
  ];

  function rootPrefix() {
    return inMember ? "../" : "";
  }

  function isCurrent(href) {
    const target = href.split("/").pop();
    if (file === target) return true;
    if ((file === "" || file === "index.html") && href === "index.html" && !inMember) return true;
    if (inMember && href === "medlem/index.html") return true;
    return false;
  }

  function header() {
    const p = rootPrefix();
    const links = NAV.map((item) => {
      const href = p + item.href;
      const cur = isCurrent(item.href) ? ' aria-current="page"' : "";
      const cls = item.cta ? ' class="cta-nav"' : "";
      return `<a href="${href}"${cls}${cur}>${item.label}</a>`;
    }).join("");

    return `
      <div class="stripe-bar" aria-hidden="true"></div>
      <header class="site-header">
        <div class="wrap header-inner">
          <a class="brand" href="${p}index.html">
            <img src="${p}assets/logo.svg" alt="" width="36" height="48">
            <span class="brand-name">Lokomotiv<small>Larsbertocarlos</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <nav class="nav" id="site-nav">${links}</nav>
        </div>
      </header>`;
  }

  function footer() {
    const p = rootPrefix();
    const ig = C.instagramUrl || "https://www.instagram.com/larsbertocarlos/";
    return `
      <footer class="site-footer">
        <div class="wrap footer-grid">
          <div class="footer-brand">
            <img src="${p}assets/logo.svg" alt="Lokomotiv Larsbertocarlos">
            <p>Amatørklub i DAI Region Hovedstaden. Hjemmebane i Valby Idrætspark. Stiftet 9. december 2016.</p>
          </div>
          <div>
            <h2>Klubben</h2>
            <a href="${p}om-klubben.html">Om klubben</a>
            <a href="${p}hold.html">Holdet</a>
            <a href="${p}kampe.html">Kampe & stilling</a>
            <a href="${p}shop.html">Shop</a>
          </div>
          <div>
            <h2>Kom med</h2>
            <a href="${p}bliv-medlem.html">Bliv medlem</a>
            <a href="${p}sponsorer.html">Sponsorer</a>
            <a href="${p}medlem/index.html">Medlemsportal</a>
            <a href="${ig}" rel="noopener">Instagram @${C.instagramUser || "larsbertocarlos"}</a>
          </div>
          <div>
            <h2>Find os</h2>
            <p>${C.addressShort || "Valby Idrætspark"}</p>
            <a href="mailto:${C.email || "kontakt@lokomotivlarsbertocarlos.dk"}">${C.email || ""}</a>
            <a href="${C.daiClubUrl || "#"}" rel="noopener">DAI resultater</a>
          </div>
        </div>
        <div class="wrap legal">
          <span>© ${new Date().getFullYear()} Lokomotiv Larsbertocarlos · DAI 2766</span>
          <span>
            <a href="${p}privatliv.html">Privatliv</a>
            · <a href="${p}cookies.html">Cookies</a>
            · <a href="${p}shop.html">Shop</a>
          </span>
        </div>
      </footer>
      <div class="cookie" id="cookie-banner" role="dialog" aria-label="Cookies">
        <p>Vi bruger kun nødvendige cookies til medlemslogin og dit cookievalg. Ingen sporing.</p>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-primary" type="button" id="cookie-ok">Forstået</button>
          <a class="btn btn-ghost" href="${p}cookies.html">Læs mere</a>
        </div>
      </div>`;
  }

  function mount() {
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    const banner = document.getElementById("cookie-banner");
    if (banner && !localStorage.getItem("llc_cookies")) banner.classList.add("open");
    document.getElementById("cookie-ok")?.addEventListener("click", () => {
      localStorage.setItem("llc_cookies", "necessary");
      banner?.classList.remove("open");
    });
  }

  window.LLCLayout = { mount, rootPrefix, inMember };
  document.addEventListener("DOMContentLoaded", mount);
})();
