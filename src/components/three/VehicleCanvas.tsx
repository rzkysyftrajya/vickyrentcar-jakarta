import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Html,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type ViewAngle = { azimuth: number; polar: number };

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mesh = child as any;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [cloned]);

  return (
    <Bounds fit clip observe margin={1.15}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </Bounds>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border border-gold/30 border-t-gold" />
        <span className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">Loading</span>
      </div>
    </Html>
  );
}

export default function VehicleCanvas({
  url,
  autoRotate,
  angle,
  resetKey,
}: {
  url: string;
  autoRotate: boolean;
  angle: ViewAngle | null;
  resetKey: number;
}) {
  const controls = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (!controls.current || !angle) return;
    controls.current.setAzimuthalAngle((angle.azimuth * Math.PI) / 180);
    controls.current.setPolarAngle((angle.polar * Math.PI) / 180);
    controls.current.update();
  }, [angle]);

  useEffect(() => {
    if (resetKey === 0) return;
    controls.current?.reset();
  }, [resetKey]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4.5, 1.8, 6], fov: 35 }}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 4]} intensity={1.6} castShadow />
      <directionalLight position={[-6, 4, -6]} intensity={0.6} color="#7fb0ff" />

      <Suspense fallback={<Loader />}>
        <Model url={url} />
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 5, 0]} scale={[12, 6, 1]} />
          <Lightformer
            intensity={1.2}
            color="#d4af37"
            position={[5, 2, 2]}
            rotation-y={-Math.PI / 2}
            scale={[10, 3, 1]}
          />
          <Lightformer
            intensity={0.9}
            color="#7fb0ff"
            position={[-5, 2, -2]}
            rotation-y={Math.PI / 2}
            scale={[10, 3, 1]}
          />
        </Environment>
      </Suspense>

      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.55}
        scale={16}
        blur={2.6}
        far={5}
        color="#000000"
      />

      <OrbitControls
        ref={controls}
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2}
        minDistance={2.5}
        maxDistance={16}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/Alphard.glb");
useGLTF.preload("/models/innova-zenix.glb");
useGLTF.preload("/models/innova-reborn.glb");
useGLTF.preload("/models/hiace-premio.glb");

