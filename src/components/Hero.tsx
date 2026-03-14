import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Standard fade for the small text
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

      // 2. The massive fly-through scale animation for the image
      gsap.to(".beyond-img", {
        scale: 20, // Scales up massively
        opacity: 0, // Fades out as it hits the camera
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute top-[25%] left-[10%] max-w-[200px] text-xs leading-relaxed tracking-wider font-main hero-text">
        PURE FUNCTIONAL ELIXIR FOR PEAK MENTAL FOCUS AND PHYSICAL STAMINA
      </div>

      <div className="absolute top-[35%] right-[10%] max-w-[200px] text-xs leading-relaxed tracking-wider text-right font-main hero-text">
        A DAILY RITUAL DESIGNED TO UNLOCK VITALITY AND SUSTAIN YOUR INNER DRIVE
      </div>

      <div className="absolute bottom-[30%] right-[25%] max-w-[250px] text-xs leading-relaxed tracking-wider font-main hero-text">
        CRAFTED FROM NATURAL ORIGINS TO DELIVER HIGH-LEVEL COGNITIVE PERFORMANCE
      </div>

      {/* BEYOND ALWAYS IMAGE */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none px-8">
        <img
          src="/herotext.webp"
          alt="Beyond Always"
          // Added "beyond-img" class here to target it with GSAP
          className="beyond-img w-full max-w-[80vw] md:max-w-5xl opacity-40 mix-blend-screen object-contain"
        />
      </div>
    </section>
  );
}
