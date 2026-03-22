import { ReactLenis, LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import CanvasScene from "./components/CanvasScene";
import Ingredients from "./components/Ingredients";
import Team from "./components/Team"; // <-- NEW IMPORT
import Science from "./components/Science";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
      // We can still optionally bind the scroll event here if it's ready
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.on("scroll", ScrollTrigger.update);
      }

      const updateLenis = (time: number) => {
        // FIX: Read dynamically from the ref on EVERY frame!
        // This way, the moment Lenis is ready, it starts updating.
        lenisRef.current?.lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateLenis);
        // Good practice: cleanup the scroll listener too
        if (lenisRef.current?.lenis) {
          lenisRef.current.lenis.off("scroll", ScrollTrigger.update);
        }
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
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#c3281a]">
          <img
            src="/herodb.jpeg"
            alt="Background"
            className="absolute left-0 w-full h-[170%] -top-[0%] object-cover"
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
          <Team /> {/* <-- NEW SECTION ADDED HERE */}
          <Science />
          <Footer />
        </main>
      </ReactLenis>
    </>
  );
}
