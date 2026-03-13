import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, Center, OrbitControls } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { Group } from "three";
import gsap from "gsap";

function TridentModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/db/danda.glb");

  useEffect(() => {
    if (!groupRef.current) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    scrollTl.to(groupRef.current.rotation, {
      y: Math.PI * 4,
      ease: "none",
    });

    const handlePillarChange = (e: any) => {
      const index = e.detail?.index;
      if (index === undefined) return;

      scrollTl.pause();

      gsap.to(groupRef.current!.rotation, {
        y: index * (Math.PI / 2),
        duration: 1,
        ease: "power3.out",
        onComplete: () => scrollTl.resume(),
      });

      // FIX: Changed from 0.9 -> 1.0 to 0.18 -> 0.2
      gsap.fromTo(
        groupRef.current!.scale,
        { x: 0.18, y: 0.18, z: 0.18 },
        { x: 0.2, y: 0.2, z: 0.2, duration: 1, ease: "elastic.out(1, 0.3)" },
      );
    };

    window.addEventListener("changePillar", handlePillarChange);
    return () => {
      window.removeEventListener("changePillar", handlePillarChange);
      scrollTl.kill();
    };
  }, []);

  return (
    <group
      ref={groupRef}
      scale={[0.2, 0.2, 0.2]} // This base scale now matches the GSAP end state
      position={[0, 0, 0]}
      rotation={[0, 2, Math.PI / 2.2]}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/db/danda.glb");

export default function CanvasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      <Suspense fallback={null}>
        <TridentModel />
      </Suspense>

      <Environment preset="city" />
    </Canvas>
  );
}
