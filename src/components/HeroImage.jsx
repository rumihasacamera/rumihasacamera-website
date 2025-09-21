import { useEffect, useMemo, useRef, useState } from "react";

// Simplified, robust hero:
// - Exactly two layers: base and overlay
// - Single async loop: wait -> decode next -> fade overlay in -> commit
// - No probing, no head preloads, no stagger, minimal state

const normalizeImages = (images) => {
  const base = Array.isArray(images) ? images : [images];
  return base
    .filter(Boolean)
    .map((entry) => (typeof entry === "string" ? { src: entry } : entry));
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function decodeImage(src) {
  if (!src) return;
  const img = new Image();
  img.decoding = "async";
  const done = () => {};
  return new Promise((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.decode) {
      img.decode().then(resolve).catch(resolve);
    }
  });
}

export default function HeroImage({
  images = [],
  alt = "Hero Image",
  interval = 5000,
  fadeDuration = 900,
}) {
  const heroImages = useMemo(() => normalizeImages(images), [images]);

  // Base image always visible; overlay fades in for the next frame
  const [baseSrc, setBaseSrc] = useState(heroImages[0]?.src || "");
  const [overlaySrc, setOverlaySrc] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const indexRef = useRef(0);
  const mountedRef = useRef(true);

  // Reset when image list changes
  useEffect(() => {
    setBaseSrc(heroImages[0]?.src || "");
    setOverlaySrc("");
    setOverlayVisible(false);
    indexRef.current = 0;
  }, [heroImages]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Self-scheduling loop
  useEffect(() => {
    if (heroImages.length <= 1) return;
    let cancelled = false;

    async function run() {
      while (!cancelled && mountedRef.current) {
        // Hold the current frame
        await sleep(interval);
        if (cancelled || !mountedRef.current) break;

        // Prepare next
        const nextIdx = (indexRef.current + 1) % heroImages.length;
        const nextSrc = heroImages[nextIdx]?.src;
        await decodeImage(nextSrc);
        if (cancelled || !mountedRef.current) break;

        // Fade overlay in
        setOverlaySrc(nextSrc);
        await new Promise((r) => requestAnimationFrame(r));
        setOverlayVisible(true);
        await sleep(fadeDuration);
        if (cancelled || !mountedRef.current) break;

        // Commit and reset overlay
        setBaseSrc(nextSrc);
        setOverlayVisible(false);
        setOverlaySrc("");
        indexRef.current = nextIdx;
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [heroImages, interval, fadeDuration]);

  const isFirst = indexRef.current === 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black isolate">
      {/* Base layer */}
      {baseSrc && (
        <img
          key={`base-${baseSrc}`}
          src={baseSrc}
          alt={`${alt}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading={isFirst ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isFirst ? "high" : "auto"}
          style={{ WebkitBackfaceVisibility: "hidden", transform: "translateZ(0)" }}
        />
      )}

      {/* Overlay layer for crossfade */}
      {overlaySrc && (
        <img
          key={`overlay-${overlaySrc}`}
          src={overlaySrc}
          alt={`${alt} next`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
            overlayVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: `${fadeDuration}ms`,
            willChange: "opacity",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />

      {/* Hero copy */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-4">For People in Love</h1>
        <p className="text-sm md:text-base tracking-widest uppercase text-white/90">I am your photographer</p>
      </div>
    </div>
  );
}

