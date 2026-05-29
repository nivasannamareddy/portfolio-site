import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const emptyRaycast = () => null
const labelTextureCache = new Map()

const nodes = [
  { label: 'Define', subtitle: 'Scope', position: [-3.5, 0.34, 0.56], phase: 0.2 },
  { label: 'Explore', subtitle: 'Data', position: [-1.72, -0.18, -0.28], phase: 0.95 },
  { label: 'Build', subtitle: 'Model', position: [0, 0.26, 0.46], phase: 1.65 },
  { label: 'Deploy', subtitle: 'Ship', position: [1.78, -0.12, -0.22], phase: 2.35 },
  { label: 'Improve', subtitle: 'Loop', position: [3.5, 0.3, 0.52], phase: 3.05 },
]

const connections = nodes.slice(0, -1).map((node, index) => ({
  start: node,
  end: nodes[index + 1],
  offset: index * 0.21,
}))

const createLabelTexture = (label, subtitle, active) => {
  const cacheKey = `${label}-${subtitle}-${active ? 'active' : 'default'}`
  if (labelTextureCache.has(cacheKey)) return labelTextureCache.get(cacheKey)

  const canvas = document.createElement('canvas')
  canvas.width = 720
  canvas.height = 220

  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  context.font = '700 52px "DM Sans", sans-serif'
  context.fillStyle = active ? '#7CC7FF' : '#F3F7FB'
  context.shadowBlur = active ? 18 : 0
  context.shadowColor = 'rgba(124,199,255,0.28)'
  context.fillText(label, canvas.width / 2, 82)

  context.shadowBlur = 0
  context.font = '500 24px "DM Sans", sans-serif'
  context.fillStyle = active ? 'rgba(243,247,251,0.95)' : 'rgba(169,183,200,0.9)'
  context.fillText(subtitle, canvas.width / 2, 136)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  labelTextureCache.set(cacheKey, texture)
  return texture
}

const buildCurve = (start, end, index) => {
  const from = new THREE.Vector3(...start.position)
  const to = new THREE.Vector3(...end.position)
  const mid = new THREE.Vector3(
    (from.x + to.x) / 2,
    (from.y + to.y) / 2 + (index % 2 === 0 ? 0.58 : -0.48),
    (from.z + to.z) / 2 + (index % 2 === 0 ? 0.32 : -0.24)
  )

  return new THREE.CatmullRomCurve3([from, mid, to])
}

const connectionData = connections.map((connection, index) => {
  const curve = buildCurve(connection.start, connection.end, index)
  return {
    curve,
    baseGeometry: new THREE.TubeGeometry(curve, 72, 0.022, 10, false),
    glowGeometry: new THREE.TubeGeometry(curve, 72, 0.046, 12, false),
  }
})

const NodeLabel = ({ texture }) => (
  <sprite raycast={emptyRaycast} position={[0, -0.7, 0]} scale={[1.28, 0.4, 1]}>
    <spriteMaterial attach="material" map={texture} transparent depthWrite={false} />
  </sprite>
)

const PipelineNode = ({ node, index, hoveredIndex, setHoveredIndex }) => {
  const groupRef = useRef(null)
  const glowRef = useRef(null)
  const cardRef = useRef(null)
  const accentRef = useRef(null)
  const labelTexture = useMemo(
    () => createLabelTexture(node.label, node.subtitle, hoveredIndex === index),
    [hoveredIndex, index, node.label, node.subtitle]
  )
  const basePosition = useMemo(() => new THREE.Vector3(...node.position), [node.position])
  const active = hoveredIndex === index
  const dimmed = hoveredIndex !== null && !active

  useFrame((state, delta) => {
    if (!groupRef.current || !glowRef.current || !cardRef.current || !accentRef.current) return

    const floatY = Math.sin(state.clock.elapsedTime * 0.34 + node.phase) * 0.08
    const floatZ = Math.cos(state.clock.elapsedTime * 0.24 + node.phase) * 0.05
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.1 + node.phase) * 0.03

    groupRef.current.position.x = basePosition.x
    groupRef.current.position.y = basePosition.y + floatY
    groupRef.current.position.z = basePosition.z + floatZ

    const targetScale = active ? 1.08 : dimmed ? 0.95 : 1
    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.8, delta)
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4.8, delta)
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4.8, delta)

    const glowScale = (active ? 1.18 : 0.96) * pulse
    glowRef.current.scale.x = THREE.MathUtils.damp(glowRef.current.scale.x, glowScale, 4, delta)
    glowRef.current.scale.y = THREE.MathUtils.damp(glowRef.current.scale.y, glowScale, 4, delta)
    glowRef.current.scale.z = THREE.MathUtils.damp(glowRef.current.scale.z, glowScale, 4, delta)

    const accentDepth = active ? 1.12 : 1
    accentRef.current.scale.x = THREE.MathUtils.damp(accentRef.current.scale.x, accentDepth, 4.6, delta)
    accentRef.current.scale.y = THREE.MathUtils.damp(accentRef.current.scale.y, accentDepth, 4.6, delta)
    accentRef.current.scale.z = THREE.MathUtils.damp(accentRef.current.scale.z, accentDepth, 4.6, delta)

    const targetRotation = active ? 0.06 : 0
    cardRef.current.rotation.z = THREE.MathUtils.damp(cardRef.current.rotation.z, targetRotation, 4.8, delta)
  })

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef} raycast={emptyRaycast}>
        <capsuleGeometry args={[0.24, 0.5, 6, 18]} />
        <meshBasicMaterial
          color="#7CC7FF"
          transparent
          opacity={active ? 0.14 : 0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group
        ref={cardRef}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHoveredIndex(index)
        }}
        onPointerOut={() => setHoveredIndex(null)}
      >
        <mesh>
          <capsuleGeometry args={[0.17, 0.42, 8, 24]} />
          <meshStandardMaterial
            color={active ? '#F3F7FB' : '#D3DCE8'}
            emissive={active ? '#7CC7FF' : '#121926'}
            emissiveIntensity={active ? 0.28 : 0.08}
            roughness={0.24}
            metalness={0.08}
          />
        </mesh>

        <mesh ref={accentRef} position={[0, 0, 0.16]}>
          <boxGeometry args={[0.12, 0.44, 0.05]} />
          <meshBasicMaterial
            color="#7CC7FF"
            transparent
            opacity={active ? 0.82 : 0.48}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh position={[0, 0.19, 0.19]} raycast={emptyRaycast}>
          <sphereGeometry args={[0.045, 18, 18]} />
          <meshBasicMaterial color="#0C1118" transparent opacity={0.88} />
        </mesh>
      </group>

      <NodeLabel texture={labelTexture} />
    </group>
  )
}

