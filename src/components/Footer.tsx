export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white pt-24 pb-8 px-6 md:px-12 flex flex-col z-20">
      {/* 1. HUGE TITLE AT THE TOP */}
      <div className="w-full mb-16 md:mb-24 flex flex-col justify-center items-center md:items-start border-b border-white/20 pb-8 md:pb-12">
        <h1 className="text-[14vw] md:text-[7vw] text-center font-black leading-none tracking-tighter opacity-90 font-druk uppercase whitespace-nowrap">
          ORDINATRIX 26.0
        </h1>
      </div>

      {/* 2. LINKS AND NEWSLETTER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-16 md:gap-0 mb-24">
        {/* Newsletter */}
        <div className="w-full md:max-w-md">
          <h4 className="text-2xl font-bold mb-4 font-druk tracking-wider uppercase">
            MASTER OF ALL TRADES
          </h4>
        </div>

        {/* Links */}
        <div className="flex gap-12 md:gap-24 text-sm tracking-[0.2em] font-bold font-prim uppercase">
          <ul className="space-y-6">
            <li>
              <a href="#" className="hover:opacity-50 transition-opacity">
                INSTAGRAM
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-50 transition-opacity">
                TIKTOK
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-50 transition-opacity">
                TWITTER
              </a>
            </li>
          </ul>
          <ul className="space-y-6">
            <li>
              <a href="#" className="hover:opacity-50 transition-opacity">
                CONTACT
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-50 transition-opacity">
                PRIVACY
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-50 transition-opacity">
                TERMS
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. COPYRIGHT BAR */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs tracking-[0.2em] opacity-40 border-t border-white/20 pt-8 font-prim uppercase text-center md:text-left gap-4 md:gap-0">
        <span>© 2026 PYROTECH CLUB.</span>
      </div>
    </footer>
  );
}
