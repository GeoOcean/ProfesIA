(() => {
  "use strict";

  /* ---------------------------------------------------------------------
   * Slide engine
   * ------------------------------------------------------------------- */
  const slides = Array.from(document.querySelectorAll(".slide"));
  let current = 0;

  const counterEl = document.querySelector("#slide-counter");
  const progressEl = document.querySelector("#progress-fill");

  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((s) => s.classList.toggle("active", s === slides[current]));
    if (counterEl) counterEl.textContent = `${current + 1} / ${slides.length}`;
    if (progressEl) progressEl.style.width = `${((current + 1) / slides.length) * 100}%`;
    history.replaceState(null, "", `#${current + 1}`);
  }

  const next = () => show(current + 1);
  const prev = () => show(current - 1);

  document.querySelector("#next-btn")?.addEventListener("click", next);
  document.querySelector("#prev-btn")?.addEventListener("click", prev);

  window.addEventListener("keydown", (e) => {
    if (codeModalOpen()) {
      if (e.key === "Escape") closeCodeModal();
      return;
    }
    if (lightboxOpen()) {
      if (e.key === "Escape") closeLightbox();
      return;
    }
    // Let checkboxes and buttons keep Space for themselves.
    if (e.target.closest?.("input, button, a") && e.key === " ") return;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      next();
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      show(0);
    } else if (e.key === "End") {
      show(slides.length - 1);
    } else if (e.key === "f" || e.key === "F") {
      toggleFullscreen();
    }
  });

  let touchStartX = null;
  document.addEventListener("touchstart", (e) => (touchStartX = e.touches[0].clientX));
  document.addEventListener("touchend", (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX = null;
  });

  // Skip the fade-in on first paint -- only animate slide-to-slide moves.
  document.body.classList.add("preload");
  show((parseInt(location.hash.replace("#", ""), 10) || 1) - 1);
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("preload")));

  /* ---------------------------------------------------------------------
   * Lightbox -- any element with data-zoom (its src, or the data-zoom URL)
   * ------------------------------------------------------------------- */
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = lightbox?.querySelector("img");

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
  }
  function closeLightbox() {
    lightbox?.classList.remove("open");
  }
  function lightboxOpen() {
    return !!lightbox?.classList.contains("open");
  }

  document.querySelectorAll("[data-zoom]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(el.getAttribute("data-zoom") || el.src, el.alt);
    });
  });
  lightbox?.addEventListener("click", closeLightbox);

  /* ---------------------------------------------------------------------
   * Code modal -- elements with data-code="<template id>" show that
   * <template>'s snippet in a popup.
   * ------------------------------------------------------------------- */
  const codeModal = document.querySelector("#code-modal");
  const codeModalCode = document.querySelector("#code-modal-code");
  const codeModalTitle = document.querySelector("#code-modal-title");

  function openCodeModal(templateId, title) {
    const tpl = document.getElementById(templateId);
    if (!codeModal || !codeModalCode || !tpl) return;
    // Snippets live in <template><pre>: the <pre> keeps HTML formatters from
    // re-indenting the code.
    const pre = tpl.content.querySelector("pre");
    codeModalCode.innerHTML = pre ? pre.innerHTML : tpl.innerHTML;
    codeModalCode.scrollTop = 0;
    if (codeModalTitle) codeModalTitle.textContent = title || "";
    codeModal.classList.add("open");
  }
  function closeCodeModal() {
    codeModal?.classList.remove("open");
  }
  function codeModalOpen() {
    return !!codeModal?.classList.contains("open");
  }

  document.querySelectorAll("[data-code]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openCodeModal(el.getAttribute("data-code"), el.getAttribute("data-title"));
    });
  });
  document.querySelector("#code-modal-close")?.addEventListener("click", closeCodeModal);
  codeModal?.addEventListener("click", (e) => {
    if (e.target === codeModal) closeCodeModal();
  });

  /* ---------------------------------------------------------------------
   * Copy buttons on command boxes (.cmd > pre); comment lines are skipped
   * ------------------------------------------------------------------- */
  document.querySelectorAll(".cmd").forEach((box) => {
    const pre = box.querySelector("pre");
    if (!pre) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copiar";
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const text = pre.innerText
        .split("\n")
        .filter((l) => !l.trim().startsWith("#"))
        .join("\n")
        .trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copiado ✓";
        btn.classList.add("done");
      } catch (_) {
        btn.textContent = "Selecciona y copia";
      }
      btn.blur(); // keep Space / arrows driving the deck
      setTimeout(() => {
        btn.textContent = "Copiar";
        btn.classList.remove("done");
      }, 1600);
    });
    box.appendChild(btn);
  });

  /* ---------------------------------------------------------------------
   * Setup checklist (per-viewer convenience only)
   * ------------------------------------------------------------------- */
  const checks = Array.from(document.querySelectorAll(".checklist input[type=checkbox]"));
  let saved = [];
  try {
    saved = JSON.parse(readStored("profesia-checklist") || "[]");
  } catch (_) {
    /* corrupted value: start unchecked */
  }
  checks.forEach((box, i) => {
    box.checked = !!saved[i];
    box.addEventListener("change", () => {
      writeStored("profesia-checklist", JSON.stringify(checks.map((b) => b.checked)));
      box.blur();
    });
  });

  /* ---------------------------------------------------------------------
   * Theme toggle (per-viewer convenience only)
   * ------------------------------------------------------------------- */
  const themeBtn = document.querySelector("#theme-btn");
  function updateThemeLabel() {
    if (!themeBtn) return;
    const cur = document.documentElement.getAttribute("data-theme");
    themeBtn.textContent = cur === "dark" ? "☀ Claro" : cur === "light" ? "◑ Auto" : "☽ Oscuro";
  }
  themeBtn?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const nextTheme = cur === "dark" ? "light" : cur === "light" ? null : "dark";
    if (nextTheme) document.documentElement.setAttribute("data-theme", nextTheme);
    else document.documentElement.removeAttribute("data-theme");
    writeStored("deck-theme", nextTheme);
    themeBtn.blur();
    updateThemeLabel();
  });
  const storedTheme = readStored("deck-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }
  updateThemeLabel();

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  /* ---------------------------------------------------------------------
   * Helpers
   * ------------------------------------------------------------------- */
  function readStored(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null; // private mode / blocked storage
    }
  }

  function writeStored(key, value) {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (_) {
      /* ignore */
    }
  }
})();
