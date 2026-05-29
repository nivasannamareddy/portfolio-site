import { motion } from 'framer-motion'

const t = { delay: 0.3, duration: 0.8, ease: 'easeInOut' }
const mask = (dir) => ({
  maskImage: `linear-gradient(to ${dir}, white, transparent)`,
  WebkitMaskImage: `linear-gradient(to ${dir}, white, transparent)`,
})

export const LampContainer = ({ children, className = '', compact = false }) => (
  <div
    className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#0c1118] w-full z-0 ${
      compact ? 'min-h-[36rem]' : 'min-h-screen'
    } ${className}`}
  >
    <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
      {/* Sky beam — left */}
      <motion.div
        initial={{ opacity: 0.4, width: '12rem' }}
        whileInView={{ opacity: 1, width: '28rem' }}
        viewport={{ once: true }}
        transition={t}
        className="absolute inset-auto right-1/2 h-56 overflow-visible"
        style={{ backgroundImage: 'conic-gradient(from 70deg at center top, #38bdf8, transparent, transparent)' }}
      >
        <div className="absolute w-full left-0 bg-[#0c1118] h-40 bottom-0 z-20" style={mask('top')} />
        <div className="absolute w-40 h-full left-0 bg-[#0c1118] bottom-0 z-20" style={mask('right')} />
      </motion.div>

      {/* Indigo beam — right */}
      <motion.div
        initial={{ opacity: 0.4, width: '12rem' }}
        whileInView={{ opacity: 1, width: '28rem' }}
        viewport={{ once: true }}
        transition={t}
        className="absolute inset-auto left-1/2 h-56"
        style={{ backgroundImage: 'conic-gradient(from 290deg at center top, transparent, transparent, #818cf8)' }}
      >
        <div className="absolute w-40 h-full right-0 bg-[#0c1118] bottom-0 z-20" style={mask('left')} />
        <div className="absolute w-full right-0 bg-[#0c1118] h-40 bottom-0 z-20" style={mask('top')} />
      </motion.div>

      <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0c1118] blur-2xl" />
      <div className="absolute top-1/2 z-50 h-48 w-full opacity-10 backdrop-blur-md" />
      <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-sky-400 opacity-[0.18] blur-3xl" />

      <motion.div
        initial={{ width: '6rem' }}
        whileInView={{ width: '14rem' }}
        viewport={{ once: true }}
        transition={t}
        className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-sky-400 blur-2xl opacity-30"
      />
      <motion.div
        initial={{ width: '12rem' }}
        whileInView={{ width: '28rem' }}
        viewport={{ once: true }}
        transition={t}
        className="absolute inset-auto z-50 h-px -translate-y-[7rem] opacity-50"
        style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
      />
      <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0c1118]" />
    </div>

    <div
      className={`relative z-50 flex flex-col items-center px-5 w-full ${
        compact ? '-translate-y-36' : '-translate-y-80'
      }`}
    >
      {children}
    </div>
  </div>
)
