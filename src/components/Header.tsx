export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 pointer-events-auto">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
            <span className="text-xs">S</span>
          </div>
          <span className="text-xl font-bold tracking-widest">SOM</span>
        </div>

        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-black tracking-[0.2em]">SOMPOWER</h1>
          <p className="text-xs tracking-widest mt-1 opacity-80">+ THE RITUAL</p>
        </div>

        <button className="bg-white text-black px-6 py-2 text-sm font-bold hover:bg-gray-200 transition-colors">
          JOIN WAITLIST +
        </button>
      </header>

      {/* Side Text */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 z-50 text-xs tracking-widest opacity-70 mix-blend-difference">
        TIKTOK
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 rotate-90 z-50 text-xs tracking-widest opacity-70 mix-blend-difference">
        INSTAGRAM
      </div>
    </>
  );
}
