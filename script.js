const navToggle = document.querySelector(".navbar-toggle");
const navMenu = document.querySelector("#nav-menu");
const typingTarget = document.querySelector(".hero-typing-skill");
const yearEl = document.querySelector("#year");
const siteHeader = document.querySelector(".navbar");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const animateItems = document.querySelectorAll("[data-animate]");
const projectAnimateItems = document.querySelectorAll(".card-project[data-animate]");
const skillAnimateItems = document.querySelectorAll(".card-skill[data-animate]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (siteHeader) {
  const updateHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 14);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

projectAnimateItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 100}ms`;
});

skillAnimateItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 50}ms`;
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animateItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  animateItems.forEach((item) => observer.observe(item));
} else {
  animateItems.forEach((item) => item.classList.add("is-visible"));
}

if (typingTarget) {
  const skills = ["C#", "MSSQL"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let delay = 100;

  const type = () => {
    const current = skills[wordIndex];

    if (!deleting) {
      charIndex += 1;
      typingTarget.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        delay = 1200;
      } else {
        delay = 110;
      }
    } else {
      charIndex -= 1;
      typingTarget.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % skills.length;
        delay = 220;
      } else {
        delay = 70;
      }
    }

    window.setTimeout(type, delay);
  };

  type();
}
