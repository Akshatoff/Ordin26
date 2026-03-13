import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const INGREDIENTS = [
  { name: "L-THEANINE", origin: "GREEN TEA LEAVES", benefit: "CALM FOCUS" },
  { name: "ASHWAGANDHA", origin: "ANCIENT ROOTS", benefit: "STRESS RELIEF" },
  { name: "CORDYCEPS", origin: "HIMALAYAN FUNGI", benefit: "NATURAL ENERGY" },
  { name: "LION'S MANE", origin: "MEDICINAL MUSHROOM", benefit: "COGNITION" },
];

export default function Ingredients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll effect
      gsap.to(scrollRef.current, {
        xPercent: -100 + (100 / INGREDIENTS.length), // Stop at the last item
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 viewport heights
          pin: true,
          scrub: 1,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black/20 backdrop-blur-sm overflow-hidden flex items-center">
      <div className="absolute top-12 left-12 text-sm tracking-widest font-bold opacity-50">
        THE ANCIENT CORE
      </div>

      {/* Horizontal scrolling track */}
      <div ref={scrollRef} className="flex h-full items-center w-[400vw]">
        {INGREDIENTS.map((item, i) => (
          <div key={i} className="w-screen flex flex-col justify-center px-24">
            <h3 className="text-[8vw] font-black leading-none tracking-tighter mb-4">
              {item.name}
            </h3>
            <div className="flex gap-12 text-sm tracking-widest font-mono border-t border-white/20 pt-4 w-max">
              <div>
                <span className="opacity-50 block mb-1">ORIGIN</span>
                {item.origin}
              </div>
              <div>
                <span className="opacity-50 block mb-1">BENEFIT</span>
                {item.benefit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
