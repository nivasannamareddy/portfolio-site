import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ForecastScene = () => {
  const groupRef = useRef(null)
  const points = useMemo(
    () =>
      new Float32Array([
        -1.8, -0.75, 0,
        -1.25, -0.55, 0,
        -0.7, -0.2, 0,
        -0.15, -0.1, 0,
        0.4, 0.28, 0,
        0.95, 0.18, 0,
        1.45, 0.6, 0,
        1.85, 0.45, 0,
      ]),
    []
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      state.pointer.x * 0.06,
      4,
      delta
    )
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
  })

  return (
    <group ref={groupRef}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={points}
            count={points.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7CC7FF" transparent opacity={0.72} />
      </line>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={points}
            count={points.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#F3F7FB" size={0.08} transparent opacity={0.62} />
      </points>
      <mesh position={[0, -0.9, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 2.5, 6, 4]} />
        <meshBasicMaterial wireframe color="#7CC7FF" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

const PipelineScene = () => {
  const groupRef = useRef(null)
  const nodePositions = useMemo(
    () =>
      new Float32Array([
        -1.6, 0.55, 0,
        -0.7, 0.15, 0.1,
        0.15, 0.45, -0.05,
        0.95, -0.15, 0.08,
        1.65, 0.2, 0,
      ]),
    []
  )

  const linePositions = useMemo(
    () =>
      new Float32Array([
        -1.6, 0.55, 0,
        -0.7, 0.15, 0.1,
        -0.7, 0.15, 0.1,
        0.15, 0.45, -0.05,
        0.15, 0.45, -0.05,
        0.95, -0.15, 0.08,
        0.95, -0.15, 0.08,
        1.65, 0.2, 0,
      ]),
    []
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.18,
      4,
      delta
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.08,
      4,
      delta
    )
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7CC7FF" transparent opacity={0.6} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={nodePositions}
            count={nodePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#F3F7FB" size={0.1} transparent opacity={0.58} />
      </points>
    </group>
  )
}

const AnalyticsScene = () => {
  const groupRef = useRef(null)
  const bars = useRef([])

  useFrame((state) => {
    bars.current.forEach((bar, index) => {
      if (!bar) return
      bar.scale.y = 0.82 + Math.sin(state.clock.elapsedTime * 0.8 + index * 0.45) * 0.08
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[-0.05, -0.4, 0]}>
      {[-0.75, -0.25, 0.25, 0.75].map((x, index) => (
        <mesh
          key={x}
          ref={(node) => {
            bars.current[index] = node
          }}
          position={[x, 0.1 + index * 0.15, 0]}
        >
          <boxGeometry args={[0.28, 0.85 + index * 0.28, 0.18]} />
          <meshBasicMaterial color={index === 3 ? '#7CC7FF' : '#F3F7FB'} transparent opacity={0.56} />
        </mesh>
      ))}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([-1.2, -0.75, 0, 1.25, -0.75, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7CC7FF" transparent opacity={0.16} />
      </line>
    </group>
  )
}

const SceneForVariant = ({ variant }) => {
  if (variant === 'forecast') return <ForecastScene />
  if (variant === 'pipeline') return <PipelineScene />
  return <AnalyticsScene />
}

const StoryProjectScene = ({ variant }) => (
  <Canvas
    dpr={[1, 1.4]}
    camera={{ position: [0, 0, 4], fov: 38 }}
    gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
  >
    <ambientLight intensity={0.16} />
    <pointLight position={[2, 2, 3]} intensity={0.18} color="#7CC7FF" />
    <SceneForVariant variant={variant} />
  </Canvas>
)

export default StoryProjectScene
