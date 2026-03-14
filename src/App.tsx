import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import CanvasScene from "./components/CanvasScene";
import Ingredients from "./components/Ingredients";
import Science from "./components/Science";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    // 1. Tell ScrollTrigger to update every time Lenis scrolls
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.on("scroll", ScrollTrigger.update);
    }

    // 2. Add Lenis to the GSAP ticker so they run on the exact same frame loop
    const updateLenis = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // Disable GSAP lag smoothing to prevent jitter with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <>
      {/* autoRaf={false} is critical here because we are manually
        telling GSAP to run the Lenis RAF loop above!
      */}
      <ReactLenis
        root
        ref={lenisRef}
        autoRaf={false}
        options={{ lerp: 0.05, smoothWheel: true }}
      >
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#c3281a]">
          <img
            src="/heroRed.avif"
            alt="Background"
            className="absolute left-0 w-full h-[120%] -top-[10%] object-cover"
          />
        </div>
        {/* 3D Canvas */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <CanvasScene />
        </div>

        {/* Main Content */}
        <main className="relative z-20 w-full text-white font-sans uppercase">
          <Hero />
          <Pillars />
          <Ingredients />
          <Science />
          <Footer />
        </main>
      </ReactLenis>
    </>
  );
}
