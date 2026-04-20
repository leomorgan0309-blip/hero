"use client";

import { useEffect } from "react";

export default function InteractiveEffects() {
  useEffect(() => {
    const loader = document.getElementById("loader");
    const cursor = document.getElementById("cursor");
    const nav = document.querySelector(".nav");
    const navLinksPanel = document.querySelector(".nav-links");
    const mobileToggle = document.getElementById("mobileToggle");
    const heroImage = document.querySelector(".hero-image-container");
    const magneticItems = document.querySelectorAll(".btn-magnetic");
    const hoverTargets = document.querySelectorAll("a, button, .btn, .nav-link");
    const navLinks = document.querySelectorAll(".nav-links .nav-link");
    const clickableButtons = document.querySelectorAll("button, .btn");

    const hideLoader = window.setTimeout(() => {
      if (loader) loader.classList.add("hidden");
    }, 1800);

    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (event) => {
      cursorX = event.clientX - 6;
      cursorY = event.clientY - 6;

      if (heroImage) {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const animateCursor = () => {
      currentX += (cursorX - currentX) * 0.15;
      currentY += (cursorY - currentY) * 0.15;
      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }
      window.requestAnimationFrame(animateCursor);
    };

    const onHoverIn = () => cursor?.classList.add("active");
    const onHoverOut = () => cursor?.classList.remove("active");

    const magneticHandlers = [];
    magneticItems.forEach((item) => {
      const move = (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      };
      const leave = () => {
        item.style.transform = "translate(0, 0)";
      };
      item.addEventListener("mousemove", move);
      item.addEventListener("mouseleave", leave);
      magneticHandlers.push({ item, move, leave });
    });

    document.addEventListener("mousemove", onMouseMove);
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    const onToggleMobileMenu = () => {
      if (!nav || !mobileToggle || !navLinksPanel) return;
      const isOpen = nav.classList.toggle("mobile-open");
      navLinksPanel.classList.toggle("mobile-open", isOpen);
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("mobile-menu-open", isOpen);
    };

    const onCloseMobileMenu = () => {
      if (!nav || !mobileToggle || !navLinksPanel) return;
      nav.classList.remove("mobile-open");
      navLinksPanel.classList.remove("mobile-open");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("mobile-menu-open");
    };

    const onResize = () => {
      if (window.innerWidth > 768) {
        onCloseMobileMenu();
      }
    };

    mobileToggle?.addEventListener("click", onToggleMobileMenu);
    navLinks.forEach((link) => {
      link.addEventListener("click", onCloseMobileMenu);
    });

    const clickHandlers = [];
    clickableButtons.forEach((button) => {
      if (button instanceof HTMLElement) {
        if (button.style.position === "") {
          button.style.position = "relative";
        }
        button.style.overflow = "hidden";
      }

      const onClick = (event) => {
        if (!(button instanceof HTMLElement)) return;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        const offsetX = event.clientX - rect.left - size / 2;
        const offsetY = event.clientY - rect.top - size / 2;

        ripple.className = "click-ripple";
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${offsetX}px`;
        ripple.style.top = `${offsetY}px`;

        button.classList.remove("click-pop");
        void button.offsetWidth;
        button.classList.add("click-pop");

        button.appendChild(ripple);
        ripple.addEventListener("animationend", () => {
          ripple.remove();
        });
      };

      const onPopEnd = () => {
        if (button instanceof HTMLElement) {
          button.classList.remove("click-pop");
        }
      };

      button.addEventListener("click", onClick);
      button.addEventListener("animationend", onPopEnd);
      clickHandlers.push({ button, onClick, onPopEnd });
    });

    window.addEventListener("resize", onResize);
    animateCursor();

    return () => {
      window.clearTimeout(hideLoader);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mobileToggle?.removeEventListener("click", onToggleMobileMenu);
      navLinks.forEach((link) => {
        link.removeEventListener("click", onCloseMobileMenu);
      });
      clickHandlers.forEach(({ button, onClick, onPopEnd }) => {
        button.removeEventListener("click", onClick);
        button.removeEventListener("animationend", onPopEnd);
      });
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
      magneticHandlers.forEach(({ item, move, leave }) => {
        item.removeEventListener("mousemove", move);
        item.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
