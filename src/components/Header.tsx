import React from 'react';
import { useLenis } from 'lenis/react'; 

export default function Header() {
  const lenis = useLenis();

  const navItems = [
    { name: 'Events', target: '#events-section' },
    { name: 'About', target: '#about-section' },
    { name: 'Team', target: '#team-section' },
    { name: 'Contact', target: '#contact-section' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    }
  };

  return (
    <>
    {/* 1. Removed mix-blend-difference and increased px-6 md:px-12 to px-8 md:px-20 */}
    <header className="fixed top-12 left-0 w-full z-[100] pointer-events-none px-8 md:px-20 py-4">
      <nav className="relative flex justify-end items-center w-full h-10">
        
        {/* 2. Changed -left-10 to left-0 so it perfectly hugs the inside padding */}
        <div 
          className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
          onClick={(e) => handleNavClick(e as any, 'top')} 
        >
          <img 
            src="/logo.png" 
            alt="Pyrotech Logo"
            className="h-[40px] md:h-[40px] w-auto object-contain transition-transform duration-300 group-hover:scale-95 origin-left"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-5 pointer-events-auto font-main absolute right-10">
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              // Added a subtle drop shadow (drop-shadow-md) to ensure the white text is readable if it crosses a bright part of your background image
              className="group relative flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-white hover:text-white transition-all duration-300 uppercase drop-shadow-md"
            >
              <span className="text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-mono">
                {`0${i + 1}`}
              </span>
              <span>{item.name}</span>
              <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden pointer-events-auto cursor-pointer text-white text-[10px] tracking-[0.2em] border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300 uppercase font-main backdrop-blur-sm bg-black/20">
          [ Menu ]
        </div>

      </nav>
    </header>
    </> 
  );
}