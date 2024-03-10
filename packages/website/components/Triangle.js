import { twMerge } from 'tailwind-merge'

export default function Triangle({ className = '', solid = false }) {
  const classes = twMerge(`absolute w-64 h-64 md:w-96 md:h-96 scale-105 opacity-60 flex ${className}`)
  
  return (
    solid ? (
      <div className={classes}>
        <div className="absolute top-1/2 left-1/2 w-2/5 h-2/5 rounded-md bg-sparks-purple-500 bg-opacity-20" style={{ transform: 'translate3d(-50%, -50%, 0) rotate(45deg)' }}></div>
        <div className="absolute top-1/2 left-1/2 w-3/5 h-3/5 rounded-md bg-sparks-purple-500 bg-opacity-20" style={{ transform: 'translate3d(-50%, -50%, 0) rotate(45deg)' }}></div>
      </div>
    ) : (
      <div className={classes}>
        <div className="absolute top-1/2 left-1/2 w-1/5 h-1/5 rounded-md border-8 border-sparks-purple-500/20" style={{ transform: 'translate3d(-50%, -50%, 0) rotate(45deg)' }}></div>
        <div className="absolute top-1/2 left-1/2 w-2/5 h-2/5 rounded-md border-8 border-sparks-purple-500/20" style={{ transform: 'translate3d(-50%, -50%, 0) rotate(45deg)' }}></div>
        <div className="absolute top-1/2 left-1/2 w-3/5 h-3/5 rounded-md border-8 border-sparks-purple-500/20" style={{ transform: 'translate3d(-50%, -50%, 0) rotate(45deg)' }}></div>
      </div>
    )
  )
}
