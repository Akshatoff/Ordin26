import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Science() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center p-12 text-center bg-gradient-to-t from-black to-transparent">
      <p className="text-sm tracking-widest opacity-50 mb-8 reveal-text">THE MODERN ELIXIR</p>

      <h2 className="text-4xl md:text-6xl font-black max-w-5xl leading-tight tracking-tighter reveal-text">
        ENGINEERED FOR BIOAVAILABILITY. WE STRIPPED AWAY THE FILLERS TO DELIVER PURE, POTENT EXTRACTS DIRECTLY TO YOUR SYSTEM.
      </h2>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-6xl w-full reveal-text">
        <div className="border-l border-white/30 pl-6">
          <h4 className="text-xl font-bold mb-2">EXTRACTION</h4>
          <p className="text-xs opacity-70 tracking-wider leading-relaxed">Advanced cold-press technology preserves the delicate molecular structures of our natural ingredients.</p>
        </div>
        <div className="border-l border-white/30 pl-6">
          <h4 className="text-xl font-bold mb-2">FORMULATION</h4>
          <p className="text-xs opacity-70 tracking-wider leading-relaxed">Synergistic blending ensures that each compound enhances the efficacy of the others.</p>
        </div>
        <div className="border-l border-white/30 pl-6">
          <h4 className="text-xl font-bold mb-2">ABSORPTION</h4>
          <p className="text-xs opacity-70 tracking-wider leading-relaxed">Liposomal delivery guarantees maximum cellular uptake, meaning you feel it faster and longer.</p>
        </div>
      </div>
    </section>
  );
}
