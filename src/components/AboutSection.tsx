import React, { useEffect, useState } from "react";

// The data structure for your scrollable sections
const aboutData = [
  {
    id: 1,
    title: "Citizens",
    description: "A visual profile for students showcasing their social impact beyond grades and exams",
    extra: "Presented at Misk Global Forum 2024",
    // Replace these with actual image paths later (e.g., img: "/images/citizens.jpg")
    imgBg: "bg-zinc-800",
  },
  {
    id: 2,
    title: "Audos",
    description: "An AI co-pilot to help first-time entrepreneurs build sustainable businesses",
    extra: "11.5m Investment",
    imgBg: "bg-stone-800",
  },
  {
    id: 3,
    title: "Letoe",
    description: "A personal AI-guardian, keeping an eye on your children in online games, without invading their privacy",
    extra: "2.5m Users",
    imgBg: "bg-slate-800",
  },
];

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // This observer checks which text section is currently in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section crosses the 50% threshold of the screen, we update the active index
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // 50% of the item must be visible to trigger
      }
    );

    const sections = document.querySelectorAll(".about-text-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    // The main container. We give it a background color so it sits beneath the hero section properly
    <section className="relative flex w-full bg-[#0a0a0a] text-white">

      {/* LEFT SIDE: Scrolling Text */}
      <div className="w-1/2 flex flex-col">
        {aboutData.map((item, index) => (
          <div
            key={item.id}
            data-index={index}
            // h-screen ensures each block takes up a full page height, forcing the user to scroll
            className="about-text-section h-screen flex flex-col justify-center px-12 lg:px-24"
          >
            <h3 className="text-lg font-medium text-gray-400 mb-6">{item.title}</h3>
            <p className="text-3xl lg:text-5xl font-semibold leading-tight mb-12">
              {item.description}
            </p>
            {item.extra && (
              <div className="text-2xl font-bold text-white mt-auto pb-24">
                {item.extra}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE: Sticky Images */}
      <div className="w-1/2 sticky top-0 h-screen overflow-hidden">
        {aboutData.map((item, index) => (
          <div
            key={item.id}
            // Absolute positioning stacks all images on top of each other
            // The opacity smoothly transitions based on which index is active from the observer
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            } ${item.imgBg} flex items-center justify-center`}
          >
            {/* PLACEHOLDER: Swap this out for your actual images or videos */}
            <span className="text-gray-500 text-2xl font-mono tracking-widest">
              IMAGE PLACEHOLDER {item.id}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
