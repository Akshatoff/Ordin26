import { ReactLenis, LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import CanvasScene from "./components/CanvasScene";
import Ingredients from "./components/Ingredients";
import Team from "./components/Team";
import Science from "./components/Science";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<LenisRef>(null);
  const bgRef = useRef<HTMLImageElement>(null); // 1. NEW: Ref for the background image

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.on("scroll", ScrollTrigger.update);
    }

    const updateLenis = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. NEW: Make the background image actually scroll!
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        // 1. Move it up aggressively to reveal the bottom of your 240% tall image
        yPercent: -55, 
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          // 2. CRITICAL FIX: Only stretch this animation over the first 1.5 screens! 
          // This makes it finish right as the Pillars section comes into view.
          end: () => `+=${window.innerHeight * 1.2}`, 
          // 3. Set scrub to 'true' (or a low number like 0.5) to make it highly responsive
          scrub: true, 
        },
      });
    });

    return () => {
      gsap.ticker.remove(updateLenis);
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.off("scroll", ScrollTrigger.update);
      }
      ctx.revert(); // Clean up GSAP
    };
  }, []);

  return (
    <>
      <ReactLenis
        root
        ref={lenisRef}
        autoRaf={false}
        options={{ lerp: 0.05, smoothWheel: true }}
      >
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#160100]">
          <img
            ref={bgRef} // 3. NEW: Attach the ref to the image
            src="/herodb.jpeg"
            alt="Background"
            className="absolute left-0 w-full h-[200%] -top-[0%] object-cover"
          />
        </div>

        {/* 3D Canvas */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <CanvasScene />
        </div>

        {/* Main Content */}
        <main className="relative w-full text-white font-sans uppercase">
          <Hero />
          <Pillars />
          <Ingredients />
          <Team />
          <Science />
          <Footer />
        </main>
      </ReactLenis>
    </>
  );
}