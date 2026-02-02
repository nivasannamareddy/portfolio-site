import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const StoryAtmosphere = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    let renderer
    let geometry
    let material
    let frameId

    try {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 1200)
      camera.position.z = 220

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)

      const particleCount = 700
      geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 600
        positions[i + 1] = (Math.random() - 0.5) * 400
        positions[i + 2] = (Math.random() - 0.5) * 600
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      material = new THREE.PointsMaterial({
        size: 1.6,
        color: new THREE.Color('#6fe5c1'),
        transparent: true,
        opacity: 0.4,
      })

      const points = new THREE.Points(geometry, material)
      scene.add(points)

      const animate = () => {
        points.rotation.y += 0.0006
        points.rotation.x += 0.0003
        renderer.render(scene, camera)
        frameId = requestAnimationFrame(animate)
      }
      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', handleResize)
        geometry?.dispose()
        material?.dispose()
        renderer?.dispose()
      }
    } catch (error) {
      console.error('Three.js atmosphere failed to initialize', error)
      renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  )
}

export default StoryAtmosphere
