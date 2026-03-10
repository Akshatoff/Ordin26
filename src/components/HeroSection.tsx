import Galaxy from "./Galaxy";
export default function HeroSection() {
  return (
    // 1. Moved h-screen and bg-black to the parent container
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Galaxy
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={1}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
      />
    </div>
  );
}
