"use client";

import { useEffect, useRef } from "react";

/**
 * Muted background loop for the home hero. Native autoplay starts it; the
 * effect nudges it again once data arrives and stops it for visitors who ask
 * for reduced motion, who get the still poster frame instead.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.muted = true;
    // Autoplay refused (data saver etc.) leaves the poster, which is fine.
    const start = () => video.play().catch(() => {});
    start();
    // An early play() can be dropped before the data arrives; try again once it can play.
    video.addEventListener("canplay", start, { once: true });
    return () => video.removeEventListener("canplay", start);
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video__media"
      poster="/video/hero-typing.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/video/hero-typing.mp4" type="video/mp4" />
    </video>
  );
}
