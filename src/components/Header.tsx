import React from 'react';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center mix-blend-difference pointer-events-none">
      {/* Logo on Left */}
      <div className="pointer-events-auto cursor-pointer">
        <h1 className="text-xl font-black tracking-tighter font-druk text-white">
          PYRO<span className="opacity-70">TECH</span>
        </h1>
      </div>

      {/* Links on Right */}
      <div className="flex gap-8 pointer-events-auto">
        {['Events', 'Team', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-bold tracking-[0.2em] text-white hover:opacity-50 transition-opacity duration-300"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}