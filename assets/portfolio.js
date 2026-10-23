
(() => {
  "use strict";

  const page = document.body;

  // ========================================
  // 01. Light / Dark Theme
  // ========================================

  const themeButton = document.querySelector(
    ".theme-toggle"
  );

  function applyTheme(theme) {
    page.dataset.theme = theme;

    const dark = theme === "dark";

    const label = dark
      ? "밝은 테마로 전환"
      : "어두운 테마로 전환";

    if (!themeButton) return;

    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;

    const icon = themeButton.querySelector("i");

    if (icon) {
      icon.className = dark
        ? "fas fa-sun"
        : "fas fa-moon";
    }
  }

  let savedTheme = "light";

  try {
    savedTheme =
      localStorage.getItem("portfolio-theme") || "light";
  } catch (_) {}

  applyTheme(
    savedTheme === "dark" ? "dark" : "light"
  );

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const theme =
        page.dataset.theme === "dark"
          ? "light"
          : "dark";

      applyTheme(theme);

      try {
        localStorage.setItem("portfolio-theme", theme);
      } catch (_) {}
    });
  }


  // ========================================
  // 02. Project Filters
  // 전체 / 팀 / 개인
  // ========================================

  const filters = document.querySelectorAll(
    "[data-filter]"
  );

  const cards = document.querySelectorAll(
    ".project-card"
  );

  const projectCount = document.getElementById(
    "project-count"
  );

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      let count = 0;

      filters.forEach((item) => {
        item.setAttribute(
          "aria-pressed",
          String(item === button)
        );
      });

      cards.forEach((card) => {
        const visible =
          filter === "all" ||
          card.dataset.category === filter;

        card.hidden = !visible;

        if (visible) {
          count++;
        }
      });

      if (projectCount) {
        projectCount.textContent =
          `${count}개 프로젝트`;
      }
    });
  });


  // ========================================
  // 03. About Dialog
  // ========================================

  let trigger = null;

  document
    .querySelectorAll("[data-dialog]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const dialog = document.getElementById(
          button.dataset.dialog
        );

        if (!dialog) return;

        trigger = button;

        if (typeof dialog.showModal === "function") {
          dialog.showModal();
          page.style.overflow = "hidden";
        }
      });
    });


  // ========================================
  // 04. Dialog Close
  // ========================================

  document.querySelectorAll("dialog").forEach(
    (dialog) => {
      const closeButton = dialog.querySelector(
        "[data-close]"
      );

      if (closeButton) {
        closeButton.addEventListener("click", () => {
          dialog.close();
        });
      }

      dialog.addEventListener("click", (event) => {
        const box = dialog.getBoundingClientRect();

        const outside =
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom;

        if (event.target === dialog && outside) {
          dialog.close();
        }
      });

      dialog.addEventListener("close", () => {
        page.style.overflow = "";

        if (trigger) {
          trigger.focus();
          trigger = null;
        }
      });
    });
})();
