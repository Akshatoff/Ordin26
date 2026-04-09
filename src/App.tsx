import { ReactLenis, LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Pillars from "./components/Pillars";
import CanvasScene from "./components/CanvasScene";
import Ingredients from "./components/Ingredients";
import Team from "./components/Team";
import Update from "./components/Update";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<LenisRef>(null);
  const bgRef = useRef<HTMLImageElement>(null); 

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.on("scroll", ScrollTrigger.update);
    }

    const updateLenis = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: -55,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.2}`,
          scrub: true,
        },
      });
    });

    return () => {
      gsap.ticker.remove(updateLenis);
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.off("scroll", ScrollTrigger.update);
      }
      ctx.revert(); 
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
            ref={bgRef} 
            src="/herodb.jpeg"
            alt="Background"
            className="absolute left-0 w-full h-[200%] -top-[0%] object-cover"
          />
        </div>

        {/* 3D Canvas */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <CanvasScene />
        </div>
        
        {/* UI Elements */}
        <ScrollProgress /> 
        <Header />
        
        {/* Main Content - Added IDs to match the Header targets */}
        <main className="relative w-full text-white font-sans uppercase">
          <Hero />
          
          <div id="events-section">
            <Pillars />
          </div>
          
          <div id="about-section">
            <Ingredients />
          </div>
          
          <div id="team-section">
            <Team />
          </div>
          
          <Update />
          
          <div id="contact-section">
            <Footer />
          </div>
        </main>
      </ReactLenis>
    </>
  );
}