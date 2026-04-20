"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT_PER_TICK = 2;
const STAR_COLORS = ["#ffffff", "#fff9d9", "#f3f7ff"];

export default function CursorSparkles() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let lastX = 0;
    let lastY = 0;
    let lastSpawnAt = 0;

    const spawnStar = (x, y) => {
      const star = document.createElement("span");
      const size = 3 + Math.random() * 6;
      const driftX = (Math.random() - 0.5) * 28;
      const driftY = (Math.random() - 0.5) * 22 - 10;
      const duration = 520 + Math.random() * 650;

      star.className = "cursor-sparkle";
      star.style.left = `${x + driftX}px`;
      star.style.top = `${y + driftY}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty("--sparkle-duration", `${duration}ms`);
      star.style.background = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

      layer.appendChild(star);
      star.addEventListener("animationend", () => {
        star.remove();
      });
    };

    const onPointerMove = (event) => {
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const movedEnough = dx * dx + dy * dy > 48;

      if (!movedEnough && now - lastSpawnAt < 22) return;

      lastX = event.clientX;
      lastY = event.clientY;
      lastSpawnAt = now;

      for (let i = 0; i < STAR_COUNT_PER_TICK; i += 1) {
        spawnStar(event.clientX, event.clientY);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <div ref={layerRef} className="cursor-sparkle-layer" aria-hidden="true" />;
}
