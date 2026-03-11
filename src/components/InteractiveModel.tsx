import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function InteractiveModel() {
  const { scene, nodes } = useGLTF("/db/db2024.gltf");
  const headRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    // Replace "PUT_THE_NAME_HERE" with the exact bone name you found!
    const targetNodeName = "mixamorigNeck";
    const targetNode = scene.getObjectByName(targetNodeName);

    if (targetNode && targetNode.type === "Bone") {
      headRef.current = targetNode;
    }
  }, [scene, nodes]);

  useFrame((state) => {
    if (headRef.current) {
      // --- ANGLE LIMITS CONFIGURATION (in Radians) ---
      // Math.PI / 4 = 45 degrees | Math.PI / 8 = 22.5 degrees
      const maxLookUp = Math.PI / 8; // Cap looking up (prevents broken neck)
      const maxLookDown = Math.PI / 6; // Cap looking down
      const maxLookLeftRight = Math.PI / 4; // Cap looking sideways

      // 1. Get raw mouse input (-1 to +1) and amplify it slightly
      const rawTargetY = state.pointer.x * Math.PI;
      const rawTargetX = state.pointer.y * Math.PI;

      // 2. Clamp the values to our strict limits
      // Note: In Three.js, depending on the model's rigging, looking up might be negative or positive X.
      // If looking up is currently inverted, swap the minus signs in the clamp!
      const clampedTargetY = THREE.MathUtils.clamp(
        rawTargetY,
        -maxLookLeftRight,
        maxLookLeftRight,
      );
      const clampedTargetX = THREE.MathUtils.clamp(
        -rawTargetX,
        -maxLookUp,
        maxLookDown,
      );

      // 3. Apply the smooth rotation (lerp)
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        clampedTargetY,
        0.1,
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        clampedTargetX,
        0.1,
      );
    }
  });

  return (
    <group position={[0, -7.5, 0]} scale={0.6}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/db/db2024.gltf");
