import { twMerge } from "tailwind-merge"
import Logo from "./Logo"

export default function Card({ className = '', children, solid = false, logo = false }) {
  const colors = solid ? 'bg-sparks-purple-400 text-slate-50' : 'backdrop-blur-sm border-sparks-purple-400 border-2 border-opacity-50'
  const classes = twMerge(`relative px-10 py-12 rounded-xl ${colors} ${logo ? 'pt-18' : ''} ${className}`)
  return (
    <div className={classes}>
      {logo ? <div className="absolute top-0 -translate-y-1/2 rounded-full left-6 h-12 w-12 p-4 border-sparks-purple-400 border-2 bg-sparks-purple-500 flex justify-center items-center"><Logo className="absolute shrink-0 w-2/3 h-auto" /></div> : <></>}
      {children}
    </div>
  )
}