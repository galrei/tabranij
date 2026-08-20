import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Grid,
  Html,
  Lightformer,
  Line,
  OrbitControls,
  Sparkles,
  Text,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ANATOMY_BY_ID, pricesToLayout, type PartId } from "@/lib/anatomy";
import { buildCrystalGeometry } from "@/lib/crystal-geometry";
import { useTabranij } from "@/lib/tabranij-store";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

export default function CrystalCanvas() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <div className="absolute inset-0 touch-none">
      <Canvas
        camera={{ position: [0.1, 0.2, 8.3], fov: 36, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060d"]} />
        <fog attach="fog" args={["#05060d", 14, 32]} />
        <Scene isMobile={isMobile} reduced={reduced} />
        <Controls reduced={reduced} />
      </Canvas>
    </div>
  );
}

function Controls({ reduced }: { reduced: boolean }) {
  const ref = useRef<null | { reset: () => void }>(null);
  const token = useTabranij((s) => s.resetViewToken);
  const autoRotate = useTabranij((s) => s.autoRotate);
  const setAutoRotate = useTabranij((s) => s.setAutoRotate);

  useEffect(() => {
    ref.current?.reset();
  }, [token]);

  return (
    <OrbitControls
      ref={ref as never}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={4.2}
      maxDistance={14}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.82}
      autoRotate={autoRotate && !reduced}
      autoRotateSpeed={0.5}
      onStart={() => setAutoRotate(false)}
    />
  );
}

function Scene({
  isMobile,
  reduced,
}: {
  isMobile: boolean;
  reduced: boolean;
}) {
  const prices = useTabranij((s) => s.prices);
  const layout = useMemo(() => pricesToLayout(prices), [prices]);

  return (
    <>
      <hemisphereLight args={["#c5ddff", "#070910", 0.32]} />
      <ambientLight intensity={0.12} />
      <spotLight
        position={[5.5, 7, 5]}
        intensity={48}
        angle={0.55}
        penumbra={0.7}
        color="#9ed8ff"
      />
      <spotLight
        position={[-5, 1.5, 4]}
        intensity={22}
        angle={0.7}
        penumbra={0.8}
        color="#7a93ff"
      />
      <pointLight position={[0, layout.yNeto, 0]} intensity={6} color="#4ec8ff" distance={5} />

      <Environment resolution={256} environmentIntensity={0.5}>
        <Lightformer
          intensity={2.2}
          position={[5, 6, 4]}
          scale={[7, 1.4, 1]}
          color="#9ed8ff"
        />
        <Lightformer
          intensity={1.4}
          position={[-5, 2, 3]}
          scale={[5, 2, 1]}
          color="#7a93ff"
        />
        <Lightformer
          intensity={1.1}
          position={[0, -4, 2]}
          scale={[6, 1, 1]}
          color="#4ec8ff"
        />
        <Lightformer
          intensity={0.9}
          position={[2, 1, -6]}
          scale={4}
          color="#d7ecff"
        />
      </Environment>

      <CrystalBody layout={layout} />
      <Wicks layout={layout} />
      <Core layout={layout} />
      <Markers layout={layout} />
      <JulatBracket layout={layout} />
      <Callouts layout={layout} />
      <NetoGlyph layout={layout} />
      {!isMobile && <Labels layout={layout} compact={false} />}
      {isMobile && <Labels layout={layout} compact />}

      <Sparkles
        count={isMobile ? 18 : 36}
        scale={[7, 9, 6]}
        size={1.6}
        speed={reduced ? 0 : 0.28}
        color="#7ec8ff"
        opacity={0.35}
      />

      <Grid
        position={[0, layout.yLow - 0.42, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.35}
        cellColor="#152038"
        sectionSize={2}
        sectionThickness={0.7}
        sectionColor="#1e3358"
        fadeDistance={16}
        fadeStrength={1.3}
        infiniteGrid
      />
      <Grid
        position={[0, 0.2, -5.2]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.28}
        cellColor="#101828"
        sectionSize={2}
        sectionThickness={0.55}
        sectionColor="#18243c"
        fadeDistance={18}
        fadeStrength={1.4}
        infiniteGrid
      />
      <ContactShadows
        position={[0, layout.yLow - 0.4, 0]}
        opacity={0.32}
        scale={9}
        blur={2.6}
        far={6}
        color="#03040a"
      />

      {!reduced && !isMobile && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={0.42}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.38}
            mipmapBlur
          />
          <Vignette darkness={0.52} offset={0.3} />
        </EffectComposer>
      )}
    </>
  );
}

type Layout = ReturnType<typeof pricesToLayout>;

