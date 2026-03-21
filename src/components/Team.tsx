import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Updated array: Changed 'role' to 'name' and added a 'quote' for the tooltip
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Aneira Shewaramani",
    quote: "Dream it, then build it.",
    x: 40,
    y: 18,
    img: "/rect.avif",
  },
  {
    id: 2,
    name: "Akshat Hatwal",
    quote: "Pixels in perfect harmony.",
    x: 65,
    y: 14,
    img: "/rect2.avif",
  },
  {
    id: 3,
    name: "Jyotirmay Routray",
    quote: "Logic meets creative vision.",
    x: 88,
    y: 25,
    img: "/rect3.avif",
  },
  {
    id: 4,
    name: "Shaurya Singh",
    quote: "Motion that tells a story.",
    x: 90,
    y: 40,
    img: "/rect4.avif",
  },
  {
    id: 5,
    name: "Aradhya Bhola",
    quote: "Crafting the final polish.",
    x: 90,
    y: 60,
    img: "/rect5.avif",
  },
  {
    id: 6,
    name: "Aditya Choithani",
    quote: "Bringing 3D to reality.",
    x: 75,
    y: 80,
    img: "/rect.avif",
  },
  {
    id: 7,
    name: "Viraaj Bhardwaaj",
    quote: "Directing the visual symphony.",
    x: 50,
    y: 88,
    img: "/rect2.avif",
  },
  {
    id: 8,
    name: "Neelanjan Pal",
    quote: "Soundscapes that evoke emotion.",
    x: 30,
    y: 85,
    img: "/rect3.avif",
  },
  {
    id: 9,
    name: "Yana",
    quote: "Shaping digital dimensions.",
    x: 15,
    y: 77,
    img: "/rect4.avif",
  },
  {
    id: 10,
    name: "Aarav Tokas",
    quote: "Innovation in every frame.",
    x: 12,
    y: 62,
    img: "/rect4.avif",
  },
  {
    id: 11,
    name: "Shaarav Katoch",
    quote: "Engineering the impossible.",
    x: 10,
    y: 47,
    img: "/rect4.avif",
  },
  {
    id: 12,
    name: "Jayden",
    quote: "Pushing the boundaries always.",
    x: 25,
    y: 22,
    img: "/rect4.avif",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!pathRef.current || !sectionRef.current) return;

    const pathLength = pathRef.current.getTotalLength();

    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 2,
      });

      tl.fromTo(
        nodesRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.5)",
        },
        "<0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team-section"
      ref={sectionRef}
      className="relative z-40 w-full aspect-[4/3] md:aspect-video bg-white text-black overflow-hidden flex items-center justify-center z-20"
    >
      {/* 1. THE SVG PATH */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 50 15 C 75 10, 95 25, 90 50 C 85 75, 75 90, 50 90 C 25 90, 5 75, 10 50 C 15 25, 25 20, 50 15 Z"
          fill="none"
          stroke="black"
          strokeWidth="0.2"
          className="opacity-40"
        />
      </svg>

      {/* 2. THE CENTRAL TEXT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
          A DEDICATED TEAM,
          <br />A UNITED CULTURE
        </h2>
      </div>

      {/* 3. THE TEAM NODES */}
      {TEAM_MEMBERS.map((member, index) => (
        <div
          key={member.id}
          ref={(el) => (nodesRef.current[index] = el)}
          // 1. The 'group' class is here
          className="group absolute flex items-center gap-3 bg-white px-2! md:p-3 rounded-full shadow-xl border border-black/5 hover:scale-110 transition-transform cursor-pointer z-20 hover:z-50 pointer-events-auto"
          style={{
            left: `${member.x}%`,
            top: `${member.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Profile Picture */}
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Main Node Text */}
          <span className="text-[10px] md:text-xs font-bold tracking-widest whitespace-nowrap pr-2">
            {member.name}
          </span>

          {/* 4. THE TOOLTIP */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-black text-white rounded-xl shadow-2xl z-50 transition-all duration-300 ease-out flex flex-col items-center text-center opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
            {/* Tooltip Image */}
            <img
              src={member.img}
              alt={member.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white mb-3 shadow-md"
            />

            {/* Tooltip Text */}
            <span className="text-sm font-bold tracking-wider uppercase mb-1">
              {member.name}
            </span>
            <p className="text-xs font-medium text-gray-300 italic leading-snug font-prim capitalize">
              "{member.quote}"
            </p>

            {/* Tooltip Triangle Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black"></div>
          </div>
        </div>
      ))}
    </section>
  );
}
