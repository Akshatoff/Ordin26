import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import plugin

gsap.registerPlugin(ScrollTrigger); // Register plugin

const PILLARS = [
  {
    title: "MENTAL FOCUS",
    desc: "A vial of clarity. Designed to help you be sharper and stay present in a world that constantly asks for more.",
    subtitle:
      "PROVIDES MENTAL FOCUS, CLARITY, AND SHARPNESS FOR THE MODERN HUMAN",
  },
  {
    title: "STAMINA STRENGTH",
    desc: "A daily act of power. Fast-acting formulations crafted for those who demand high physical performance and endurance.",
    subtitle: "PROVIDES STAMINA, STRENGTH, AND ENERGY FOR PERFORMANCE",
  },
  {
    title: "INNER BALANCE",
    desc: "A ritual for the modern human to find calm amidst the chaos.",
    subtitle: "DESIGNED FOR BALANCE, CLARITY, AND OVERALL WELLBEING",
  },
  {
    title: "IMMUNE BOOST",
    desc: "Crafted from natural origins and powerful ingredients to enhance both body and mind.",
    subtitle: "PROVIDES AN OVERALL WELLBEING AND IMMUNE BOOST",
  },
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        onUpdate: (self) => {
          const index = Math.min(3, Math.floor(self.progress * 4));
          if (index !== activeIdx) {
            setActiveIdx(index);
            window.dispatchEvent(
              new CustomEvent("changePillar", { detail: { index } }),
            );
          }
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []); // Removed `activeIdx` from deps to prevent re-creating ScrollTrigger

  return (
    <section
      id="pillars-section"
      ref={containerRef}
      className="relative w-full h-screen"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
        {/* Pillar Navigation */}
        <div className="absolute top-32 flex gap-8 text-xs tracking-widest font-bold">
          {PILLARS.map((pillar, i) => (
            <span
              key={i}
              className={`transition-opacity duration-300 ${activeIdx === i ? "opacity-100" : "opacity-30"}`}
            >
              {pillar.title}
            </span>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="w-full h-full flex items-center justify-between">
          {/* Left Large Title */}
          <div className="w-1/3">
            <h2 className="text-6xl font-black leading-none tracking-tighter transition-all duration-500">
              {PILLARS[activeIdx].title.split(" ").map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h2>
          </div>

          {/* Right Description */}
          <div className="w-1/3 flex flex-col items-end text-right">
            <div className="text-sm font-mono opacity-50 mb-2">
              0{activeIdx + 1}/04
            </div>
            <p className="text-sm tracking-wider leading-relaxed max-w-[250px] transition-all duration-500">
              {PILLARS[activeIdx].desc}
            </p>
          </div>
        </div>

        {/* Bottom Subtitle */}
        <div className="absolute bottom-20 max-w-md text-center text-xs tracking-widest opacity-80 transition-all duration-500">
          {PILLARS[activeIdx].subtitle}
        </div>
      </div>
    </section>
  );
}
