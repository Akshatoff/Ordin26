import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out hero text and image as you scroll down
      gsap.to(".hero-text", {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // Changed to overflow-hidden so absolutely positioned elements don't cause scrollbars
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Floating Text 1 - Top Left */}
      <div className="absolute top-[25%] left-[30%] max-w-[200px] text-xs leading-relaxed tracking-wider font-main hero-text">
        PURE FUNCTIONAL ELIXIR FOR PEAK MENTAL FOCUS AND PHYSICAL STAMINA
      </div>

      {/* Floating Text 2 - Top Right */}
      <div className="absolute top-[45%] right-[30%] max-w-[200px] text-xs leading-relaxed tracking-wider text-right font-main hero-text">
        A DAILY RITUAL DESIGNED TO UNLOCK VITALITY AND SUSTAIN YOUR INNER DRIVE
      </div>

      {/* Floating Text 3 - Bottom Rightish */}
      <div className="absolute bottom-[20%] right-[40%] max-w-[250px] text-xs leading-relaxed tracking-wider font-main hero-text">
        CRAFTED FROM NATURAL ORIGINS TO DELIVER HIGH-LEVEL COGNITIVE PERFORMANCE
      </div>

      {/* FIX: Giant Background Image instead of H2 text */}
      <div className="absolute top-150 left-0 w-full flex justify-center pointer-events-none hero-text px-8">
        <img
          src="/herotext.webp"
          alt="Beyond Always"
          // Using mix-blend-screen or mix-blend-overlay usually looks best for text images on dark backgrounds
          className="w-full max-w-[80vw] md:max-w-5xl opacity-40 mix-blend-screen object-contain"
        />
      </div>
    </section>
  );
}
