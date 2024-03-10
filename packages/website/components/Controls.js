import { twMerge } from "tailwind-merge"

export const Button = ({ children, className = "", href, light = false, disabled = false, ...props }) => {
  const colors = light ? `text-sparks-purple-500 bg-slate-50 ${!disabled ? 'hover:bg-slate-100' : 'cursor-default'}` : `text-slate-50 bg-sparks-purple-500 ${!disabled ? 'hover:bg-sparks-purple-400' : 'cursor-default'}`
  const classes = twMerge(`${colors} whitespace-nowrap w-auto m-w-full overflow-hidden text-ellipsis font-semibold text-base whitespace-nowrap px-12 py-3 rounded-lg whitespace-nowrap inline-flex items-center ${className}`)

  return (
    href ? (
      <a className={classes} {...props} href={href} {...props}>
        {children}
      </a>
    ) : (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  )
}