(function () {
  const GAME_URL = "/pegben";
  const FRAMES = [
    "assets/pegben/boom-1.png",
    "assets/pegben/boom-2.png",
    "assets/pegben/boom-3.png",
    "assets/pegben/boom-4.png",
  ];

  function preload() {
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const core = new Image();
    core.src = "assets/pegben/boom-core.png";
  }

  function boomSound() {
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const t = ctx.currentTime;
      function osc(type, freq, dur, vol, delay) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t + delay);
        o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.25), t + delay + dur);
        g.gain.setValueAtTime(vol, t + delay);
        g.gain.exponentialRampToValueAtTime(0.001, t + delay + dur);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t + delay);
        o.stop(t + delay + dur + 0.02);
      }
      osc("sine", 70, 0.45, 0.7, 0);
      osc("sawtooth", 140, 0.28, 0.22, 0.02);
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.55, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      noise.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, t);
      filter.frequency.exponentialRampToValueAtTime(90, t + 0.5);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.52);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(t + 0.55);
    } catch (_) {}
  }

  function runSparks(canvas, cx, cy, ms) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const parts = [];
    for (let i = 0; i < 86; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 90 + Math.random() * 620;
      parts.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 140,
        life: 0.28 + Math.random() * 0.6,
        max: 0.9,
        r: 1.6 + Math.random() * 5.5,
        hue: 12 + Math.random() * 42,
      });
    }
    const t0 = performance.now();
    let prev = t0;
    function tick(now) {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of parts) {
        p.life -= dt;
        if (p.life <= 0) continue;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 480 * dt;
        p.vx *= 0.985;
        const a = Math.max(0, p.life / p.max);
        ctx.fillStyle = `hsla(${p.hue}, 96%, ${55 + a * 28}%, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.5 + a), 0, Math.PI * 2);
        ctx.fill();
      }
      if (now - t0 < ms) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function mount() {
    if (document.body.dataset.page !== "home") return;

    const hero = document.querySelector(".hero");
    if (!hero) return;
    preload();

    let egg = document.querySelector(".pegben-egg");
    if (!egg) {
      egg = document.createElement("button");
      egg.type = "button";
      egg.className = "pegben-egg";
      egg.setAttribute("aria-label", "Pegben — start spil");
      egg.innerHTML =
        '<img src="assets/pegben/egg-pirate.png" alt="" width="132" height="200"><span class="pegben-egg-tag">Pegben</span>';
      hero.appendChild(egg);
    }

    const overlay = document.createElement("div");
    overlay.className = "pegben-fs";
    overlay.hidden = true;
    overlay.innerHTML = `
      <button type="button" class="pegben-fs-close" aria-label="Luk spil">Luk</button>
      <iframe title="Pegben" allow="fullscreen; gamepad; autoplay"></iframe>
    `;
    document.body.appendChild(overlay);

    const frame = overlay.querySelector("iframe");
    const closeBtn = overlay.querySelector(".pegben-fs-close");
    let open = false;
    let busy = false;

    function closeGame() {
      open = false;
      overlay.hidden = true;
      overlay.classList.remove("is-on");
      document.body.classList.remove("pegben-lock");
      frame.src = "about:blank";
      egg.classList.remove("is-gone", "is-boom");
      const pirate = egg.querySelector("img");
      if (pirate) pirate.src = "assets/pegben/egg-pirate.png";
      const tag = egg.querySelector(".pegben-egg-tag");
      if (tag) tag.hidden = false;
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
        try {
          frame.contentWindow && frame.contentWindow.focus();
        } catch (_) {}
        frame.focus();
      }, 80);
    }

    function explodeThenOpen() {
      if (open || busy) return;
      busy = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rect = egg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.42;
      const pirate = egg.querySelector("img");
      const tag = egg.querySelector(".pegben-egg-tag");
      if (tag) tag.hidden = true;
      egg.classList.add("is-boom");
      hero.classList.add("pegben-shake");
      boomSound();

      if (reduced) {
        if (pirate) pirate.src = FRAMES[1];
        window.setTimeout(() => {
          egg.classList.add("is-gone");
          hero.classList.remove("pegben-shake");
          busy = false;
          openGame();
        }, 120);
        return;
      }

      const layer = document.createElement("div");
      layer.className = "pegben-fx";
      layer.innerHTML = `
        <div class="pegben-fx-flash" style="--x:${cx}px;--y:${cy}px"></div>
        <div class="pegben-fx-shock" style="left:${cx}px;top:${cy}px"></div>
        <img class="pegben-fx-blast" alt="" src="${FRAMES[0]}" style="left:${cx}px;top:${cy}px">
        <canvas class="pegben-fx-sparks"></canvas>
      `;
      document.body.appendChild(layer);
      const blast = layer.querySelector(".pegben-fx-blast");
      const canvas = layer.querySelector("canvas");
      runSparks(canvas, cx, cy, 900);

      let fi = 0;
      if (pirate) pirate.src = FRAMES[0];
      const timer = window.setInterval(() => {
        fi += 1;
        if (fi >= FRAMES.length) {
          window.clearInterval(timer);
          return;
        }
        blast.src = FRAMES[fi];
        if (pirate) pirate.src = FRAMES[fi];
      }, 95);

      window.setTimeout(() => {
        window.clearInterval(timer);
        layer.remove();
        egg.classList.add("is-gone");
        hero.classList.remove("pegben-shake");
        busy = false;
        openGame();
      }, 920);
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
