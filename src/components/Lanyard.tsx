/* eslint-disable react/no-unknown-property */

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef, useState, useMemo } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
  useGLTF,
  Environment,
  Lightformer,
  Clone,
  Center,
} from "@react-three/drei";

import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";

import * as THREE from "three";

// Replace with your own imports

import cardGLB from "/cat_keychain.glb?url";

import chainGLB from "/iron_chain.glb?url";

interface LanyardProps {
  position?: [number, number, number];

  gravity?: [number, number, number];

  fov?: number;

  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],

  gravity = [0, -40, 0],

  fov = 20,

  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />

        <Physics
          gravity={gravity}
          timeStep={isMobile ? 1 / 30 : 1 / 60}
          numSolverIterations={50}
        >
          <Chain />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Chain() {
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const j4 = useRef<any>(null);
  const j5 = useRef<any>(null);
  const j6 = useRef<any>(null);
  const card = useRef<any>(null);
  const { pointer, camera } = useThree();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const euler = new THREE.Euler();
  const quat = new THREE.Quaternion();

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { scene } = useGLTF(cardGLB) as any;
  const { scene: chainLinkScene } = useGLTF(chainGLB) as any;

  // We replaced 'dragged' with 'followOffset' to handle the hover tracking
  const [followOffset, setFollowOffset] = useState<false | THREE.Vector3>(
    false,
  );
  const [hovered, setHovered] = useState(false);

  // ==========================================
  const LINK_GAP = 0.35;
  // ==========================================

  const START_HEIGHT = 3.4;
  const HALF = LINK_GAP / 2;
  const CAT_ANCHOR_Y = 0.5;
  const CAT_CENTER_SHIFT_Y = -1.2;

  const posJ1 = -HALF;
  const posJ2 = posJ1 - LINK_GAP;
  const posJ3 = posJ2 - LINK_GAP;
  const posJ4 = posJ3 - LINK_GAP;
  const posJ5 = posJ4 - LINK_GAP;
  const posJ6 = posJ5 - LINK_GAP;
  const posCard = posJ6 - HALF - CAT_ANCHOR_Y;

  const maxChainLength = Math.abs(posCard) * 0.9;

  useSphericalJoint(fixed, j1, [
    [0, 0, 0],
    [0, HALF, 0],
  ]);
  useSphericalJoint(j1, j2, [
    [0, -HALF, 0],
    [0, HALF, 0],
  ]);
  useSphericalJoint(j2, j3, [
    [0, -HALF, 0],
    [0, HALF, 0],
  ]);
  useSphericalJoint(j3, j4, [
    [0, -HALF, 0],
    [0, HALF, 0],
  ]);
  useSphericalJoint(j4, j5, [
    [0, -HALF, 0],
    [0, HALF, 0],
  ]);
  useSphericalJoint(j5, j6, [
    [0, -HALF, 0],
    [0, HALF, 0],
  ]);
  useSphericalJoint(j6, card, [
    [0, -HALF, 0],
    [0, CAT_ANCHOR_Y, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "move"; // Shows the user it can be moved
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered]);

  return (
    <group position={[0, START_HEIGHT, 0]}>
      <RigidBody ref={fixed} {...segmentProps} type="fixed" />

      {/* Link 1 */}
      <RigidBody position={[0, posJ1, 0]} ref={j1} {...segmentProps}>
        <BallCollider args={[0.05]} position={[0, HALF, 0]} mass={5} />
        <BallCollider args={[0.05]} position={[0, -HALF, 0]} mass={5} />
        <Center>
          <Clone object={chainLinkScene} />
        </Center>
      </RigidBody>

      {/* Link 2 */}
      <RigidBody position={[0, posJ2, 0]} ref={j2} {...segmentProps}>
        <BallCollider args={[0.05]} position={[0, HALF, 0]} mass={5} />
        <BallCollider args={[0.05]} position={[0, -HALF, 0]} mass={5} />
        <group rotation={[0, Math.PI / 2, 0]}>
          <Center>
            <Clone object={chainLinkScene} />
          </Center>
        </group>
      </RigidBody>

      {/* Link 3 */}
      <RigidBody position={[0, posJ3, 0]} ref={j3} {...segmentProps}>
        <BallCollider args={[0.05]} position={[0, HALF, 0]} mass={5} />
        <BallCollider args={[0.05]} position={[0, -HALF, 0]} mass={5} />
        <Center>
          <Clone object={chainLinkScene} />
        </Center>
      </RigidBody>

      {/* Link 4 */}
      <RigidBody position={[0, posJ4, 0]} ref={j4} {...segmentProps}>
        <BallCollider args={[0.05]} position={[0, HALF, 0]} mass={5} />
        <BallCollider args={[0.05]} position={[0, -HALF, 0]} mass={5} />
        <group rotation={[0, Math.PI / 2, 0]}>
          <Center>
            <Clone object={chainLinkScene} />
          </Center>
        </group>
      </RigidBody>

      {/* Link 5 */}
      <RigidBody position={[0, posJ5, 0]} ref={j5} {...segmentProps}>
        <BallCollider args={[0.05]} position={[0, HALF, 0]} mass={5} />
        <BallCollider args={[0.05]} position={[0, -HALF, 0]} mass={5} />
        <Center>
          <Clone object={chainLinkScene} />
        </Center>
      </RigidBody>

      {/* Link 6 */}
      <RigidBody position={[0, posJ6, 0]} ref={j6} {...segmentProps}>
        <BallCollider args={[0.05]} position={[0, HALF, 0]} mass={5} />
        <BallCollider args={[0.05]} position={[0, -HALF, 0]} mass={5} />
        <group rotation={[0, Math.PI / 2, 0]}>
          <Center>
            <Clone object={chainLinkScene} />
          </Center>
        </group>
      </RigidBody>

      {/* Cat Card */}
      <RigidBody
        position={[0, posCard, 0]}
        ref={card}
        {...segmentProps}
        type="dynamic" // ALWAYS dynamic now!
        linearDamping={0.8} // Adds slight air resistance so it doesn't swing forever
        angularDamping={0.8}
      >
        <CuboidCollider
          args={[0.8, 1.125, 0.01]}
          position={[0, CAT_CENTER_SHIFT_Y, 0]}
          mass={2} // A lighter mass makes it easier to swat
        />
        <group scale={2.25} position={[0, CAT_CENTER_SHIFT_Y, -0.05]}>
          {/* 🛡️ THE SWAT HITBOX */}
          <mesh
            // Make the hitbox slightly thicker to catch fast mouse swipes
            scale={[1, 1, 3]}
            onPointerMove={(e: any) => {
              e.stopPropagation();
              if (card.current) {
                // 1. Calculate swipe speed based on mouse movement delta
                // Scale these down so the force isn't explosive. Tweak this number!
                const forceScale = 0.02;

                // Screen X is right, Screen Y is down. (3D Y is up, so we invert Y)
                const moveX = e.movementX * forceScale;
                const moveY = -e.movementY * forceScale;

                // 2. Add a tiny push backward into the screen based on overall swipe speed
                const moveZ = (Math.abs(moveX) + Math.abs(moveY)) * -0.5;

                // 3. Create the force vector
                const impulse = { x: moveX, y: moveY, z: moveZ };

                // 4. Apply the force exactly where the mouse touched the model!
                card.current.applyImpulseAtPoint(impulse, e.point, true);
              }
            }}
          >
            <boxGeometry args={[0.8, 1.2, 0.2]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* 🐈 VISIBLE CAT MODEL */}
          <primitive object={scene} />
        </group>
      </RigidBody>
    </group>
  );
}
