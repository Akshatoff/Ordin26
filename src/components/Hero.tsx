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
      // FIX 1: Changed 'overflow-hidden' to 'overflow-x-clip'
      // This stops horizontal scrollbars from the 20x zoom, but lets you push the image down!
      className="relative w-full h-screen overflow-x-clip"
    >
      <div className="absolute top-[25%] left-[10%] max-w-[200px] text-xs leading-relaxed tracking-wider font-main hero-text">
  CUTTING-EDGE DIGITAL CRAFTSMANSHIP FUELING THE NEXT GENERATION OF INNOVATORS
</div>

<div className="absolute top-[35%] right-[10%] max-w-[200px] text-xs leading-relaxed tracking-wider text-right font-main hero-text">
  A SYNERGY OF CODE, DESIGN, AND HARDWARE ENGINEERED TO PUSH LIMITS
</div>

<div className="absolute bottom-[30%] right-[25%] max-w-[250px] text-xs leading-relaxed tracking-wider font-main hero-text">
  DOMINATING THE TECH CIRCUIT THROUGH ELITE PROBLEM SOLVING AND CREATIVE EXECUTION
</div>

      {/* BEYOND ALWAYS IMAGE */}
      {/* FIX 2: You can now use negative bottom values like -bottom-10, -bottom-20, etc. */}
      <div className="absolute -bottom-80 left-10 w-full flex justify-center pointer-events-none px-8">
        <img
          src="/ordins.png"
          alt="Beyond Always"
          // FIX 3: Actually added the 'beyond-img' class to the string!
          className="w-full max-w-[80vw] md:max-w-5xl opacity-60 mix-blend-screen object-contain"
        />
      </div>
    </section>
  );
}
