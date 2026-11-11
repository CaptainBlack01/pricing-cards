(function () {
  "use strict";

  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const amounts = document.querySelectorAll(".amount");
  const billedLabels = document.querySelectorAll(".billed[data-monthly-text]");

  let period = "monthly";

  function applyPeriod(next) {
    period = next;

    toggleButtons.forEach((btn) => {
      const active = btn.dataset.period === period;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    amounts.forEach((el) => {
      const value = el.dataset[period];
      if (value !== undefined) {
        el.textContent = value;
        animate(el);
      }
    });

    billedLabels.forEach((el) => {
      const text = period === "yearly" ? el.dataset.yearlyText : el.dataset.monthlyText;
      if (text) el.textContent = text;
    });
  }

  function animate(el) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [
        { opacity: 0.2, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 260, easing: "ease-out" }
    );
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.period === period) return;
      applyPeriod(btn.dataset.period);
    });
  });

  applyPeriod("monthly");
})();
