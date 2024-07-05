import { twMerge } from "tailwind-merge";
import Noise from "./Noise";
import Triangle from "./Triangle";

export default function Section({ className = '', children, id, solid, triangleTop = '', fullWidth = false, triangleBot = '' }) {
  return (
    <section id={id} className="bg-slate-950 w-full overflow-hidden relative flex justify-center">
      { triangleTop ? <Triangle className={twMerge(`left-1/3 top-0 -translate-x-1/2 -translate-y-1/2 ${triangleTop}`)} solid /> : ''}
      { triangleBot ? <Triangle className={twMerge(`left-1/3 bottom-0 -translate-x-1/2 translate-y-1/2 ${triangleBot}`)} solid /> : '' }
      <Noise />
      <div className={twMerge(`relative w-full py-14 flex align-center justify-center ${solid ? 'bg-sparks-purple-500 rounded-t-4xl' : ''} ${className}`)}>
        <div className={`relative ${fullWidth ? 'w-full' : 'max-w-7xl'} px-6 overflow-hidden`}>
          {children}
        </div>
      </div>
    </section>
  )
}