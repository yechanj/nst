/* =========================================================
   NST 영양지원 학습 — 공통 인터랙션 (바닐라 JS)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. 모바일 사이드바 드로어 ---------- */
  function initSidebar() {
    var sidebar = document.querySelector(".sidebar");
    var burger  = document.querySelector(".hamburger");
    var scrim   = document.querySelector(".scrim");
    if (!sidebar || !burger) return;

    function open() {
      sidebar.classList.add("open");
      if (scrim) scrim.classList.add("show");
      burger.setAttribute("aria-expanded", "true");
    }
    function close() {
      sidebar.classList.remove("open");
      if (scrim) scrim.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
    }
    burger.addEventListener("click", function () {
      sidebar.classList.contains("open") ? close() : open();
    });
    if (scrim) scrim.addEventListener("click", close);
    document.querySelectorAll("[data-open-toc]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        sidebar.classList.contains("open") ? close() : open();
      });
    });
    sidebar.querySelectorAll(".toc a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 860px)").matches) close();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- 2. 스크롤스파이 ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".toc a[href^='#']")
    );
    if (!links.length) return;
    var map = {};
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) { map[id] = a; sections.push(el); }
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var active = map[en.target.id];
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ---------- 3. Reveal 버튼 (생각 후 펼치기) ---------- */
  function initReveal() {
    document.querySelectorAll(".reveal-btn").forEach(function (btn) {
      var targetId = btn.getAttribute("data-target");
      var panel = document.getElementById(targetId);
      if (!panel) return;

      btn.addEventListener("click", function () {
        var hidden = panel.hasAttribute("hidden");
        if (hidden) {
          panel.removeAttribute("hidden");
          btn.innerHTML = btn.innerHTML.replace("▾", "▴").replace("펼치기", "접기");
        } else {
          panel.setAttribute("hidden", "");
          btn.innerHTML = btn.innerHTML.replace("▴", "▾").replace("접기", "펼치기");
        }
      });
    });
  }

  /* ---------- 4. Accordion ---------- */
  function initAccordion() {
    document.querySelectorAll(".accordion__btn").forEach(function (btn) {
      var body = btn.nextElementSibling;
      if (!body || !body.classList.contains("accordion__body")) return;
      btn.setAttribute("aria-expanded", "false");

      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        if (isOpen) {
          body.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", "false");
        } else {
          body.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- 5. Checklist (localStorage) ---------- */
  function initChecklist() {
    document.querySelectorAll(".checklist[data-key]").forEach(function (cl) {
      var storageKey = cl.getAttribute("data-key");
      var checkboxes = Array.prototype.slice.call(cl.querySelectorAll("input[type='checkbox']"));
      var items      = Array.prototype.slice.call(cl.querySelectorAll(".check-item"));
      var prog       = cl.querySelector(".checklist__progress-fill");

      // 저장된 상태 복원
      var saved = {};
      try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch(e) {}
      checkboxes.forEach(function (cb) {
        var id = cb.getAttribute("data-id") || cb.value;
        if (saved[id]) {
          cb.checked = true;
          var li = cb.closest(".check-item");
          if (li) li.classList.add("checked");
        }
      });
      updateProgress();

      checkboxes.forEach(function (cb) {
        cb.addEventListener("change", function () {
          var id = cb.getAttribute("data-id") || cb.value;
          saved[id] = cb.checked;
          try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch(e) {}
          var li = cb.closest(".check-item");
          if (li) li.classList.toggle("checked", cb.checked);
          updateProgress();
        });
      });

      function updateProgress() {
        var total = checkboxes.length;
        var done  = checkboxes.filter(function (c) { return c.checked; }).length;
        if (prog) prog.style.width = (total ? Math.round(done / total * 100) : 0) + "%";
        var counter = cl.querySelector(".checklist__progress-count");
        if (counter) counter.textContent = done + " / " + total;
      }
    });
  }

  /* ---------- 6. Why NST 버튼 (4-button accordion) ---------- */
  function initWhyNST() {
    var btns = document.querySelectorAll("[data-why]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-why");
        var panel = document.getElementById(targetId);
        if (!panel) return;
        // 다른 패널 닫기
        document.querySelectorAll(".why-panel").forEach(function (p) {
          if (p !== panel) p.setAttribute("hidden", "");
        });
        document.querySelectorAll("[data-why]").forEach(function (b) {
          if (b !== btn) b.classList.remove("active");
        });
        var hidden = panel.hasAttribute("hidden");
        if (hidden) {
          panel.removeAttribute("hidden");
          btn.classList.add("active");
        } else {
          panel.setAttribute("hidden", "");
          btn.classList.remove("active");
        }
      });
    });
  }

  /* ---------- 7. Workflow step 클릭 ---------- */
  function initWorkflow() {
    document.querySelectorAll(".flow-step[data-detail]").forEach(function (step) {
      var detailId = step.getAttribute("data-detail");
      var detail   = document.getElementById(detailId);
      if (!detail) return;
      step.style.cursor = "pointer";

      step.addEventListener("click", function () {
        var hidden = detail.hasAttribute("hidden");
        // 다른 detail 닫기
        document.querySelectorAll(".flow-detail").forEach(function (d) {
          if (d !== detail) d.setAttribute("hidden", "");
        });
        document.querySelectorAll(".flow-step[data-detail]").forEach(function (s) {
          if (s !== step) s.classList.remove("flow-step--active");
        });

        if (hidden) {
          detail.removeAttribute("hidden");
          step.classList.add("flow-step--active");
        } else {
          detail.setAttribute("hidden", "");
          step.classList.remove("flow-step--active");
        }
      });
    });
  }

  /* ---------- 8. Problem List 단계별 reveal ---------- */
  function initProblemReveal() {
    var btn  = document.getElementById("reveal-problems-btn");
    var list = document.getElementById("problem-list-reveal");
    if (!btn || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll(".problem-item"));
    var idx   = 0;
    items.forEach(function (item) { item.setAttribute("hidden", ""); });

    btn.addEventListener("click", function () {
      if (idx < items.length) {
        items[idx].removeAttribute("hidden");
        idx++;
        if (idx >= items.length) {
          btn.textContent = "모두 표시됨 ✓";
          btn.disabled = true;
        } else {
          btn.textContent = "다음 문제 보기 ▾ (" + idx + "/" + items.length + ")";
        }
      }
    });
  }

  /* ---------- 9. Mini Case 단계별 reveal ---------- */
  function initMiniCase() {
    document.querySelectorAll(".case-step").forEach(function (step) {
      var btn   = step.querySelector(".reveal-btn");
      var panel = step.querySelector(".reveal-panel");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var hidden = panel.hasAttribute("hidden");
        if (hidden) {
          panel.removeAttribute("hidden");
          btn.textContent = "접기 ▴";
        } else {
          panel.setAttribute("hidden", "");
          btn.textContent = "생각한 뒤 펼치기 ▾";
        }
      });
    });
  }

  /* ---------- 초기화 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initSidebar();
    initScrollSpy();
    initReveal();
    initAccordion();
    initChecklist();
    initWhyNST();
    initWorkflow();
    initProblemReveal();
    initMiniCase();
  });
})();
