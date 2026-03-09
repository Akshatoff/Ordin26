// components/AnimatedModel.tsx
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";

interface AnimatedModelProps {
  url: string;
}

export default function AnimatedModel({ url }: AnimatedModelProps) {
  const groupRef = useRef<Group>(null);

  // Load the model and its animations
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Check if there are animations in the GLB
    if (names.length > 0) {
      const actionName = names[0]; // Gets the first animation
      const action = actions[actionName];

      if (action) {
        action.play();
        action.timeScale = 0.1; // Set initial playback speed to 0.5x
      }
    }
  }, [actions, names]);

  const handlePointerOver = () => {
    if (names.length === 0) return;
    const action = actions[names[0]];

    // Use GSAP to smoothly speed up the animation
    if (action) {
      gsap.to(action, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  const handlePointerOut = () => {
    if (names.length === 0) return;
    const action = actions[names[0]];

    // Use GSAP to smoothly slow it back down
    if (action) {
      gsap.to(action, { timeScale: 0.5, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </group>
  );
}

// Preload the model so it's ready immediately
useGLTF.preload("/mech_drone.glb");
