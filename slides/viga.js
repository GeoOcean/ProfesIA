/* «La viga, en directo»: dibuja la viga con los datos que exporta
 * ejemplos/viga_interactiva.ipynb en data/viga_datos.js (window.VIGA_DATOS).
 *
 * El notebook guarda, para P = 1 kN en cada posición «a» de la carga, la flecha
 * [mm] y el momento [kN·m] a lo largo de la viga. Como el problema es lineal,
 * aquí solo se multiplica por P: la física está en Python, no en este archivo.
 */
(() => {
  "use strict";

  const svg = document.getElementById("viga-svg");
  if (!svg) return;
  const D = window.VIGA_DATOS;
  const src = document.getElementById("viga-src");

  if (!D) {
    src.innerHTML =
      "No encuentro <code>data/viga_datos.js</code>. Ejecuta <code>ejemplos/viga_interactiva.ipynb</code> " +
      "y recarga la página.";
    src.classList.add("missing");
    return;
  }

  /* ---- Geometry of the drawing (SVG units) ---- */
  const NS = "http://www.w3.org/2000/svg";
  const X0 = 70, X1 = 730;         // beam ends
  const YB = 110;                  // undeformed beam
  const DY = 65;                   // drawn deflection when the steel just reaches fy
  const DCAP = 100;                // never draw more than this (the whole curve is scaled down)
  const YM = 290, HM = 45;         // moment diagram: baseline and height of M elástico
  const L = D.L, nA = D.a.length;
  const My = (D.fy * D.perfil.W) / 1e3; // moment that reaches fy [kN·m]
  const PMAX = 40;

  const sx = (x) => X0 + (x / L) * (X1 - X0);
  const xFromSvg = (px) => Math.min(L, Math.max(0, ((px - X0) / (X1 - X0)) * L));

  // Drawing scale: for each support type, the largest deflection the beam can
  // reach while still elastic is drawn DY units tall. So both cases look
  // equally bent at the elastic limit, and you can compare their real
  // stiffness through the «exagerada ×N» label.
  const absMax = (arr) => arr.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  const wYield = {};
  for (const [k, c] of Object.entries(D.casos)) {
    wYield[k] = Math.max(...c.flecha_mm.map((w, i) => {
      const m = absMax(c.momento_kNm[i]);
      return m > 1e-9 ? (absMax(w) * My) / m : 0;
    }));
  }

  const state = { apoyo: "voladizo", P: 10, ia: nA - 1 };

  /* ---- Static drawing ---- */
  const el = (tag, attrs = {}, parent = svg) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    parent.appendChild(e);
    return e;
  };

  const defs = el("defs");
  const marker = el("marker", { id: "viga-arrow", viewBox: "0 0 10 10", refX: "8", refY: "5",
    markerWidth: "5", markerHeight: "5", orient: "auto-start-reverse" }, defs);
  el("path", { d: "M0 0 L10 5 L0 10 z", class: "v-load-head" }, marker);

  const lblDef = el("text", { x: X0 - 10, y: 22, class: "v-lbl" });
  lblDef.textContent = "Deformada";
  const lblExag = el("text", { x: X1 + 10, y: 22, class: "v-lbl dim", "text-anchor": "end" });

  el("line", { x1: X0, y1: YB, x2: X1, y2: YB, class: "v-ref" });
  const supports = el("g");
  const beam = el("g", { class: "v-beam" });
  const segs = [];
  for (let i = 0; i < D.x.length - 1; i++) segs.push(el("line", {}, beam));

  const maxMark = el("g", { class: "v-max" });
  el("circle", { r: 9, class: "v-max-ring" }, maxMark);
  el("circle", { r: 3.5, class: "v-max-dot" }, maxMark);
  const maxTxt = el("text", { class: "v-max-txt", y: -16, "text-anchor": "middle" }, maxMark);
  maxTxt.textContent = "aquí se dobla más";

  // Moment diagram
  const lblM = el("text", { x: X0 - 10, y: YM - HM - 22, class: "v-lbl" });
  lblM.textContent = "Momento flector (dibujado del lado traccionado)";
  for (const s of [-1, 1]) {
    el("line", { x1: X0, x2: X1, y1: YM + s * HM, y2: YM + s * HM, class: "v-my" });
  }
  const myTxt = el("text", { x: X1 + 4, y: YM - HM + 4, class: "v-lbl dim small" });
  myTxt.textContent = "fy";
  const mFill = el("polygon", { class: "v-m-fill" });
  const mLine = el("polyline", { class: "v-m-line" });
  el("line", { x1: X0, y1: YM, x2: X1, y2: YM, class: "v-axis" });

  // Load (drawn last so it stays on top)
  const load = el("g", { class: "v-load" });
  const loadLine = el("line", { "marker-end": "url(#viga-arrow)" }, load);
  const loadTxt = el("text", { "text-anchor": "middle" }, load);
  const loadKnob = el("circle", { r: 9, class: "v-knob" }, load);

  /* ---- Controls ---- */
  const $ = (id) => document.getElementById(id);
  const inP = $("viga-P"), inA = $("viga-a");
  inA.max = String(L);
  inA.step = String(L / (nA - 1));
  inP.max = String(PMAX);

  inP.addEventListener("input", () => { state.P = +inP.value; render(); });
  inA.addEventListener("input", () => { state.ia = Math.round((+inA.value / L) * (nA - 1)); render(); });
  document.querySelectorAll("#viga-demo .seg button").forEach((b) =>
    b.addEventListener("click", () => {
      state.apoyo = b.dataset.apoyo;
      document.querySelectorAll("#viga-demo .seg button").forEach((o) => o.classList.toggle("on", o === b));
      b.blur();
      render();
    }));

  // Drag the load (or click anywhere near the beam to move it there).
  let dragging = false;
  const toSvgX = (evt) => {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
  const moveTo = (evt) => {
    state.ia = Math.round((xFromSvg(toSvgX(evt).x) / L) * (nA - 1));
    render();
  };
  svg.addEventListener("pointerdown", (evt) => {
    if (toSvgX(evt).y > YM - HM - 35) return; // only the beam zone
    dragging = true;
    svg.setPointerCapture(evt.pointerId);
    svg.classList.add("dragging");
    moveTo(evt);
  });
  svg.addEventListener("pointermove", (evt) => dragging && moveTo(evt));
  const stop = () => { dragging = false; svg.classList.remove("dragging"); };
  svg.addEventListener("pointerup", stop);
  svg.addEventListener("pointercancel", stop);

  src.innerHTML =
    `Datos: <code>data/viga_datos.js</code> &middot; <strong>${D.perfil.nombre}</strong>, L = ${fmt(L, 1)} m, ` +
    `fy = ${fmt(D.fy / 1e6, 0)} MPa &middot; generados el ${D.generado} por <code>${D.fuente}</code>`;

  /* ---- Drawing that changes ---- */
  function drawSupports(apoyo) {
    supports.innerHTML = "";
    if (apoyo === "voladizo") {
      el("rect", { x: X0 - 16, y: YB - 34, width: 16, height: 68, class: "v-wall" }, supports);
      for (let k = 0; k < 7; k++) {
        const y = YB - 34 + k * 11;
        el("line", { x1: X0 - 16, y1: y + 10, x2: X0 - 26, y2: y + 20, class: "v-hatch" }, supports);
      }
    } else {
      for (const [x, roller] of [[X0, false], [X1, true]]) {
        const y = YB + 6;
        el("path", { d: `M${x} ${y} l-13 22 h26 z`, class: "v-sup" }, supports);
        if (roller) {
          el("circle", { cx: x - 7, cy: y + 27, r: 3.5, class: "v-sup" }, supports);
          el("circle", { cx: x + 7, cy: y + 27, r: 3.5, class: "v-sup" }, supports);
        }
        el("line", { x1: x - 18, x2: x + 18, y1: y + (roller ? 32 : 24), y2: y + (roller ? 32 : 24),
          class: "v-ground" }, supports);
      }
    }
  }

  let lastApoyo = null;

  function render() {
    const { apoyo, P, ia } = state;
    if (apoyo !== lastApoyo) { drawSupports(apoyo); lastApoyo = apoyo; }

    const a = D.a[ia];
    const caso = D.casos[apoyo];
    const w = caso.flecha_mm[ia].map((v) => v * P);  // mm
    const M = caso.momento_kNm[ia].map((v) => v * P); // kN·m

    const wNow = absMax(w);
    const pxPerMm = Math.min(DY / wYield[apoyo], wNow > 0 ? DCAP / wNow : Infinity);
    const exag = pxPerMm / ((X1 - X0) / (L * 1000));
    lblExag.textContent = `deformada exagerada ×${fmt(exag, 0)}`;
    const yDef = (i) => YB + w[i] * pxPerMm;

    // Beam, coloured by how close each piece is to the elastic limit.
    for (let i = 0; i < segs.length; i++) {
      const r = Math.min(1, (Math.abs(M[i]) + Math.abs(M[i + 1])) / 2 / My);
      segs[i].setAttribute("x1", sx(D.x[i]));
      segs[i].setAttribute("y1", yDef(i));
      segs[i].setAttribute("x2", sx(D.x[i + 1]));
      segs[i].setAttribute("y2", yDef(i + 1));
      segs[i].style.stroke = `color-mix(in srgb, var(--red) ${Math.round(r * 100)}%, var(--green))`;
    }

    // Moment diagram: y = YM + M·scale puts sagging below and hogging above.
    const sM = HM / My;
    const clampY = (v) => Math.max(YM - 1.45 * HM, Math.min(YM + 1.45 * HM, v));
    const pts = D.x.map((x, i) => `${sx(x).toFixed(1)},${clampY(YM + M[i] * sM).toFixed(1)}`);
    mLine.setAttribute("points", pts.join(" "));
    mFill.setAttribute("points", `${X0},${YM} ${pts.join(" ")} ${X1},${YM}`);

    // Where it bends most.
    let im = 0;
    M.forEach((v, i) => { if (Math.abs(v) > Math.abs(M[im])) im = i; });
    const Mmax = Math.abs(M[im]);
    maxMark.style.display = Mmax > 1e-6 ? "" : "none";
    maxMark.setAttribute("transform", `translate(${sx(D.x[im])},${yDef(im)})`);
    const edge = im < 6 ? "start" : im > D.x.length - 7 ? "end" : "middle";
    maxTxt.setAttribute("text-anchor", edge);
    maxTxt.setAttribute("x", edge === "start" ? 6 : edge === "end" ? -6 : 0);
    maxTxt.setAttribute("y", M[im] < 0 ? -16 : 26);

    // Load arrow, with its length growing with P.
    const xa = sx(a);
    const ia_x = Math.round((a / L) * (D.x.length - 1));
    const tip = yDef(ia_x) - 7;
    const len = 16 + (P / PMAX) * 62;
    loadLine.setAttribute("x1", xa);
    loadLine.setAttribute("x2", xa);
    loadLine.setAttribute("y1", tip - len);
    loadLine.setAttribute("y2", tip);
    loadLine.style.display = P > 0 ? "" : "none";
    loadKnob.setAttribute("cx", xa);
    loadKnob.setAttribute("cy", tip - len);
    // Label above the knob, or beside it near the ends so it stays inside.
    const side = a < 0.15 * L ? 1 : a > 0.85 * L ? -1 : 0;
    loadTxt.setAttribute("x", xa + side * 16);
    loadTxt.setAttribute("y", side ? tip - len + 5 : tip - len - 15);
    loadTxt.setAttribute("text-anchor", side > 0 ? "start" : side < 0 ? "end" : "middle");
    loadTxt.textContent = `P = ${fmt(P, 0)} kN`;

    // Readouts.
    const wMax = wNow;
    const sigma = (Mmax * 1e3) / D.perfil.W / 1e6; // MPa
    const ratio = sigma / (D.fy / 1e6);
    $("viga-P-out").textContent = `${fmt(P, 0)} kN`;
    $("viga-a-out").textContent = `${fmt(a, 1)} m`;
    inP.value = String(P);
    inA.value = String(a);
    $("viga-w").textContent = `${fmt(wMax, 1)} mm`;
    $("viga-M").textContent = `${fmt(Mmax, 1)} kN·m`;
    $("viga-s").textContent = `${fmt(sigma, 0)} MPa · ${fmt(ratio * 100, 0)} %`;
    $("viga-fy").textContent = `fy = ${fmt(D.fy / 1e6, 0)} MPa`;
    const bar = $("viga-s-bar");
    bar.style.width = `${Math.min(100, (ratio / 1.5) * 100)}%`;

    const stateEl = $("viga-state");
    const level = ratio >= 1 ? "bad" : ratio >= 0.8 ? "warn" : "ok";
    stateEl.className = `viga-state ${level}`;
    bar.className = level;
    svg.classList.toggle("yield", ratio >= 1);
    stateEl.textContent =
      level === "bad" ? "¡Plastifica! El acero pasa del límite elástico: hace falta un perfil mayor."
      : level === "warn" ? "Cerca del límite elástico."
      : Mmax < 1e-6 ? "Sin momento: la carga está sobre un apoyo."
      : "Trabaja en régimen elástico, con margen.";
  }

  function fmt(v, d) {
    return v.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  render();
})();
