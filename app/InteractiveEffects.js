"use client";

import { useEffect } from "react";

export default function InteractiveEffects() {
  useEffect(() => {
    const loader = document.getElementById("loader");
    const nav = document.querySelector(".nav");
    const navLinksPanel = document.querySelector(".nav-links");
    const mobileToggle = document.getElementById("mobileToggle");
    const sectionThree = document.querySelector(".s3-frame");
    const sectionThreeRevealEls = document.querySelectorAll(".s3-reveal");
    const magneticItems = document.querySelectorAll(".btn-magnetic");
    const navLinks = document.querySelectorAll(".nav-links .nav-link");
    const clickableButtons = document.querySelectorAll("button, .btn");

    const hideLoader = window.setTimeout(() => {
      if (loader) loader.classList.add("hidden");
    }, 1800);

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

    let sectionThreeObserver = null;
    if (sectionThree && sectionThreeRevealEls.length > 0) {
      sectionThreeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              sectionThreeRevealEls.forEach((el) => el.classList.add("is-visible"));
            } else {
              sectionThreeRevealEls.forEach((el) => el.classList.remove("is-visible"));
            }
          });
        },
        { threshold: 0.22, rootMargin: "-8% 0px -8% 0px" }
      );
      sectionThreeObserver.observe(sectionThree);
    }

    return () => {
      window.clearTimeout(hideLoader);
      window.removeEventListener("resize", onResize);
      sectionThreeObserver?.disconnect();
      mobileToggle?.removeEventListener("click", onToggleMobileMenu);
      navLinks.forEach((link) => {
        link.removeEventListener("click", onCloseMobileMenu);
      });
      clickHandlers.forEach(({ button, onClick, onPopEnd }) => {
        button.removeEventListener("click", onClick);
        button.removeEventListener("animationend", onPopEnd);
      });
      magneticHandlers.forEach(({ item, move, leave }) => {
        item.removeEventListener("mousemove", move);
        item.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
