import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: "MENTAL FOCUS",
    desc: "A vial of clarity. Designed to help you be sharper and stay present in a world that constantly asks for more.",
    subtitle:
      "PROVIDES MENTAL FOCUS, CLARITY, AND SHARPNESS FOR THE MODERN HUMAN",
    bgImage: "/Slide001.webp",
  },
  {
    title: "STAMINA STRENGTH",
    desc: "A daily act of power. Fast-acting formulations crafted for those who demand high physical performance and endurance.",
    subtitle: "PROVIDES STAMINA, STRENGTH, AND ENERGY FOR PERFORMANCE",
    bgImage: "/Slide002.webp",
  },
  {
    title: "INNER BALANCE",
    desc: "A ritual for the modern human to find calm amidst the chaos.",
    subtitle: "DESIGNED FOR BALANCE, CLARITY, AND OVERALL WELLBEING",
    bgImage: "/Slide03.webp",
  },
  {
    title: "IMMUNE BOOST",
    desc: "Crafted from natural origins and powerful ingredients to enhance both body and mind.",
    subtitle: "PROVIDES AN OVERALL WELLBEING AND IMMUNE BOOST",
    bgImage: "/Slide04.webp",
  },
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null); // NEW: Controls the UI fade-in

  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. The 80% to 100% Expanding Entry Effect
      gsap.fromTo(
        innerRef.current,
        { clipPath: "inset(15% 10% 15% 10% round 32px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );

      // 2. The Delayed UI Fade-In (Triggers exactly when clip-path hits 100%)
      gsap.fromTo(
        uiRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", // Fires exactly when the section pins
            toggleActions: "play none none reverse", // Reverses if user scrolls back up
          },
        },
      );

      // 3. The Pinning and Crossfading ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        onUpdate: (self) => {
          const index = Math.min(3, Math.floor(self.progress * 4));
          if (index !== activeIdxRef.current) {
            activeIdxRef.current = index;
            setActiveIdx(index);
            window.dispatchEvent(
              new CustomEvent("changePillar", { detail: { index } }),
            );
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- TEXT ENTRANCE ANIMATION (Runs on pillar change) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <section
      id="pillars-section"
      ref={containerRef}
      className="relative w-full h-screen"
    >
      {/* Expanding dark container */}
      <div
        ref={innerRef}
        className="relative w-full h-full overflow-hidden bg-black"
      >
        {/* Background Image Crossfade Layer */}
        <div className="absolute inset-0 z-0">
          {PILLARS.map((pillar, i) => (
            <img
              key={`bg-${i}`}
              src={pillar.bgImage}
              alt={pillar.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                activeIdx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Content Layer (Wrapped in uiRef to start hidden) */}
        <div
          ref={uiRef}
          className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-12 opacity-0"
        >
          {/* Top Header & Navigation */}
          <div className="w-full flex flex-col items-center gap-6 mt-10">
            <div className="flex gap-8 text-xs tracking-widest border-t border-white/20 pt-4 w-3/4 justify-center">
              {PILLARS.map((pillar, i) => (
                <button
                  key={i}
                  className={`transition-all duration-500 cursor-default ${
                    activeIdx === i ? "opacity-100 font-bold" : "opacity-40"
                  }`}
                >
                  {pillar.title}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Middle */}
          <div className="w-full flex items-center justify-between mt-20">
            <div className="w-1/3 flex flex-col gap-2">
              <h2
                key={`title-${activeIdx}`}
                className="text-6xl font-black leading-none tracking-tighter"
              >
                {PILLARS[activeIdx].title.split(" ").map((word, i) => (
                  <div key={i} className="animate-text">
                    {word}
                  </div>
                ))}
              </h2>
            </div>

            <div
              className="w-1/3 flex flex-col items-end text-right"
              key={`desc-${activeIdx}`}
            >
              <div className="text-sm font-mono opacity-50 mb-4 animate-text">
                0{activeIdx + 1}/04
              </div>
              <p className="text-sm tracking-wider leading-relaxed max-w-[300px] animate-text">
                {PILLARS[activeIdx].desc}
              </p>
            </div>
          </div>

          {/* Bottom Subtitle */}
          <div
            className="max-w-md text-center text-xs tracking-widest opacity-80 mb-10"
            key={`sub-${activeIdx}`}
          >
            <div className="animate-text">{PILLARS[activeIdx].subtitle}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
          className="max-w-md text-center text-xs tracking-widest opacity-80 mb-10"
            key={`sub-${activeIdx}`}
          >
            <div className="animate-text">{PILLARS[activeIdx].subtitle}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