function CrystalBody({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  const geo = useMemo(
    () =>
      buildCrystalGeometry({
        radius: layout.radius,
        bodyHeight: layout.bodyH,
        tipHeight: layout.tipH,
      }),
    [layout.radius, layout.bodyH, layout.tipH],
  );

  useEffect(() => () => geo.dispose(), [geo]);

  const active = selected === "neto" || selected === "atas" || selected === "bawah";

  return (
    <mesh position={[0, layout.crystalY, 0]} geometry={geo}>
      <meshPhysicalMaterial
        color={layout.bullish ? "#d2f1ff" : "#ffe4ec"}
        roughness={0.07}
        metalness={0.04}
        transmission={0.86}
        thickness={1.4}
        ior={1.52}
        clearcoat={1}
        clearcoatRoughness={0.06}
        iridescence={0.65}
        iridescenceIOR={1.22}
        iridescenceThicknessRange={[140, 420]}
        attenuationColor={layout.bullish ? "#3d6ec8" : "#8a3d5a"}
        attenuationDistance={0.95}
        transparent
        envMapIntensity={1.35}
        emissive={active ? "#4ec8ff" : "#071018"}
        emissiveIntensity={active ? 0.22 : 0.03}
      />
    </mesh>
  );
}

function Wicks({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  const apexY = layout.crystalY + layout.bodyH / 2 + layout.tipH;
  const nadirY = layout.crystalY - layout.bodyH / 2 - layout.tipH;
  return (
    <>
      <Wick
        from={apexY}
        to={layout.yHigh}
        active={selected === "tinggi" || selected === "julat"}
      />
      <Wick
        from={nadirY}
        to={layout.yLow}
        active={selected === "rendah" || selected === "julat"}
      />
    </>
  );
}

function Wick({
  from,
  to,
  active,
}: {
  from: number;
  to: number;
  active: boolean;
}) {
  const h = Math.abs(to - from);
  if (h < 0.03) return null;
  return (
    <mesh position={[0, (from + to) / 2, 0]}>
      <cylinderGeometry args={[0.016, 0.016, h, 8]} />
      <meshStandardMaterial
        color={active ? "#e8eefc" : "#9bb8d8"}
        emissive={active ? "#4ec8ff" : "#1a3050"}
        emissiveIntensity={active ? 1.15 : 0.28}
        metalness={0.55}
        roughness={0.28}
      />
    </mesh>
  );
}

function Core({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  const ref = useRef<THREE.Mesh>(null);
  const active = selected === "inti";
  const color = layout.bullish ? "#2ee6a8" : "#ff5a3c";

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.4;
    const pulse = active
      ? 1.1 + Math.sin(state.clock.elapsedTime * 3.2) * 0.08
      : 1;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={[0, layout.yInti, 0]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={active ? 1.7 : 0.65}
        roughness={0.28}
        metalness={0.35}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

function Markers({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  return (
    <>
      <GlowOrb
        y={layout.yHigh}
        color="#3b9eff"
        active={selected === "tinggi" || selected === "julat"}
      />
      <GlowOrb
        y={layout.yLow}
        color="#ff5a3c"
        active={selected === "rendah" || selected === "julat"}
      />
      <BodyTick
        y={layout.yBodyTop}
        color="#dce7ff"
        active={selected === "atas"}
      />
      <BodyTick
        y={layout.yBodyBot}
        color="#9aa8c7"
        active={selected === "bawah"}
      />
      <BodyTick
        y={layout.yAwal}
        color="#2ee6a8"
        active={selected === "awal"}
      />
      <BodyTick
        y={layout.yInti}
        color="#6d8cff"
        active={selected === "inti"}
      />
    </>
  );
}

function GlowOrb({
  y,
  color,
  active,
}: {
  y: number;
  color: string;
  active: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = active
      ? 1.18 + Math.sin(state.clock.elapsedTime * 3.4) * 0.1
      : 1;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={[0, y, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 2.1 : 1.15}
          roughness={0.25}
        />
      </mesh>
      <pointLight color={color} intensity={active ? 5 : 2} distance={3.2} />
    </group>
  );
}

function BodyTick({
  y,
  color,
  active,
}: {
  y: number;
  color: string;
  active: boolean;
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.96, active ? 0.018 : 0.01, 8, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={active ? 0.9 : 0.22}
      />
    </mesh>
  );
}

function JulatBracket({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  const active = selected === "julat";
  const x = -1.72;
  const cap = 0.26;
  const color = active ? "#8af0ff" : "#5ce1ff";
  const points: [number, number, number][] = [
    [x + cap, layout.yHigh, 0],
    [x, layout.yHigh, 0],
    [x, layout.yLow, 0],
    [x + cap, layout.yLow, 0],
  ];
  return (
    <group>
      <Line points={points} color={color} lineWidth={active ? 2.6 : 1.8} />
      <Line
        points={points}
        color={color}
        lineWidth={active ? 8 : 5}
        transparent
        opacity={0.14}
      />
    </group>
  );
}

function Callouts({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  const awal: [number, number, number][] = [
    [-2.25, layout.yAwal, 0],
    [-1.08, layout.yAwal, 0],
  ];
  const inti: [number, number, number][] = [
    [1.08, layout.yInti, 0],
    [2.15, layout.yInti, 0],
  ];
  return (
    <group>
      <Line
        points={awal}
        color="#2ee6a8"
        lineWidth={selected === "awal" ? 2.2 : 1.4}
        dashed
        dashSize={0.08}
        gapSize={0.06}
      />
      <ArrowHead
        position={[-1.08, layout.yAwal, 0]}
        dir={[1, 0, 0]}
        color="#2ee6a8"
      />
      <Line
        points={inti}
        color="#6d8cff"
        lineWidth={selected === "inti" ? 2.2 : 1.4}
        dashed
        dashSize={0.08}
        gapSize={0.06}
      />
      <ArrowHead
        position={[2.15, layout.yInti, 0]}
        dir={[1, 0, 0]}
        color="#6d8cff"
      />
    </group>
  );
}

function ArrowHead({
  position,
  dir,
  color,
}: {
  position: [number, number, number];
  dir: [number, number, number];
  color: string;
}) {
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(...dir).normalize(),
    );
    return q;
  }, [dir]);
  return (
    <mesh position={position} quaternion={quat}>
      <coneGeometry args={[0.05, 0.13, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function NetoGlyph({ layout }: { layout: Layout }) {
  const selected = useTabranij((s) => s.selected);
  const active = selected === "neto";
  const color = active ? "#ffffff" : "#e8eefc";
  const scale = Math.min(1, Math.max(0.32, layout.bodyH / 1.7));
  return (
    <group position={[0, layout.yNeto, 0]} scale={scale}>
      <Text
        position={[0, 0.12, 0.04]}
        fontSize={0.46}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#041018"
      >
        N
      </Text>
      <Text
        position={[0, -0.28, 0.04]}
        fontSize={0.13}
        color={color}
        letterSpacing={0.16}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.006}
        outlineColor="#041018"
      >
        NETO
      </Text>
      <Text
        position={[0, 0.12, -0.04]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.46}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#041018"
      >
        N
      </Text>
      <Text
        position={[0, -0.28, -0.04]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.13}
        color={color}
        letterSpacing={0.16}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.006}
        outlineColor="#041018"
      >
        NETO
      </Text>
    </group>
  );
}

function Labels({
  layout,
  compact,
}: {
  layout: Layout;
  compact: boolean;
}) {
  const items: { id: PartId; pos: [number, number, number] }[] = [
    { id: "tinggi", pos: [0.95, layout.yHigh, 0] },
    { id: "atas", pos: [1.25, layout.yBodyTop + layout.tipH * 0.45, 0] },
    { id: "inti", pos: [2.45, layout.yInti, 0] },
    { id: "bawah", pos: [1.15, layout.yBodyBot - layout.tipH * 0.15, 0] },
    { id: "rendah", pos: [1.05, layout.yLow, 0] },
    { id: "awal", pos: [-2.55, layout.yAwal, 0] },
    { id: "julat", pos: [-2.35, layout.yJulat, 0] },
  ];

  return (
    <group>
      {items.map((item) => (
        <CrystalLabel
          key={item.id}
          id={item.id}
          position={item.pos}
          compact={compact}
        />
      ))}
    </group>
  );
}

function CrystalLabel({
  id,
  position,
  compact,
}: {
  id: PartId;
  position: [number, number, number];
  compact: boolean;
}) {
  const part = ANATOMY_BY_ID[id];
  const selected = useTabranij((s) => s.selected);
  const select = useTabranij((s) => s.select);
  const setHovered = useTabranij((s) => s.setHovered);
  const active = selected === id;

  return (
    <Html
      position={position}
      center
      sprite
      distanceFactor={compact ? 10 : 11.5}
      zIndexRange={[50, 0]}
      className="crystal-html"
    >
      <button
        type="button"
        onClick={() => select(id)}
        onPointerEnter={() => setHovered(id)}
        onPointerLeave={() => setHovered(null)}
        className={cn(
          "flex items-baseline gap-1.5 rounded-full px-2.5 py-1",
          "bg-bg/80 shadow-[var(--shadow-border)]",
          "transition-opacity duration-150",
          active ? "opacity-100" : "opacity-70 hover:opacity-100",
        )}
      >
        <span
          className="font-display text-base font-semibold leading-none"
          style={{ color: part.color }}
        >
          {part.letter}
        </span>
        {!compact && (
          <span className="font-display text-xs tracking-[0.16em] text-fg uppercase">
            {part.name}
          </span>
        )}
      </button>
    </Html>
  );
}
