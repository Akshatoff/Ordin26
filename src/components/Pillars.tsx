import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// UPDATED WITH ALL 8 EVENTS FROM THE DOCUMENT
const PILLARS = [
  {
    title: "BREACH@TRIX",
    desc: "Breach@trix is a cybersecurity competition designed to simulate real-world cyber warfare. Participants will engage in identifying, exploiting, and defending vulnerabilities in a controlled environment.",
    subtitle: "TECHNICAL EXPERTISE, LOGICAL THINKING, STRATEGIC EXECUTION",
    bgImage: "/Slide001.webp",
  },
  {
    title: "PARALL@TRIX",
    desc: "Parall@trix challenges participants to create two interconnected short films that stand alone yet reveal a deeper shared narrative when viewed together. Inspired by parallel storytelling, the event blends cinematic creativity with technical precision through synchronized scenes, cross-references, and immersive audio design.",
    subtitle: "MOVIE MAKING, INTERCONNECTION, CINEMATIC CREATIVITY",
    bgImage: "/Slide002.webp",
  },
  {
    title: "INNOVATE@TRIX",
    desc: "A dynamic hackathon-style competition that challenges participants to solve real-world problems. Teams will collaborate to ideate, design, and build a unique solution—ranging from apps to hardware prototypes—that is impactful and practical.",
    subtitle: "CREATIVITY, INNOVATION, TECHNICAL EXECUTION",
    bgImage: "/Slide03.webp",
  },
  {
    title: "SNAP@TRIX",
    desc: "A photography-based cinematic challenge focusing on storytelling through visuals. Teams will recreate a scene from an assigned movie and compete in an offline round to produce a short cinematic film composed entirely of still photographs.",
    subtitle: "CINEMATIC RECREATION, STORYTELLING, VISUAL ARTS",
    bgImage: "/Slide04.webp",
  },
  {
    title: "KENSEI BOT",
    desc: "A fierce robotic combat event where two bots equipped with attacking arms compete inside a circular arena. The ultimate goal is to push, flip, strike, or disable the opponent in a test of engineering and combat strategy.",
    subtitle: "ROBOTICS, COMBAT STRATEGY, ENGINEERING",
    bgImage: "/Slide001.webp",
  },
  {
    title: "SHIKISAI RUNNER",
    desc: "An autonomous robotics challenge where a robot must follow a multi-colour path using a colour sensor. Teams must navigate zig-zags, curves, and intersections to complete the maze in the minimum possible time.",
    subtitle: "AUTONOMOUS NAVIGATION, SENSORY DETECTION, SPEED",
    bgImage: "/Slide002.webp",
  },
  {
    title: "GORIKI BOT",
    desc: "A heavy-duty robotic tug-of-war where two robots pull against each other. Built for sheer strength, the goal is to drag the opponent across a designated centre line demonstrating superior power and traction.",
    subtitle: "POWER, TRACTION, ROBOTIC TUG-OF-WAR",
    bgImage: "/Slide03.webp",
  },
  {
    title: "KŌGŌ MECHANIX",
    desc: "A hands-on challenge where students design and build a gear-based functional robot using provided components. It focuses on creativity, core mechanism understanding, and practical usability.",
    subtitle: "GEAR MECHANISMS, CREATIVE DESIGN, FUNCTIONALITY",
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
      gsap.fromTo(
        innerRef.current,
        { clipPath: "inset(10% 15% 10% 15% round 32px)" },
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

      // 2. THE PINNED TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800%",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const startSlidesProgress = 0.1;

            if (self.progress < startSlidesProgress) {
              if (activeIdxRef.current !== 0) {
                activeIdxRef.current = 0;
                setActiveIdx(0);
              }
            } else {
              const slideProgress =
                (self.progress - startSlidesProgress) /
                (1 - startSlidesProgress);

              const index = Math.min(7, Math.floor(slideProgress * 8));

              if (index !== activeIdxRef.current) {
                activeIdxRef.current = index;
                setActiveIdx(index);
                window.dispatchEvent(
                  new CustomEvent("changePillar", { detail: { index } }),
                );
              }
            }
          },
        },
      });

      tl.fromTo(
        uiRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power1.out" },
      ).to({}, { duration: 16 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- TEXT ENTRANCE ANIMATION ---
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
        <div
          ref={innerRef}
          className="relative w-full h-full overflow-hidden bg-black"
        >
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

          <div
            ref={uiRef}
            className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-12 opacity-0"
          >
            {/* Top Header & Navigation */}
            <div className="w-full flex flex-col items-center gap-6 mt-[5rem]!">
              <div className="flex flex-wrap text-xs tracking-widest pt-4 w-11/12 justify-center gap-2">
                {PILLARS.map((pillar, i) => (
                  <button
                    key={i}
                    className={`transition-all duration-500 cursor-default py-[10px]! px-[18px]! border border-solid border-white color-white backdrop-blur-xl text-[0.85rem] rounded-[100px] flex justify-center items-center pointer font-main bg-[rgba(255,255,255,0.2)] ${
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
                  0{activeIdx + 1}/0{PILLARS.length}
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
