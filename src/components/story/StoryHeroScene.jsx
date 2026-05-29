import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const buildNetwork = () => {
  const columns = 7
  const rows = 5
  const nodes = []
  const linePositions = []

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column - (columns - 1) / 2) * 0.62
      const y = (row - (rows - 1) / 2) * 0.46
      const z = Math.sin(column * 0.65 + row * 0.45) * 0.16
      nodes.push([x, y, z])
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column
      const current = nodes[index]

      if (column < columns - 1) {
        const right = nodes[index + 1]
        linePositions.push(...current, ...right)
      }

      if (row < rows - 1) {
        const below = nodes[index + columns]
        linePositions.push(...current, ...below)
      }
    }
  }

  return {
    nodePositions: new Float32Array(nodes.flat()),
    linePositions: new Float32Array(linePositions),
  }
}

const HeroNetwork = () => {
  const groupRef = useRef(null)
  const { nodePositions, linePositions } = useMemo(() => buildNetwork(), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.18,
      3.5,
      delta
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.1,
      3.5,
      delta
    )
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.06
  })

  return (
    <group ref={groupRef} position={[1.7, 0.02, -0.45]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7CC7FF" transparent opacity={0.08} />
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
        <pointsMaterial color="#F3F7FB" size={0.04} transparent opacity={0.22} />
      </points>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.25, -1.35, -0.15]}>
        <planeGeometry args={[7.6, 4.8, 10, 10]} />
        <meshBasicMaterial wireframe color="#7CC7FF" transparent opacity={0.025} />
      </mesh>
    </group>
  )
}

const StoryHeroScene = () => (
  <div className="absolute inset-0 hidden lg:block">
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.18} />
      <pointLight position={[2.8, 1.8, 4]} intensity={0.22} color="#7CC7FF" />
      <HeroNetwork />
    </Canvas>
  </div>
)

export default StoryHeroScene
