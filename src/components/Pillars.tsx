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
  const uiRef = useRef<HTMLDivElement>(null); 

  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. THE EXPANSION ANIMATION 
      // This happens WHILE you are scrolling up. It starts the second it enters the viewport
      // and finishes exactly when it hits the top.
      gsap.fromTo(
        innerRef.current,
        { clipPath: "inset(10% 15% 10% 15% round 32px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Starts as soon as it enters from the bottom
            end: "top top",      // Finishes right when it hits the top
            scrub: true,
          },
        }
      );

      // 2. THE PINNED TIMELINE (UI Fade & Image Slides)
      // This takes over once the section hits the top and locks in place.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", 
          end: "+=400%", // 4 screens worth of scrolling for the 4 slides
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            // Give the UI fade-in the first 10% of the scroll
            const startSlidesProgress = 0.1;

            if (self.progress < startSlidesProgress) {
              if (activeIdxRef.current !== 0) {
                activeIdxRef.current = 0;
                setActiveIdx(0);
              }
            } else {
              // Calculate the 4 slides over the remaining 90%
              const slideProgress =
                (self.progress - startSlidesProgress) /
                (1 - startSlidesProgress);
              const index = Math.min(3, Math.floor(slideProgress * 4));
              
              if (index !== activeIdxRef.current) {
                activeIdxRef.current = index;
                setActiveIdx(index);
                window.dispatchEvent(
                  new CustomEvent("changePillar", { detail: { index } })
                );
              }
            }
          },
        },
      });

      // Fade in the UI right after pinning
      tl.fromTo(
        uiRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power1.out" }
      )
      // Dummy duration to keep it pinned while you scroll through the 4 text slides
      .to({}, { duration: 8 });

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
    <>
    <div className="w-full h-[70vh]"></div>
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
          <div className="w-full flex flex-col items-center gap-6 mt-[5rem]!">
            <div className="flex text-xs tracking-widest pt-4 w-3/4 justify-center">
              {PILLARS.map((pillar, i) => (
                <button
                  key={i}
                  className={`transition-all duration-500 cursor-default py-[14px]! px-[24px]! border border-solid border-white color-white backdrop-blur-xl text-[1rem] rounded-[100px] flex justify-center items-center pointer font-main bg-[rgba(255,255,255,0.2)] ${
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
                  <div key={i} className="animate-text ml-40!">
                    {word}
                  </div>
                ))}
              </h2>
            </div>

            <div
              className="w-1/3 flex flex-col items-start text-left mr-40! font-prim text-xl leading-[1.14] antialiased"
              key={`desc-${activeIdx}`}
            >
              <div className="text-sm opacity-50 mb-4 animate-text font-prim antialiased">
                0{activeIdx + 1}/04
              </div>
              <p className="text-[1rem] tracking-wider leading-relaxed max-w-[500px] animate-text font-prim antialiased">
                {PILLARS[activeIdx].desc}
              </p>
            </div>
          </div>

          {/* Bottom Subtitle */}
          <div
            className="max-w-md text-center text-lg tracking-widest opacity-80 mb-30!"
            key={`sub-${activeIdx}`}
          >
            <div className="animate-text font-main">
              {PILLARS[activeIdx].subtitle}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}