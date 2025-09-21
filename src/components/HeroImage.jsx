import { useEffect, useMemo, useRef, useState } from "react";

// CSS-only crossfade with two layers (base + overlay). No library transforms.
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
  return new Promise((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.decode) img.decode().then(resolve).catch(resolve);
  });
}

export default function HeroImage({ images = [], alt = "Hero Image", interval = 5000, fadeDuration = 900 }) {
  const slides = useMemo(() => normalizeImages(images), [images]);
  const [baseSrc, setBaseSrc] = useState(slides[0]?.src || "");
  const [overlaySrc, setOverlaySrc] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const indexRef = useRef(0);
  const mountedRef = useRef(true);

  // Reset when images change
  useEffect(() => {
    setBaseSrc(slides[0]?.src || "");
    setOverlaySrc("");
    setOverlayVisible(false);
    indexRef.current = 0;
  }, [slides]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Loop: wait -> decode next -> fade in overlay -> switch base -> fade out overlay -> clear
  useEffect(() => {
    if (slides.length <= 1) return;
    let cancelled = false;
    (async function run() {
      while (!cancelled && mountedRef.current) {
        await sleep(interval);
        if (cancelled || !mountedRef.current) break;

        const nextIdx = (indexRef.current + 1) % slides.length;
        const nextSrc = slides[nextIdx]?.src;
        if (!nextSrc) continue;

        // Pre-decode next image to reduce chances of a blank paint
        await decodeImage(nextSrc);
        if (cancelled || !mountedRef.current) break;

        // Put next image on overlay, then let it fade in
        setOverlaySrc(nextSrc);
        await new Promise((r) => requestAnimationFrame(r)); // ensure element exists before toggling opacity
        setOverlayVisible(true);

        // Fade-in time
        await sleep(fadeDuration);
        if (cancelled || !mountedRef.current) break;

        // Switch base to next after overlay is fully visible
        setBaseSrc(nextSrc);

        // Keep overlay up for at least one paint to avoid a frame where neither is ready
        await new Promise((r) => requestAnimationFrame(r));
        if (cancelled || !mountedRef.current) break;

        // Fade overlay out gently instead of yanking it
        setOverlayVisible(false);

        // Let fade-out complete, then clear overlay
        await sleep(fadeDuration);
        if (cancelled || !mountedRef.current) break;

        setOverlaySrc("");
        indexRef.current = nextIdx;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slides, interval, fadeDuration]);

  const isFirst = baseSrc === slides[0]?.src;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black isolate">
      {baseSrc && (
        <img
          src={baseSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover block"
          loading={isFirst ? "eager" : "eager"}
          decoding="async"
          fetchPriority={isFirst ? "high" : "auto"}
        />
      )}

      {overlaySrc && (
        <img
          src={overlaySrc}
          alt={`${alt} next`}
          className={`absolute inset-0 w-full h-full object-cover block transition-opacity ${
            overlayVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: `${fadeDuration}ms`,
            willChange: "opacity",
          }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-4">For People in Love</h1>
        <p className="text-sm md:text-base tracking-widest uppercase text-white/90">I am your photographer</p>
      </div>
    </div>
  );
}
