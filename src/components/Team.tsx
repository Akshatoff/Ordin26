import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RGBA_ASTC_12x12_Format } from "three";

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Aneira Shewaramani",
    quote: "The chosen one",
    x: 40,
    y: 18,
    img: "/team/aneira.jpeg",
    position: "President"
  },
  {
    id: 2,
    name: "Akshat Hatwal",
    quote: "Khoya Hua Piya",
    x: 65,
    y: 14,
    img: "/team/akshat.jpg",
    position: "Vice President"
  },
  {
    id: 3,
    name: "Viraaj Bhardwaj",
    quote: "Amaze Amaze Amaze",
    x: 90,
    y: 40,
    img: "/team/vir.jpg",
    position: "Gaming Head"
  },
  {
    id: 4,
    name: "Shaurya Singh",
    quote: "She gets her way",
    x: 90,
    y: 60,
    img: "/team/shaurya.jpg",
    position: "Programming Head"
  },
  {
    id: 5,
    name: "Aradhya Bhola",
    quote: "Crafting the final polish.",
    x: 50,
    y: 88,
    img: "/team/aradhya.jpg",
    position: "Photography Head"
  },
  {
    id: 6,
    name: "Jayden Haokip",
    quote: "Manipur Final Boss",
    x: 20,
    y: 32,
    img: "/team/jayden.png",
    position: "Editing Head"
  },
  {
    id: 7,
    name: "Neelanjan Pal",
    quote: "Soundscapes that evoke emotion.",
    x: 30,
    y: 85,
    img: "/team/neelanjan.jpg",
    position: "Crypter"
  },
  {
    id: 8,
    name: "Yana Pawar",
    quote: "I don’t just make films, I make moments immortal.",
    x: 15,
    y: 77,
    img: "/team/y.PNG",
    position: "Movie Making Head"
  },
  {
    id: 9,
    name: "Shaarav Katoch",
    quote: "The One With The Camera.",
    x: 10,
    y: 47,
    img: "/team/shaarav.png",
    position: "Photography Head"
  },
  {
    id: 10,
    name: "AR Nadal",
    quote: "Bringing 3D to reality.",
    x: 65,
    y: 85,
    img: "/team/nadal.jpg",
    position: "ProCoder"
  },
  {
    id: 11,
    name: "Jyotirmay Routray",
    quote: "jootemaar rote ray",
    x: 85,
    y: 25,
    img: "/team/jyoti.png",
    position: "Creative Head"
  },
 {
    id: 12,
    name: "Medhansh Mathur",
    quote: "Crafting Levels",
    x: 85,
    y: 75,
    img: "/team/medhansh.jpeg",
    position: "Crypter"
  },
 {
    id: 13,
    name: "Abeer Kumar",
    quote: "The one who makes bots",
    x: 10,
    y: 63,
    img: "/team/abeer.jpeg",
    position: "Member"
  }
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
        "<0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team-section"
      ref={sectionRef}
      className="relative z-40 w-full aspect-[4/3] md:aspect-video bg-white text-black flex items-center justify-center"
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
          Masters of All
          <br />
          Trades
        </h2>
      </div>

      {/* 3. THE TEAM NODES */}
      {TEAM_MEMBERS.map((member, index) => (
        <div
          key={member.id}
          ref={(el) => {
            nodesRef.current[index] = el;
          }}
          className="group absolute flex items-center gap-3 bg-white px-2 md:p-3 rounded-full shadow-xl border border-black/5 hover:scale-110 transition-transform cursor-pointer z-20 hover:z-50 pointer-events-auto"
          style={{
            left: `${member.x}%`,
            top: `${member.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Node Profile Picture */}
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Node Main Text & Position */}
          <div className="flex flex-col justify-center pr-2 md:pr-4">
            {member.position && (
              <span className="text-[8px] md:text-[9px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">
                {member.position}
              </span>
            )}
            <span className="text-[10px] md:text-xs font-black tracking-widest whitespace-nowrap leading-none">
              {member.name}
            </span>
          </div>

          {/* 4. THE UPGRADED TOOLTIP */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 p-2 bg-[#111111]/90 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-50 transition-all duration-300 ease-out flex flex-col opacity-0 -translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
            {/* Tooltip Triangle Arrow */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-b-[#111111]/90 drop-shadow-lg"></div>

            {/* Huge Rectangular Image */}
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-40 rounded-xl object-cover object-[center_38%] mb-3 border border-white/5"
            />

            {/* Text Container */}
            <div className="flex flex-col text-center px-2 pb-2">
              <span className="text-sm font-bold tracking-wider uppercase mb-1">
                {member.name}
              </span>
              <p className="text-xs text-white/70 italic leading-snug font-medium capitalize">
                "{member.quote}"
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}