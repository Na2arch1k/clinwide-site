"use client";

import { useEffect } from "react";
import s from "./product.module.css";

export function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // --- Directional scroll reveal ("gliding" between sections) ---
    const revealItems = document.querySelectorAll(`.${s.reveal}`);
    if (reduceMotion) {
      revealItems.forEach((el) => el.classList.add(s.revealVisible));
    } else if (revealItems.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(s.revealVisible);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      );
      revealItems.forEach((el) => observer.observe(el));
    }

    // --- Wayfinding rail: track the section currently in view ---
    const railLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-rail]"),
    );
    const cleanups: Array<() => void> = [];
    if (railLinks.length) {
      const byId = new Map<string, HTMLAnchorElement>();
      const targets: HTMLElement[] = [];
      railLinks.forEach((link) => {
        const id = link.getAttribute("data-rail");
        if (!id) return;
        const section = document.getElementById(id);
        if (!section) return;
        byId.set(id, link);
        targets.push(section);
      });
      let activeId = "";
      const setActive = (id: string) => {
        if (id === activeId) return;
        activeId = id;
        byId.forEach((link, key) => {
          link.classList.toggle(s.railActive, key === id);
          if (key === id) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      };
      const railObserver = new IntersectionObserver(
        (entries) => {
          // Pick the entry nearest the viewport centre among those intersecting.
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) setActive(visible[0].target.id);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 1] },
      );
      targets.forEach((t) => railObserver.observe(t));
      cleanups.push(() => railObserver.disconnect());
    }

    // --- Header shadow + scroll-progress variable (rAF throttled) ---
    const header = document.querySelector(`[data-header]`);
    const progressRoot = document.querySelector<HTMLElement>("[data-progress]");
    let ticking = false;
    const update = () => {
      ticking = false;
      if (header) header.classList.toggle(s.headerScrolled, window.scrollY > 8);
      if (progressRoot) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        progressRoot.style.setProperty("--progress", ratio.toFixed(4));
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