const Connection = ({ data, active }) => (
  <group raycast={emptyRaycast}>
    <mesh geometry={data.glowGeometry}>
      <meshBasicMaterial
        color="#7CC7FF"
        transparent
        opacity={active ? 0.16 : 0.05}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
    <mesh geometry={data.baseGeometry}>
      <meshStandardMaterial
        color={active ? '#7CC7FF' : '#667388'}
        emissive={active ? '#7CC7FF' : '#121926'}
        emissiveIntensity={active ? 0.24 : 0.04}
        roughness={0.38}
        metalness={0.1}
        transparent
        opacity={active ? 0.92 : 0.42}
      />
    </mesh>
  </group>
)

const FlowParticle = ({ curve, offset, active }) => {
  const particleRef = useRef(null)
  const nextPosition = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (!particleRef.current) return

    const progress = (state.clock.elapsedTime * 0.1 + offset) % 1
    curve.getPointAt(progress, nextPosition)
    particleRef.current.position.copy(nextPosition)

    const targetScale = active ? 1.18 : 1
    particleRef.current.scale.x = THREE.MathUtils.damp(particleRef.current.scale.x, targetScale, 4.2, delta)
    particleRef.current.scale.y = THREE.MathUtils.damp(particleRef.current.scale.y, targetScale, 4.2, delta)
    particleRef.current.scale.z = THREE.MathUtils.damp(particleRef.current.scale.z, targetScale, 4.2, delta)
  })

  return (
    <mesh ref={particleRef} raycast={emptyRaycast}>
      <sphereGeometry args={[active ? 0.062 : 0.046, 16, 16]} />
      <meshBasicMaterial
        color="#7CC7FF"
        transparent
        opacity={active ? 0.86 : 0.42}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

const Stage = () => (
  <group raycast={emptyRaycast}>
    <mesh position={[0, -1.2, -0.66]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[9.8, 3.8, 10, 10]} />
      <meshBasicMaterial wireframe color="#7CC7FF" transparent opacity={0.018} />
    </mesh>
    <line position={[0, -1.02, -0.36]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([-4.2, 0, 0, 4.2, 0, 0])}
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#F3F7FB" transparent opacity={0.06} />
    </line>
  </group>
)

const SignalPipeline = () => {
  const groupRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.08,
      3.2,
      delta
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.035,
      3.2,
      delta
    )
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.04
  })

  return (
    <group ref={groupRef} position={[0, 0.05, 0]}>
      <Stage />

      {connectionData.map((data, index) => {
        const active = hoveredIndex !== null && (hoveredIndex === index || hoveredIndex === index + 1)

        return (
          <group key={`${connections[index].start.label}-${connections[index].end.label}`}>
            <Connection data={data} active={active} />
            <FlowParticle curve={data.curve} offset={connections[index].offset} active={active} />
            <FlowParticle curve={data.curve} offset={connections[index].offset + 0.26} active={active} />
            <FlowParticle curve={data.curve} offset={connections[index].offset + 0.52} active={active} />
          </group>
        )
      })}

      {nodes.map((node, index) => (
        <PipelineNode
          key={node.label}
          node={node}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </group>
  )
}

const StorySystemsScene = () => (
  <div className="h-[350px] w-full lg:h-[390px]">
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 0.12, 8.2], fov: 28 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.38} />
      <pointLight position={[0, 2.4, 5.2]} intensity={0.22} color="#7CC7FF" />
      <pointLight position={[-3.2, 0.8, 3.6]} intensity={0.12} color="#F3F7FB" />
      <SignalPipeline />
    </Canvas>
  </div>
)

export default StorySystemsScene
