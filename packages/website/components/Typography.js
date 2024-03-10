import { twMerge } from "tailwind-merge"

export const Heading = ({ children, className = "", small, ...props }) => (
  <h1 className={twMerge(`${small ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'} text-slate-50 font-black ${className}`)} {...props}>
    {children}
  </h1>
)

export const Text = ({ children, className = "", small = false, ...props }) => (
  <p className={twMerge(`${small ? 'text-sm md:text-base' : 'text-base md:text-lg'} text-slate-50 font-normal ${className}`)} {...props}>
    {children}
  </p>
)

export const Subtitle = ({ children, className = "", lg, ...props }) => (
  <h2 className={twMerge(`${lg ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-lg md:text-xl lg:text-2xl'} text-slate-50 font-bold ${className}`)} {...props}>
    {children}
  </h2>
)