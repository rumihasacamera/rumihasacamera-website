import { useEffect, useMemo, useRef, useState } from "react";

const normalizeImages = (images) => {
  const base = Array.isArray(images) ? images : [images];
  return base
    .filter(Boolean)
    .map((entry) => (typeof entry === "string" ? { src: entry } : entry));
};

// Two-layer crossfade with decode gating to avoid flashes
// Adds configurable fadeDuration and stagger to fine-tune feel.
const HeroImage = ({
  images = [],
  alt = "Hero Image",
  interval = 5000,
  fadeDuration = 1000,
  stagger = 120, // delay A's fade-out after B starts, for smoother feel
}) => {
  const heroImages = useMemo(() => normalizeImages(images), [images]);

  // Index of the image that is currently considered "active"
  const [activeIndex, setActiveIndex] = useState(0);

  // Layer A permanently holds the currently visible image.
  // Layer B is used temporarily to fade-in the next image.
  const [aSrc, setASrc] = useState("");
  const [bSrc, setBSrc] = useState("");
  const [showB, setShowB] = useState(false); // when true, B is on top and visible
  const [hideA, setHideA] = useState(false); // when true, A begins fading out

  const intervalRef = useRef(null);
  const fadeRef = useRef(null);
  const runIdRef = useRef(0); // cancel in-flight preloads on prop changes
  const inTransitionRef = useRef(false);

  // Reset on images change
  useEffect(() => {
    runIdRef.current += 1;
    const rid = runIdRef.current;
    if (!heroImages.length) {
      setASrc("");
      setBSrc("");
      setShowB(false);
      setHideA(false);
      setActiveIndex(0);
      return;
    }
    setActiveIndex(0);
    setASrc(heroImages[0].src);
    setBSrc("");
    setShowB(false);
    setHideA(false);

    // Preload first next image once initial is set
    if (heroImages.length > 1) {
      const nextIdx = 1 % heroImages.length;
      const nextSrc = heroImages[nextIdx].src;
      const img = new Image();
      img.decoding = "async";
      img.src = nextSrc;
      img.decode?.().catch(() => {});
    }

    return () => {
      // invalidate this run
      runIdRef.current += 1;
    };
  }, [heroImages]);

  // Advance slideshow
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const cycle = Math.max(interval, fadeDuration + stagger + 250);

    const tick = async () => {
      if (inTransitionRef.current) return; // guard against overlap
      inTransitionRef.current = true;
      const rid = runIdRef.current;
      const nextIdx = (activeIndex + 1) % heroImages.length;
      const nextSrc = heroImages[nextIdx].src;

      // Preload and decode the next image off-DOM
      const img = new Image();
      img.decoding = "async";
      img.src = nextSrc;
      try {
        if (img.decode) {
          await img.decode();
        } else {
          await new Promise((res) => {
            img.onload = () => res();
            img.onerror = () => res();
          });
        }
      } catch (_) {}
      if (rid !== runIdRef.current) {
        inTransitionRef.current = false;
        return; // cancelled
      }

      // Put decoded image on B layer
      setBSrc(nextSrc);
      // Start B fade-in, then stagger A fade-out
      requestAnimationFrame(() => {
        setShowB(true);
        // Begin A fade-out after stagger
        setTimeout(() => setHideA(true), stagger);
      });

      // After fade completes, commit B -> A and clear B
      if (fadeRef.current) clearTimeout(fadeRef.current);
      fadeRef.current = setTimeout(() => {
        if (rid !== runIdRef.current) {
          inTransitionRef.current = false;
          return;
        }
        setASrc(nextSrc);
        setBSrc("");
        setShowB(false);
        setHideA(false);
        setActiveIndex(nextIdx);
        inTransitionRef.current = false;
      }, fadeDuration + stagger);
    };

    // Start interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, cycle);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeRef.current) clearTimeout(fadeRef.current);
    };
  }, [activeIndex, heroImages, interval, fadeDuration, stagger]);

  // Empty state
  if (!heroImages.length) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-4">
            For People in Love
          </h1>
          <p className="text-sm md:text-base tracking-widest uppercase text-white/90">
            I am your photographer
          </p>
        </div>
      </div>
    );
  }

  const isFirst = activeIndex === 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Layer A: currently visible */}
      {aSrc && (
        <img
          key={`A-${aSrc}`}
          src={aSrc}
          alt={`${alt} ${activeIndex + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
            hideA ? "opacity-0" : "opacity-100"
          }`}
          style={{
            willChange: "opacity",
            transitionDuration: `${fadeDuration}ms`,
            transitionDelay: hideA ? `${stagger}ms` : "0ms",
          }}
          loading={isFirst ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isFirst ? "high" : "auto"}
        />
      )}

      {/* Layer B: incoming next image */}
      {bSrc && (
        <img
          key={`B-${bSrc}`}
          src={bSrc}
          alt={`${alt} next`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
            showB ? "opacity-100" : "opacity-0"
          }`}
          style={{
            willChange: "opacity",
            transitionDuration: `${fadeDuration}ms`,
            transitionDelay: "0ms",
          }}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-4">
          For People in Love
        </h1>
        <p className="text-sm md:text-base tracking-widest uppercase text-white/90">
          I am your photographer
        </p>
      </div>
    </div>
  );
};

export default HeroImage;
