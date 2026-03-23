export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white pt-32 pb-12 px-12 overflow-hidden flex flex-col justify-between min-h-[60vh]">
      <div className="flex justify-between items-start z-10">
        <div className="max-w-sm">
          <h4 className="text-2xl font-bold mb-4">JOIN THE RITUAL</h4>
          <p className="text-xs tracking-wider opacity-60 leading-relaxed mb-8">
            Enter your email to secure your spot on the waitlist. Limited batches produced monthly.
          </p>
          <div className="flex border-b border-white/30 pb-2">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="bg-transparent outline-none text-sm w-full tracking-widest placeholder:text-white/30"
            />
            <button className="text-sm font-bold tracking-widest hover:text-gray-400 transition-colors">
              SUBMIT
            </button>
          </div>
        </div>

        <div className="flex gap-20 text-xs tracking-widest font-bold">
          <ul className="space-y-4">
            <li><a href="#" className="hover:opacity-50 transition-opacity">INSTAGRAM</a></li>
            <li><a href="#" className="hover:opacity-50 transition-opacity">TIKTOK</a></li>
            <li><a href="#" className="hover:opacity-50 transition-opacity">TWITTER</a></li>
          </ul>
          <ul className="space-y-4">
            <li><a href="#" className="hover:opacity-50 transition-opacity">CONTACT</a></li>
            <li><a href="#" className="hover:opacity-50 transition-opacity">PRIVACY</a></li>
            <li><a href="#" className="hover:opacity-50 transition-opacity">TERMS</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-32 w-full flex flex-col items-center">
        <h1 className="text-[12.2vw] font-black leading-none tracking-tighter opacity-90">
          ORDINATRIX 26.0
        </h1>
        <div className="w-full flex justify-between text-[10px] tracking-widest opacity-40 mt-4">
          <span>© 2026 SOM POWER. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED FOR THE MODERN HUMAN.</span>
        </div>
      </div>
    </footer>
  );
}
