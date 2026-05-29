import { useCallback } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const spring = {
  stiffness: 180,
  damping: 20,
  mass: 0.45,
}

const supportsTilt = (minWidth) => {
  if (typeof window === 'undefined') return false
  if (window.innerWidth < minWidth) return false
  return !window.matchMedia('(pointer: coarse)').matches
}

export default function useTiltMotion({
  max = 7,
  scale = 1.015,
  lift = 6,
  minWidth = 768,
  disabled = false,
} = {}) {
  const prefersReducedMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scaleValue = useMotionValue(1)
  const y = useMotionValue(0)

  const smoothRotateX = useSpring(rotateX, spring)
  const smoothRotateY = useSpring(rotateY, spring)
  const smoothScale = useSpring(scaleValue, spring)
  const smoothY = useSpring(y, spring)

  const reset = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scaleValue.set(1)
    y.set(0)
  }, [rotateX, rotateY, scaleValue, y])

  const handlePointerMove = useCallback(
    (event) => {
      if (disabled || prefersReducedMotion || event.pointerType === 'touch' || !supportsTilt(minWidth)) {
        return
      }

      const bounds = event.currentTarget.getBoundingClientRect()
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5

      rotateY.set(offsetX * max * 2)
      rotateX.set(offsetY * max * -1.6)
      scaleValue.set(scale)
      y.set(-lift)
    },
    [disabled, lift, max, minWidth, prefersReducedMotion, rotateX, rotateY, scale, scaleValue, y]
  )

  const handlePointerEnter = useCallback(
    (event) => {
      if (disabled || prefersReducedMotion || event.pointerType === 'touch' || !supportsTilt(minWidth)) {
        return
      }

      scaleValue.set(scale)
      y.set(-lift / 2)
    },
    [disabled, lift, minWidth, prefersReducedMotion, scale, scaleValue, y]
  )

  return {
    style: {
      rotateX: smoothRotateX,
      rotateY: smoothRotateY,
      scale: smoothScale,
      y: smoothY,
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
      willChange: 'transform',
    },
    onPointerMove: handlePointerMove,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: reset,
  }
}
