import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import Particles from "./Particles";
import InteractiveModel from "./InteractiveModel";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Layer: Galaxy */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Foreground Layer: 3D Model Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Environment preset="city" />

          <Suspense fallback={null}>
            <InteractiveModel />
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.5}
              scale={10}
              blur={2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Layer: Your Text/UI */}
      <div className="absolute inset-0 z-1 flex justify-center pointer-events-none">
        <h1 className="text-white text-center mt-20 text-9xl font-main tracking-widest pointer-events-auto mix-blend-difference">
          ORDIN<br></br>ATRIX
        </h1>
      </div>
    </div>
  );
}
