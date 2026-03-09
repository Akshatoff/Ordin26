import Lanyard from "./Lanyard";
import SplashCursor from "./SplashCursor";

<SplashCursor></SplashCursor>;
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex justify-center items-center">
      <style>{`
        @keyframes chromaShift {
          0%   { filter: hue-rotate(0deg) brightness(1); }
          50%  { filter: hue-rotate(15deg) brightness(1.15); }
          100% { filter: hue-rotate(0deg) brightness(1); }
        }
        @keyframes boltPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .bolt-wrap {
          position: relative;
          width: 14rem;
          height: 30rem;
          animation: boltPulse 4s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .bolt-wrap { width: 8rem; height: 16rem; }
        }
        .bolt-left  { transform: rotate(-90deg) scaleX(-2); }
        .bolt-right { transform: rotate(90deg) scaleX(-2); }
        .chroma-animate { animation: chromaShift 5s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 w-full h-full flex justify-around items-center px-[5%] md:px-[15%] pointer-events-none z-0">
        <div className="bolt-wrap bolt-left">
          <BoltSVG id="a" />
        </div>
        <div className="bolt-wrap bolt-right">
          <BoltSVG id="b" />
        </div>
      </div>

      <div className="relative z-10 w-full h-full">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>
    </section>
  );
}

function BoltSVG({ id }) {
  const points = "60,0 100,0 40,45 70,45 0,100 30,55 0,55";
  const filterId = `chroma-${id}`;
  const neonId = `neon-${id}`;
  const gradId = `grad-${id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        {/* Chromatic aberration — red/orange channel split */}
        <filter
          id={filterId}
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feOffset in="SourceGraphic" dx="-0.3" dy="0.15" result="r_shift" />
          <feColorMatrix
            in="r_shift"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="r_ch"
          />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 0.3 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="g_ch"
          />
          <feOffset in="SourceGraphic" dx="0.3" dy="-0.15" result="o_shift" />
          <feColorMatrix
            in="o_shift"
            type="matrix"
            values="0.8 0 0 0 0  0.2 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="o_ch"
          />
          <feBlend in="r_ch" in2="g_ch" mode="screen" result="rg" />
          <feBlend in="rg" in2="o_ch" mode="screen" result="rgb" />
          <feGaussianBlur in="rgb" stdDeviation="0.25" result="soft" />
          <feMerge>
            <feMergeNode in="soft" />
            <feMergeNode in="rgb" />
          </feMerge>
        </filter>

        {/* Neon glow — red/orange emission */}
        <filter
          id={neonId}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="6"
            result="blur_outer"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="3"
            result="blur_mid"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="1"
            result="blur_inner"
          />
          <feComponentTransfer in="blur_outer" result="bright_outer">
            <feFuncR type="linear" slope="3" />
            <feFuncG type="linear" slope="0.3" />
            <feFuncB type="linear" slope="0" />
          </feComponentTransfer>
          <feComponentTransfer in="blur_mid" result="bright_mid">
            <feFuncR type="linear" slope="4" />
            <feFuncG type="linear" slope="0.4" />
            <feFuncB type="linear" slope="0" />
          </feComponentTransfer>
          <feComponentTransfer in="blur_inner" result="bright_inner">
            <feFuncR type="linear" slope="5" />
            <feFuncG type="linear" slope="0.5" />
            <feFuncB type="linear" slope="0" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="bright_outer" />
            <feMergeNode in="bright_mid" />
            <feMergeNode in="bright_inner" />
          </feMerge>
        </filter>

        {/* Red → deep crimson gradient */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="30%" stopColor="#ff3300" />
          <stop offset="60%" stopColor="#cc0000" />
          <stop offset="100%" stopColor="#ff1a1a" />
        </linearGradient>
      </defs>

      {/* Neon glow bloom */}
      <polygon
        points={points}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="0.5"
        filter={`url(#${neonId})`}
        opacity="0.9"
        className="chroma-animate"
      />

      {/* Chromatic layer: dark fill + prismatic red edge */}
      <g filter={`url(#${filterId})`} className="chroma-animate">
        <polygon points={points} fill="#0a0000" />
        <polygon
          points={points}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="0.5"
        />
      </g>

      {/* Razor bright highlight */}
      <polygon
        points={points}
        fill="none"
        stroke="rgba(255,200,200,0.95)"
        strokeWidth="0.15"
      />
    </svg>
  );
}
