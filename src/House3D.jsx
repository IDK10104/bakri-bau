import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Grid } from '@react-three/drei'
import * as THREE from 'three'

const SLATE = '#3B4A5E'
const SLATE_DARK = '#1E293B'
const ROOF = '#222B38'
const YELLOW = '#FACC15'

function easeOutBack(x) {
  const c1 = 1.70158, c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
const easeOut = (x) => 1 - Math.pow(1 - x, 3)
const clamp01 = (x) => Math.min(1, Math.max(0, x))

/* camera pulls back as the build progresses */
const CAM_FROM = new THREE.Vector3(3.2, 1.7, 3.6)
const CAM_TO = new THREE.Vector3(6.6, 4.2, 7.4)
const LOOK = new THREE.Vector3(0, 0.7, 0)
function CameraRig({ progressRef }) {
  useFrame((state) => {
    const e = easeOut(clamp01(progressRef.current))
    state.camera.position.lerpVectors(CAM_FROM, CAM_TO, e)
    state.camera.lookAt(LOOK)
  })
  return null
}

/* A part that rises + scales into place over its [delay, delay+dur] slice of build progress (0..1) */
function Part({ progressRef, delay, dur, targetY, children }) {
  const ref = useRef()
  useFrame(() => {
    const p = clamp01((progressRef.current - delay) / dur)
    if (!ref.current) return
    ref.current.position.y = THREE.MathUtils.lerp(targetY - 1.6, targetY, easeOut(p))
    ref.current.scale.setScalar(Math.max(0.0001, easeOutBack(p)))
    ref.current.visible = p > 0.001
  })
  return <group ref={ref}>{children}</group>
}

function Box({ args, color = SLATE, edges = true, emissive, edgeColor = YELLOW }) {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.62}
        emissive={emissive || '#000000'}
        emissiveIntensity={emissive ? 0.95 : 0}
      />
      {edges && <Edges threshold={15} color={edgeColor} />}
    </mesh>
  )
}

function House({ progressRef, reducedMotion }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const p = progressRef.current
    // rotation = base + gentle time idle + scroll-driven turn
    const idle = reducedMotion ? 0 : state.clock.elapsedTime * 0.12
    groupRef.current.rotation.y = -0.45 + idle + p * 0.9
  })

  // gable roof = extruded triangular prism
  const roofGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-1.7, 0); s.lineTo(1.7, 0); s.lineTo(0, 1.05); s.lineTo(-1.7, 0)
    const g = new THREE.ExtrudeGeometry(s, { depth: 2.1, bevelEnabled: false })
    g.translate(0, 0, -1.05)
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group ref={groupRef} position={[0, -0.7, 0]} rotation={[0, -0.45, 0]}>
      {/* Foundation slab */}
      <Part progressRef={progressRef} delay={0.0} dur={0.18} targetY={0.18}>
        <Box args={[3.4, 0.36, 2.5]} color={SLATE_DARK} />
      </Part>

      {/* Walls */}
      <Part progressRef={progressRef} delay={0.18} dur={0.22} targetY={1.15}>
        <Box args={[2.9, 1.6, 2.0]} color={SLATE} />
      </Part>

      {/* Door */}
      <Part progressRef={progressRef} delay={0.40} dur={0.12} targetY={0.8}>
        <group position={[0, 0, 1.03]}>
          <Box args={[0.55, 1.0, 0.1]} color={SLATE_DARK} edges={false} />
        </group>
      </Part>

      {/* Windows (glow) */}
      <Part progressRef={progressRef} delay={0.48} dur={0.14} targetY={1.28}>
        <group position={[-0.85, 0, 1.03]}>
          <Box args={[0.5, 0.5, 0.1]} color={YELLOW} edges={false} emissive={YELLOW} />
        </group>
      </Part>
      <Part progressRef={progressRef} delay={0.54} dur={0.14} targetY={1.28}>
        <group position={[0.85, 0, 1.03]}>
          <Box args={[0.5, 0.5, 0.1]} color={YELLOW} edges={false} emissive={YELLOW} />
        </group>
      </Part>

      {/* Roof */}
      <Part progressRef={progressRef} delay={0.64} dur={0.24} targetY={1.95}>
        <mesh geometry={roofGeo} castShadow>
          <meshStandardMaterial color={ROOF} metalness={0.25} roughness={0.55} />
          <Edges threshold={15} color={YELLOW} />
        </mesh>
      </Part>

      {/* Chimney */}
      <Part progressRef={progressRef} delay={0.86} dur={0.14} targetY={2.6}>
        <group position={[0.9, 0, 0.2]}>
          <Box args={[0.32, 0.7, 0.32]} color={SLATE_DARK} />
        </group>
      </Part>
    </group>
  )
}

export default function House3D({ progressRef, reducedMotion = false }) {
  // fallback ref if none provided (fully built)
  const fallback = useRef(1)
  const pRef = progressRef || fallback

  return (
    <Canvas
      camera={{ position: [3.2, 1.7, 3.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 4]} intensity={1.3} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.45} color={YELLOW} />

      <CameraRig progressRef={pRef} />
      <House progressRef={pRef} reducedMotion={reducedMotion} />

      <Grid
        position={[0, -0.72, 0]}
        args={[26, 26]}
        cellSize={0.6}
        cellThickness={0.55}
        cellColor="#475569"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#64748B"
        fadeDistance={22}
        fadeStrength={1.6}
        infiniteGrid
      />
    </Canvas>
  )
}
