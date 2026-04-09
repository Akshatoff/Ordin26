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
    <header className="fixed top-8 left-0 w-full z-[100] pointer-events-none px-6 md:px-12 py-4 mix-blend-difference">
      {/* Changed to relative, set a fixed small height (h-10), 
        and used justify-end so the links stay on the right.
      */}
      <nav className="relative flex justify-end items-center w-full h-10">
        
        {/* Logo - Now ABSOLUTE so it doesn't stretch the navbar */}
        <div 
          className="absolute -left-10 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
          onClick={(e) => handleNavClick(e as any, 'top')} 
        >
          <img 
            src="/logo.png" 
            alt="Pyrotech Logo"
            // Change the 100px to whatever size you need (e.g., h-[150px])
            className="h-[300px] md:h-[300px] w-auto object-contain transition-transform duration-300 group-hover:scale-95 origin-left"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-10 pointer-events-auto font-main">
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className="group relative flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-white hover:text-white transition-all duration-300 uppercase"
            >
              <span className="text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-mono">
                {`0${i + 1}`}
              </span>
              <span>{item.name}</span>
              <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-white/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden pointer-events-auto cursor-pointer text-white text-[10px] tracking-[0.2em] border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300 uppercase font-main">
          [ Menu ]
        </div>

      </nav>
    </header>
  );
}