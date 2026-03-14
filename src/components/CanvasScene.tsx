import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Center } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import gsap from "gsap";

function TridentModel() {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);

  // Create a ref to store our raw mouse coordinates globally
  const mouse = useRef({ x: 0, y: 0 });

  const { scene } = useGLTF("/db/danda.glb");

  // --- GSAP SCROLL LOGIC ---
  useEffect(() => {
    if (!outerGroupRef.current) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    scrollTl.to(outerGroupRef.current.rotation, {
      y: Math.PI * 4,
      ease: "none",
    });

    const handlePillarChange = (e: any) => {
      const index = e.detail?.index;
      if (index === undefined) return;

      scrollTl.pause();

      gsap.to(outerGroupRef.current!.rotation, {
        y: index * (Math.PI / 2),
        duration: 1,
        ease: "power3.out",
        onComplete: () => scrollTl.resume(),
      });

      gsap.fromTo(
        outerGroupRef.current!.scale,
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

  // --- GLOBAL MOUSE TRACKER ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to +1 (mimicking R3F's state.pointer)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- 3D ANIMATION LOOP ---
  useFrame(() => {
    if (!innerGroupRef.current) return;

    // Grab the custom mouse values instead of state.pointer
    const { x, y } = mouse.current;

    const targetRotationX = (y * Math.PI) / 8;
    const targetRotationY = (x * Math.PI) / 8;
    const targetPositionX = x * 0.5;
    const targetPositionY = y * 0.5;

    innerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      innerGroupRef.current.rotation.x,
      targetRotationX,
      0.05,
    );
    innerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      innerGroupRef.current.rotation.y,
      targetRotationY,
      0.05,
    );

    innerGroupRef.current.position.x = THREE.MathUtils.lerp(
      innerGroupRef.current.position.x,
      targetPositionX,
      0.05,
    );
    innerGroupRef.current.position.y = THREE.MathUtils.lerp(
      innerGroupRef.current.position.y,
      targetPositionY,
      0.05,
    );
  });

  return (
    <group
      ref={outerGroupRef}
      scale={[0.2, 0.2, 0.2]}
      position={[0, 0, 0]}
      rotation={[0, 2, Math.PI / 2.2]}
    >
      <group ref={innerGroupRef}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
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
