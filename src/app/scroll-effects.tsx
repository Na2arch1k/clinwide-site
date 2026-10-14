"use client";

import { useEffect } from "react";
import s from "./product.module.css";

export function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanups: Array<() => void> = [];
    const site = document.querySelector<HTMLElement>(`.${s.site}`);

    // --- Directional scroll reveal ("gliding" between sections) ---
    const revealItems = document.querySelectorAll(`.${s.reveal}`);
    if (reduceMotion) {
      revealItems.forEach((el) => el.classList.add(s.revealVisible));
    } else if (revealItems.length) {
      site?.setAttribute("data-motion-ready", "");
      cleanups.push(() => site?.removeAttribute("data-motion-ready"));
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
      cleanups.push(() => observer.disconnect());
    }

    // --- Wayfinding rail: track the section currently in view ---
    const railLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-rail]"),
    );
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

    // --- Scroll progress for restrained, component-level parallax ---
    const header = document.querySelector(`[data-header]`);
    const progressRoot = document.querySelector<HTMLElement>("[data-progress]");
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("main > section"),
    );
    scenes.forEach((scene, index) => {
      scene.dataset.cinematic = "";
      scene.style.setProperty("--scene-index", String(index));
    });

    let frame = 0;
    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;

      if (header) header.classList.toggle(s.headerScrolled, scrollY > 8);
      if (progressRoot) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const ratio = max > 0 ? Math.min(1, scrollY / max) : 0;
        progressRoot.style.setProperty("--progress", ratio.toFixed(4));
        site?.style.setProperty("--page-progress", ratio.toFixed(4));
      }

      if (!reduceMotion) {
        const viewportHeight = window.innerHeight;

        scenes.forEach((scene) => {
          const rect = scene.getBoundingClientRect();
          const progress = clamp(
            (viewportHeight - rect.top) / (viewportHeight + rect.height),
          );
          const distance = clamp(
            (rect.top + rect.height / 2 - viewportHeight / 2) /
              viewportHeight,
            -1.25,
            1.25,
          );
          const visibility = clamp(1 - Math.abs(distance) * 0.72);
          scene.style.setProperty("--scene-progress", progress.toFixed(4));
          scene.style.setProperty("--scene-distance", distance.toFixed(4));
          scene.style.setProperty("--scene-visibility", visibility.toFixed(4));
          scene.toggleAttribute(
            "data-cinematic-active",
            rect.bottom > 0 && rect.top < viewportHeight,
          );
        });
      }
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
