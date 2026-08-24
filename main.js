(function () {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const clockEl = document.getElementById("madrid-clock");
  const offsetEl = document.getElementById("madrid-offset");

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Madrid",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now);

    if (offsetEl) {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Madrid",
        timeZoneName: "shortOffset",
      }).formatToParts(now);
      const tz = parts.find((part) => part.type === "timeZoneName");
      offsetEl.textContent = tz ? tz.value.replace("GMT", "UTC") : "UTC+1";
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  window.addEventListener("scroll", function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  });

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }
})();
