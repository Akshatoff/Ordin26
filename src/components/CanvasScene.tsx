import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Center } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TridentModel() {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);

  // Create a ref to store our raw mouse coordinates globally
  const mouse = useRef({ x: 0, y: 0 });

  const { scene } = useGLTF("/db/danda.glb");

  // --- GSAP SCROLL LOGIC ---
  useEffect(() => {
    if (!outerGroupRef.current) return;

    // 1. ENTRY ROTATION (Optional: You can keep this or remove if you only want slider rotation)
    // This assumes you want a spin before hitting the slider.

    // 2. EXIT ANIMATION: Glues the Trident to the previous section!
    // As the Ingredients section scrolls up, we push the model UP out of the camera.
    gsap.to(outerGroupRef.current.position, {
      y: 8, // Moves it high up out of camera view (adjust between 6-10 if needed)
      ease: "none",
      scrollTrigger: {
        trigger: "#ingredients-section",
        start: "top bottom", // Starts exactly when the Grid section enters the bottom of the screen
        end: "top top", // Ends exactly when the Grid section hits the top of the screen
        scrub: true, // Ties it perfectly to your scroll speed
      },
    });

    // 3. SLIDER LOGIC: Snaps to angles during the 4 slides
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePillarChange = (e: any) => {
      const index = e.detail?.index;
      if (index === undefined) return;

      gsap.to(outerGroupRef.current!.rotation, {
        y: index * (Math.PI / 2),
        duration: 1,
        ease: "power3.out",
        overwrite: "auto", // Prevents jitter by killing conflicts
      });
    };

    window.addEventListener("changePillar", handlePillarChange);
    return () => {
      window.removeEventListener("changePillar", handlePillarChange);
    };
  }, []);

  // --- GLOBAL MOUSE TRACKER ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- 3D ANIMATION LOOP ---
  useFrame(() => {
    if (!innerGroupRef.current) return;

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
