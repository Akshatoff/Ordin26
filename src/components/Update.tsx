import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mock data for your future events. You can easily update this array later!
const eventsData = [
  {
    date: "April 10",
    year: "2026",
    title: "Registration Begins",
  },
  {
    date: "April 25",
    year: "2026",
    title: "Registration Closes",
  },
  {
    date: "April 28",
    year: "2026",
    title: "Prompts Released",
  },
];

export default function Updates() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger the reveal of the header and each event row
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Restored the original gradient background so the global hero image shows through
    <section
      ref={containerRef}
      id="updates-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 text-white bg-gradient-to-t from-black to-transparent"
    >
      <div className="w-full max-w-6xl flex flex-col items-start z-10">
        {/* Section Header */}
        <p className="text-sm md:text-base tracking-[0.3em] opacity-50 mb-4 reveal-item font-prim">
          TRANSMISSIONS
        </p>
        <h2 className="text-5xl md:text-7xl font-black leading-none tracking-wider mb-16 reveal-item font-druk uppercase">
          UPCOMING <span className="text-white/40">Deadlines</span>
        </h2>

        {/* The Event List Container */}
        <div className="w-full flex flex-col border-t border-white/20 reveal-item backdrop-blur-sm rounded-lg">
          {eventsData.map((item, index) => (
            <div
              key={index}
              className="group relative w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-12 border-b border-white/20 hover:bg-white/10 transition-colors duration-500 cursor-pointer px-4 -mx-4 md:px-8 md:-mx-8"
            >
              {/* 1. Date Block */}
              <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/4">
                <span className="text-2xl md:text-3xl font-bold tracking-widest drop-shadow-md">
                  {item.date}
                </span>
                <span className="text-sm opacity-60 tracking-widest mt-1">
                  {item.year}
                </span>
              </div>

              {/* 2. Title & Location Block */}
              <div className="flex flex-col mb-6 md:mb-0 w-full md:w-2/4">
                <h3 className="text-2xl md:text-4xl font-black tracking-wide mb-2 group-hover:translate-x-3 transition-transform duration-500 ease-out font-druk uppercase drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
