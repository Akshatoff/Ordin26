import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const litTrackRef = useRef<HTMLDivElement>(null);

  const NUM_SEGMENTS = 120;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(litTrackRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          // 1. Use GSAP's native method to find the absolute maximum scroll distance
          end: () => ScrollTrigger.maxScroll(window),
          scrub: 0.1,
          // 2. THE MAGIC BULLET: Force this to calculate AFTER all pinned sections
          refreshPriority: -1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-4! pt-4! md:px-8 md:pt-6 pointer-events-none">
      <div className="relative w-full h-3 md:h-4">
        {/* BACKGROUND TRACK: Unlit, semi-transparent ticks */}
        <div className="absolute inset-0 flex justify-between items-center w-full">
          {[...Array(NUM_SEGMENTS)].map((_, i) => (
            <div key={`unlit-${i}`} className="w-[2px] h-full bg-white/20" />
          ))}
        </div>

        {/* FOREGROUND TRACK: Lit, glowing ticks */}
        <div
          ref={litTrackRef}
          className="absolute inset-0 flex justify-between items-center w-full"
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        >
          {[...Array(NUM_SEGMENTS)].map((_, i) => (
            <div
              key={`lit-${i}`}
              className="w-[2px] h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
