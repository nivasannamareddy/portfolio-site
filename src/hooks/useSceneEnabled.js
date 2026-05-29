import { useEffect, useState } from 'react'

const supportsScene = (breakpoint) => {
  if (typeof window === 'undefined') return false

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches

  return window.innerWidth >= breakpoint && !reducedMotion && !coarsePointer
}

const listen = (mediaQuery, listener) => {
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }

  mediaQuery.addListener(listener)
  return () => mediaQuery.removeListener(listener)
}

export default function useSceneEnabled(breakpoint = 960) {
  const [enabled, setEnabled] = useState(() => supportsScene(breakpoint))

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')

    const update = () => setEnabled(supportsScene(breakpoint))

    update()
    window.addEventListener('resize', update)
    const stopReduced = listen(reducedMotionQuery, update)
    const stopPointer = listen(coarsePointerQuery, update)

    return () => {
      window.removeEventListener('resize', update)
      stopReduced()
      stopPointer()
    }
  }, [breakpoint])

  return enabled
}
