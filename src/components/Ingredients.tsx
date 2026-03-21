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
      // Create a single master timeline for the whole sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Makes the scroll last longer for a smooth fly-through
          pin: true, // Locks the section in place while we zoom
          scrub: 1, // Ties animation directly to scrollbar
        },
      });

      // 1. ZOOM IN: Scale the grid up massively so the center hole fills the screen
      tl.to(gridRef.current, {
        scale: 25, // Zoom factor (adjust higher if edges of images are still visible)
        duration: 2,
        ease: "power2.inOut",
      });

      // 2. FADE OUT GRID: Hide the stretched images once we are "inside" the hole
      tl.to(
        gridRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        "-=0.5", // Start fading out slightly before the zoom finishes
      );

      // 3. FADE IN TEXT: The text appears out of the dark void
      tl.fromTo(
        textContentRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // The main container. Needs h-screen and hidden overflow to trap the giant grid.
    <section
      id="ingredients-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden z-20 flex items-center justify-center"
    >
      {/* 1. THE ZOOMING IMAGE GRID */}
      {/* We make it slightly larger than the screen (w-[120%]) so the edges don't show when it starts */}
      <div
        ref={gridRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] grid grid-cols-3 grid-rows-3 gap-4 p-8 pointer-events-none"
        style={{ transformOrigin: "center center" }}
      >
        {/* ROW 1 */}
        <img
          src="/rect.avif"
          className="w-full h-full object-cover col-span-1 rounded-md"
          alt="Grid 1"
        />
        <img
          src="/rect2.avif"
          className="w-full h-full object-cover col-span-2 rounded-md"
          alt="Grid 2"
        />

        {/* ROW 2 */}
        <img
          src="/rect3.avif"
          className="w-full h-full object-cover col-span-1 rounded-md"
          alt="Grid 3"
        />
        {/* THE EMPTY CENTER HOLE */}
        <div className="w-full h-full col-span-1 bg-transparent"></div>
        <img
          src="/rect4.avif"
          className="w-full h-full object-cover col-span-1 rounded-md"
          alt="Grid 4"
        />

        {/* ROW 3 */}
        <img
          src="/rect5.avif"
          className="w-full h-full object-cover col-span-2 rounded-md"
          alt="Grid 5"
        />
        {/* I reused rect.avif here just to make 6 total images, replace with your actual 6th image */}
        <img
          src="/rect.avif"
          className="w-full h-full object-cover col-span-1 rounded-md"
          alt="Grid 6"
        />
      </div>

      {/* 2. THE CONTENT BLOCK (Appears inside the void) */}
      <div
        ref={textContentRef}
        className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-12 text-white pointer-events-none"
      >
        <div className="w-full flex flex-col items-center mt-20">
          {/* Top Centered Nav */}

          {/* Huge Typography & Paragraph */}
          <div className="w-full flex flex-col md:flex-row justify-between items-end pointer-events-auto ml-5!">
            <div className="flex-1">
              <h2 className="text-5xl md:text-[4rem] font-black leading-none tracking-wider whitespace-nowrap font-druk mt-100!">
                <span className="font-druknw tracking-normal">ANCIENT</span>{" "}
                WISDOM
              </h2>
              <p className="max-w-[80vw] text-lg md:text-2xl leading-snug tracking-wide font-medium text-white mt-56! font-prim">
                SÖM is inspired by the ancient SOMA — a sacred elixir known to
                bring vitality and a higher State of Mind. We've traveled from
                the heart of the Amazon to modern labs to bottle this essence
                for the modern human.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
