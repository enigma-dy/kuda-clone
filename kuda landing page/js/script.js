"use strict";

const yearEL = document.getElementById("year");
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const btn = document.querySelector(".btn");
const cta = document.querySelector(".cta-section");
const mainNavLinks = document.querySelector(".main-nav-list");
const heroSection = document.querySelector(".hero-section");
const allSections = document.querySelectorAll(".section");

const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

// Navigation Menu
const btnNavMenu = function (e) {
  e.preventDefault();
  header.classList.toggle("nav-open");
};

btnMobileNav.addEventListener("click", btnNavMenu);

btn.addEventListener("click", function (e) {
  e.target.getBoundingClientRect();

  cta.scrollIntoView({
    behavior: "smooth",
  });
  header.classList.remove("nav-open");
});

mainNavLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-bar-link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    header.classList.remove("nav-open");
  }
});

const headerHeight = header.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) document.body.classList.add("sticky");
  else document.body.classList.remove("sticky");
};
const stickyObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
  rootMargin: `${headerHeight}px`,
});

stickyObserver.observe(heroSection);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
