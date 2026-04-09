import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Total scroll distance while pinned
          pin: true,
          scrub: 1,
        },
      });

      // 1. Zoom the grid just enough so the video exactly fills the screen
      // Scale 3.5 is the sweet spot for a 40%x32% container inside a 120vw/vh grid
      tl.to(gridRef.current, {
        scale: 3.5, 
        duration: 1, // Takes up the first half of the scroll
        ease: "power2.inOut",
      });

      // 2. Fade in the text AFTER the zoom has completely stopped
      tl.fromTo(
        textContentRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1, // Takes up the second half of the scroll
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ingredients-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden z-20 flex items-center justify-center"
    >
      {/* 1. FLEXBOX COLLAGE */}
      <div
        ref={gridRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] flex flex-col justify-between p-8 gap-4 pointer-events-none"
        style={{ transformOrigin: "center center" }}
      >
        {/* Top Row */}
        <div className="flex w-full h-[32%] gap-4">
          <div className="relative w-1/2 h-full rounded-md overflow-hidden">
            <img
              src="/1.JPG"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Group 1"
            />
          </div>
          <div className="relative w-1/2 h-full rounded-md overflow-hidden">
            <img
              src="/4.JPG"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Group 2"
            />
          </div>
        </div>

        {/* Middle Row */}
        <div className="flex w-full h-[32%] justify-between gap-4">
          <div className="relative w-[30%] h-full rounded-md overflow-hidden">
            <img
              src="/5.jpg"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Group 3"
            />
          </div>

          {/* THE VIDEO - Fills screen at scale 3.5 and stops */}
          <div className="relative w-[40%] h-full rounded-md overflow-hidden bg-black flex-shrink-0">
            <video
              src="/teaser.mp4" // <-- Make sure to add your video path here
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="relative w-[30%] h-full rounded-md overflow-hidden">
            <img
              src="/2.JPG"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Group 4"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex w-full h-[32%] gap-4">
          <div className="relative w-1/2 h-full rounded-md overflow-hidden">
            <img
              src="/3.JPG"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Group 5"
            />
          </div>
          <div className="relative w-1/2 h-full rounded-md overflow-hidden">
            <img
              src="/6.JPG"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Group 6"
            />
          </div>
        </div>
      </div>

      {/* 2. THE CONTENT BLOCK */}
      <div
        ref={textContentRef}
        className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-12 text-white pointer-events-none"
      >
        <div className="w-full flex flex-col items-center mt-20">
          <div className="w-full flex flex-col md:flex-row justify-between items-end pointer-events-auto ml-5!">
            <div className="flex-1">
              <h2 className="text-5xl md:text-[4rem] font-black leading-none tracking-wider whitespace-nowrap font-druk mt-70!">
                <span className="font-druknw tracking-normal">TEAM</span>{" "}
                PYROTECH
              </h2>
              <p className="max-w-[95vw] text-lg md:text-2xl leading-snug tracking-wide font-medium text-white mt-40! font-prim">
                PYROTECH members are an elite team of student computer
                enthusiasts. They have represented the school in various
                competitions and won laurels in events such as web designing,
                software development, image editing, movie making, 3-D
                modelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}