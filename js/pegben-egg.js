(function () {
  const GAME_URL = "/pegben/index.html";

  function boomSound() {
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const t = ctx.currentTime;
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.45, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      noise.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, t);
      filter.frequency.exponentialRampToValueAtTime(80, t + 0.4);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(t + 0.45);
    } catch (_) {}
  }

  function mount() {
    if (document.body.dataset.page !== "home") return;

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const egg = document.createElement("button");
    egg.type = "button";
    egg.className = "pegben-egg";
    egg.setAttribute("aria-label", "Pegben");
    egg.innerHTML = '<img src="pegben/egg-pirate.png" alt="" width="72" height="112">';
    hero.appendChild(egg);

    const boom = document.createElement("div");
    boom.className = "pegben-boom";
    boom.setAttribute("aria-hidden", "true");
    document.body.appendChild(boom);

    const overlay = document.createElement("div");
    overlay.className = "pegben-fs";
    overlay.hidden = true;
    overlay.innerHTML = `
      <button type="button" class="pegben-fs-close" aria-label="Luk spil">Luk</button>
      <iframe title="Pegben" allow="fullscreen; gamepad; autoplay" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;
    document.body.appendChild(overlay);

    const frame = overlay.querySelector("iframe");
    const closeBtn = overlay.querySelector(".pegben-fs-close");
    let open = false;

    function closeGame() {
      open = false;
      overlay.hidden = true;
      overlay.classList.remove("is-on");
      document.body.classList.remove("pegben-lock");
      frame.src = "about:blank";
      egg.classList.remove("is-gone");
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit && (document.fullscreenElement || document.webkitFullscreenElement)) {
        exit.call(document).catch(() => {});
      }
    }

    function openGame() {
      open = true;
      overlay.hidden = false;
      overlay.classList.add("is-on");
      document.body.classList.add("pegben-lock");
      frame.src = GAME_URL;
      const req = overlay.requestFullscreen || overlay.webkitRequestFullscreen;
      if (req) req.call(overlay).catch(() => {});
      window.setTimeout(() => {
        try { frame.contentWindow && frame.contentWindow.focus(); } catch (_) {}
        frame.focus();
      }, 80);
    }

    function explodeThenOpen() {
      const rect = egg.getBoundingClientRect();
      const size = 220;
      boom.style.width = size + "px";
      boom.style.height = size + "px";
      boom.style.left = rect.left + rect.width / 2 - size / 2 + "px";
      boom.style.top = rect.top + rect.height / 2 - size / 2 + "px";
      boom.classList.remove("is-on");
      void boom.offsetWidth;
      boom.classList.add("is-on");
      egg.classList.add("is-gone");
      boomSound();
      const wait = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 520;
      window.setTimeout(() => {
        boom.classList.remove("is-on");
        openGame();
      }, wait);
    }

    egg.addEventListener("click", explodeThenOpen);
    closeBtn.addEventListener("click", closeGame);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeGame();
    });
    window.addEventListener("message", (e) => {
      if (e.data && e.data.type === "pegben-close") closeGame();
    });
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && open) closeGame();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
